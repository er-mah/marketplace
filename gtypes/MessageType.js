
/* eslint camelcase: 0 */

const { attributeFields, resolver } = require('graphql-sequelize');
const _ = require('lodash');
const { UserError } = require('graphql-errors');
const jwtDecode = require('jwt-decode');
const { PubSub, withFilter } = require('graphql-subscriptions');
const moment = require('moment');

const graphql = require('graphql');
const { Message, CommentThread, User } = require('../models').mah;
const { UserType } = require('./UserType');


const {
  GraphQLObjectType: ObjectGraph,
  GraphQLInt: Int,
  GraphQLNonNull: NotNull,
  GraphQLString: Gstring,
  GraphQLBoolean: Gboolean,
} = graphql;

const pubsub = new PubSub();

const MessageType = new ObjectGraph({
  name: 'Message',
  description: 'Mensaje de un usuario a otro.',
  fields: _.assign(attributeFields(Message), {
    User: {
      type: UserType,
      resolve: resolver(Message.User),
    },
  }),
});

const MessageMutations = {
  addMessage: {
    type: MessageType,
    description: 'Se Añade un mensaje a una cadena de mensajes existente.',
    args: {
      from_id: { type: Int },
      content: { type: new NotNull(Gstring) },
      commentThread_id: { type: new NotNull(Int) },
      read: { type: Gstring },
    },
    resolve: (value, {
      from_id, content, commentThread_id, read,
    }) =>
      CommentThread.findById(commentThread_id)
        .then((cmt) => {
          if (!cmt) {
            throw new UserError('No existe una cadena de mensajes con ese id.');
          }
          if (from_id !== undefined && from_id !== cmt.participant1_id && from_id !== cmt.participant2_id) {
            throw new UserError('Usuario no perteneciente a esta conversación');
          }
          if (content === '') {
            throw new UserError('El mensaje no puede esta vacío!');
          }
          return Message.create({
            from_id,
            content,
            commentThread_id,
            read,
          })
            .then((msg) => {
              pubsub.publish('messageAdded', { messageAdded: msg, commentThread_id: msg.commentThread_id });
              return msg;
            });
        }),
  },
  deleteMessage: {
    type: Gstring,
    description: '(admin) Elimina un mensaje',
    args: {
      AuthToken: { type: new NotNull(Gstring) },
      message_id: { type: new NotNull(Int) },
    },
    resolve: (value, { AuthToken, message_id }) => {
      const user_id = jwtDecode(AuthToken).id;
      return User.findById(user_id)
        .then((user) => {
          if (!user) {
            throw new UserError('Este usuario no existe.');
          }
          if (user.isAdmin !== true) {
            throw new UserError('Necesita ser Administrador para realizar esta accion.');
          }
          return Message.findById(message_id)
            .then((msg) => {
              if (!msg) {
                throw new UserError('Este mensaje ya ha sido eliminado');
              }
              return msg.destroy();
            })
            .then(() => 'Mensaje eliminado con éxito.')
            .catch((e) => { throw new UserError(e); });
        })
        .catch((e) => { throw new UserError(e); });
    },

  },
  markThreadAsReaded: {
    name: 'readMessage',
    type: Gboolean,
    args: {
      commentThread_id: { type: new NotNull(Int) },
    },
    resolve: (value, { commentThread_id }) => {
      CommentThread.findById(commentThread_id, { include: [{ model: Message, as: 'messages' }] })
        .then((cmt) => {
          cmt.messages.map((msg) => {
            if (msg.dataValues.read === null) {
              msg.update({
                read: moment(),
              });
            }
          });
          return true;
        });
      return true;
    },
  },
};

const MessageSubscriptions = {
  messageAdded: {
    name: 'messageAdded',
    type: MessageType,
    args: {
      commentThread_id: { type: new NotNull(Int) },
    },
    subscribe: withFilter(
      () =>
        pubsub.asyncIterator(['messageAdded']),
      (payload, args) => payload.commentThread_id === args.commentThread_id,
    ),
  },
};
module.exports = { MessageType, MessageMutations, MessageSubscriptions };
