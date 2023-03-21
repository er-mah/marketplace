/* eslint camelcase: 0 */

const { attributeFields, resolver } = require('graphql-sequelize');
const { UserError } = require('graphql-errors');
const _ = require('lodash');
const decode = require('jwt-decode');
const graphql = require('graphql');
const jwtDecode = require('jwt-decode');
const { MessageType } = require('./MessageType');
const { PubSub, withFilter } = require('graphql-subscriptions');
const { PublicationType } = require('./PublicationType');
const {
  CommentThread, User, Publication, Message,
} = require('../../models').mah;
/* eslint camelcase: 0 */
const pubsub = new PubSub();
const { generateMailAgenciaoParticular, generateSinRegistro } = require('../../../mails');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const miautoEmail = 'contacto@miautohoy.com';

const {
  GraphQLString: Gstring,
  GraphQLNonNull: NotNull,
  GraphQLObjectType: ObjectGraph,
  GraphQLInt: Int,
  GraphQLList: List,
} = graphql;

const CommentThreadType = new ObjectGraph({
  name: 'CommentThread',
  description: 'Grupo de mensajes entre dos usuarios o un usuario y un Anónimo.',
  fields: _.assign(attributeFields(CommentThread), {
    messages: {
      type: List(MessageType),
      resolve: resolver(CommentThread.messages),
    },
    Publication: {
      type: PublicationType,
      resolve: resolver(CommentThread.publication),
    },
  }),
});

const CommentThreadMutations = {
  createCommentThread: {
    type: CommentThreadType,
    description: 'Crea un Thread de mensajes en conjunto a su primer mensaje.',
    args: {
      content: { type: new NotNull(Gstring) },
      chatToken: { type: Gstring },
      publication_id: { type: new NotNull(Int) },
      participant1_id: { type: Int },
    },
    resolve: (value, {
      content, participant1_id, chatToken, publication_id,
    }) =>
      Publication.findById(publication_id)
        .then((pub) => {
          if (!pub) {
            throw new UserError('Esta publicación no existe.');
          }
          if (participant1_id) {
            return User.findById(participant1_id)
              .then((usr) => {
                if (!usr) {
                  throw new UserError('El usuario no existe.');
                }
                return CommentThread.create({
                  publication_id: pub.id,
                  participant1_id,
                  participant2_id: pub.user_id,
                  messages: [
                    {
                      from_id: participant1_id,
                      content,
                    },
                  ],
                }, {
                  include: [{
                    model: Message,
                    as: 'messages',
                  }],
                })
                  .then((cmt) => {
                    if (!pub.user_id) {
                      const data = {
                        name: usr.name,
                        email: usr.email,
                        brand: pub.brand,
                        modelName: pub.modelName,
                        content,
                        id: pub.id,
                      };
                      const msg = {
                        to: pub.email,
                        from: miautoEmail,
                        subject: `${usr.name} te ha consultado!`,
                        html: generateSinRegistro(data, 'newCT'),
                      };
                      sgMail.send(msg);
                    } else {
                      User.findById(pub.user_id, { attributes: ['email', 'agencyEmail', 'ownerEmail'] })
                        .then((pubUser) => {
                          const data = {
                            name: usr.name,
                            brand: pub.brand,
                            modelName: pub.modelName,
                            ct_id: cmt.id,
                          };
                          const msg = {
                            to: pubUser.email,
                            cc: [pubUser.agencyEmail, pubUser.ownerEmail],
                            from: miautoEmail,
                            subject: `${usr.name} te ha consultado!`,
                            html: generateMailAgenciaoParticular(data, 'newCT'),
                          };
                          sgMail.send(msg);
                        });
                    }
                    pubsub.publish('threadAdded', { threadAdded: cmt, user_id: cmt.participant2_id });
                    return cmt;
                  });
              });
          }
          if (!chatToken && !participant1_id) {
            throw new UserError('Es necesario un token o el id del usuario para iniciar una conversación');
          }
          return CommentThread.create({
            publication_id: pub.id,
            chatToken,
            participant2_id: pub.user_id,
            messages: [
              {
                content,
              },
            ],
          }, {
            include: [{
              model: Message,
              as: 'messages',
            }],
          })
            .then((cmt) => {
              User.findById(pub.user_id, { attributes: ['email', 'agencyEmail', 'ownerEmail'] })
                .then((pubUser) => {
                  if (!pubUser) {
                    const data = {
                      name: jwtDecode(chatToken).name,
                      email: jwtDecode(chatToken).email,
                      brand: pub.brand,
                      modelName: pub.modelName,
                      content,
                      id: pub.id,
                    };
                    const msg = {
                      to: pub.email,
                      from: miautoEmail,
                      subject: `${jwtDecode(chatToken).name} te ha consultado!`,
                      html: generateSinRegistro(data, 'newCT'),
                    };
                    sgMail.send(msg);
                  } else {
                    const data = {
                      name: jwtDecode(chatToken).name,
                      email: jwtDecode(chatToken).email,
                      brand: pub.brand,
                      modelName: pub.modelName,
                      ct_id: cmt.id,
                    };
                    const msg = {
                      to: pubUser.email,
                      cc: [pubUser.agencyEmail, pubUser.ownerEmail],
                      from: miautoEmail,
                      subject: `${jwtDecode(chatToken).name} te ha consultado!`,
                      html: generateMailAgenciaoParticular(data, 'newCT'),
                    };
                    sgMail.send(msg)
                      .catch(err => console.log(err));
                  }
                  pubsub.publish('threadAdded', { threadAdded: cmt, user_id: cmt.participant2_id });
                  return cmt;
                });
            });
        }),
  },
  deleteCommentThread: {
    type: Gstring,
    description: '(admin) Elimina un conjunto de mensajes',
    args: {
      MAHtoken: { type: new NotNull(Gstring) },
      commentThread_id: { type: new NotNull(Int) },
    },
    resolve: (value, { MAHtoken, commentThread_id }) => {
      const user_id = jwtDecode(MAHtoken).id;
      return User.findById(user_id)
        .then((user) => {
          if (!user) {
            throw new UserError('Este usuario no existe');
          }
          if (user.isAdmin !== true) {
            throw new UserError('Necesita ser Administrador para realizar esta accion');
          }
          return CommentThread.findById(commentThread_id)
            .then((cmt) => {
              if (!cmt) {
                throw new UserError('Esta cadena de mensajes ya ha sido eliminada');
              }
              return cmt.destroy();
            })
            .then(() => 'Cadena de comentarios eliminada con éxito');
        });
    },

  },
};

const CommentThreadSubscriptions = {
  threadAdded: {
    name: 'threadAdded',
    type: CommentThreadType,
    args: {
      MAHtoken: { type: new NotNull(Gstring) },
    },
    subscribe: withFilter(
      () =>
        pubsub.asyncIterator(['threadAdded']),
      (payload, args) => {
        const userID = decode(args.MAHtoken).id;
        return payload.user_id === userID;
      },
    ),
  },
};
module.exports = { CommentThreadType, CommentThreadMutations, CommentThreadSubscriptions };
