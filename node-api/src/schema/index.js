
const graphql = require('graphql');
const { resolver } = require('graphql-sequelize');
const decode = require('jwt-decode');
const _ = require('lodash');
const { UserError, maskErrors } = require('graphql-errors');


const { UserType, SearchUserResultType, SearchResumeType } = require('../gtypes/UserType');
const { GruposType } = require('../gtypes/GruposType');
const { Tautos30type } = require('../gtypes/Tautos30type');
const { DetailsType } = require('../gtypes/DetailsType');
const { TechnicalDataType } = require('../gtypes/TechnicalDataType');
const { AdditionalsType } = require('../gtypes/AdditionalsType');
const { PublicationType } = require('../gtypes/PublicationType');
const { PublicationStateType } = require('../gtypes/PublicationStateType');
const { CommentThreadType } = require('../gtypes/CommentThreadType');
const { MessageType } = require('../gtypes/MessageType');
const { PageTextsType } = require('../gtypes/PageTextType');
const { RatesType } = require('../gtypes/RatesType');

const { infoAutoResolver } = require('../helpers');


const {
  createCommentThread,
  deleteCommentThread,
} = require('../gtypes/CommentThreadType').CommentThreadMutations;
const {
  addMessage,
  deleteMessage,
  markThreadAsReaded,
} = require('../gtypes/MessageType').MessageMutations;
const {
  modifyUserData,
  updatePassword,
  resetPassword,
  deleteUser,
  searchUser,
} = require('../gtypes/UserType').UserMutations;

const {
  searchPublication,
  markAsSold,
  adminChangeState,
  highlightPublication,
  adminhighlightPublication,
  adminUnHighlightPublication,
  aprovePublication,
  disaprovePublication,
} = require('../gtypes/PublicationType').PublicationMutation;

const { messageAdded } = require('../gtypes/MessageType').MessageSubscriptions;
const {
  threadAdded,
} = require('../gtypes/CommentThreadType').CommentThreadSubscriptions;
const {
  updateText,
} = require('../gtypes/PageTextType').PageTextMutations;
const {
  updateRates,
} = require('../gtypes/RatesType').RateMutations;

const {
  User,
  Publication,
  PublicationState,
  CommentThread,
  Message,
  sequelize,
  PageTexts,
  Rates,
} = require('../models').mah;
const {
  tautos30,
  grupos,
  extrad,
  extrad3,
  extrad2,
} = require('../models').tauto;

const {
  GraphQLSchema: Schema,
  GraphQLList: List,
  GraphQLNonNull: NotNull,
  GraphQLObjectType: ObjectGraph,
  GraphQLInt: Int,
  GraphQLString: Gstring,
  GraphQLBoolean: Gboolean,
} = graphql;

const { Op } = sequelize;


const schema = new Schema({
  query: new ObjectGraph({
    name: 'Root',
    fields: {
      // BD TAUTO
      AllBrands: {
        name: 'Allbrands',
        description: 'Los valores que importan son ta3_marca y ta3_nmarc',
        type: new List(Tautos30type),
        args: {
          limit: {
            type: Int,
          },
          order: {
            type: Gstring,
          },
          distinct: {
            type: Gstring,
          },
          ta3_marca: {
            type: Gstring,
          },
          ta3_nmarc: {
            type: Int,
          },
        },
        resolve: () => infoAutoResolver('brand'),

        // resolver(tautos30, {
        //   before: (options) => {
        //     options.attributes = ['ta3_marca', 'ta3_nmarc'];
        //     return options;
        //   },
        //   after(result) {
        //     const brand = [];
        //     result.map((row) => {
        //       if (row.ta3_marca !== '') {
        //         brand.push(row);
        //       }
        //       return false;
        //     });
        //     return _.uniqBy(brand, 'ta3_marca');
        //   },
        // }),
      },
      Group: {
        description: 'Se busca con el id de la marca, es ta3_nmarc = gru_nmarc',
        type: List(GruposType),
        args: {
          gru_nmarc: {
            description: 'id de la marca (ta3_nmarc pero gru_nmarc)',
            type: new NotNull(Int),
          },
        },
        resolve: (_, { gru_nmarc }) => infoAutoResolver('group', gru_nmarc),
      },
      Models: {
        description: 'Los valores que importan son: ta3_model y ta3_codia',
        type: List(Tautos30type),
        args: {
          ta3_cgrup: {
            description: 'Id del grupo',
            type: Int,
          },
          ta3_nmarc: {
            description: 'Nombre del grupo (este atributo no es necesario, lo dejo por un tema de compatibilidad con web en test)',
            type: Int,
          },
        },
        resolve: (_, { ta3_cgrup, ta3_nmarc }) => infoAutoResolver('model', ta3_cgrup, ta3_nmarc),

        // resolver(tautos30, {
        //   before: (options) => {
        //     options.attributes = ['ta3_model', 'ta3_codia'];
        //     return options;
        //   },
        // }),
      },
      Price: {
        type: List(new ObjectGraph({
          name: 'precios',
          description: 'Devuelve un array de precios',
          fields: {
            anio: { type: graphql.GraphQLString },
            precio: { type: graphql.GraphQLInt },
          },
        })),
        args: {
          ta3_codia: {
            description: 'id del auto',
            type: new NotNull(Int),
          },
        },
        resolve: (_, { ta3_codia }) => infoAutoResolver('prices', ta3_codia),

        // resolver(tautos30, {
        //   after: (result) => {
        //     const precios = [];
        //     let actualYear = parseInt(result[0].ta3_anioe, 10);
        //     Object.keys(result[0].dataValues).map((row) => {
        //       if (row.startsWith('ta3_pre')) {
        //         const priceRow = {};
        //         priceRow.anio = actualYear;
        //         priceRow.precio = parseInt(
        //           `${result[0].dataValues[row]}000`,
        //           10,
        //         );
        //         actualYear -= 1;
        //         precios.push(priceRow);
        //       }
        //     });
        //     if (precios[0].precio === 0) {
        //       for (let i = 0; i < 31; i += 1) {
        //         if (precios[i].precio !== 0) {
        //           for (let j = i; j >= 0; j -= 1) {
        //             precios[j].precio = precios[i].precio;
        //           }
        //           break;
        //         }
        //       }
        //     }
        //     return precios;
        //   },
        // }),
      },
      Details: {
        type: DetailsType,
        args: {
          ta3_codia: {
            description: 'El id del auto',
            type: new NotNull(Int),
          },
        },
        resolve: (_, { ta3_codia }) => infoAutoResolver('details', ta3_codia),
      },

      // BD MAH
      User: {
        type: UserType,
        // args will automatically be mapped to `where`
        args: {
          MAHtoken: {
            type: new NotNull(Gstring),
          },
          id: { type: Int },
        },
        resolve: (_nada, args) => {
          const userId = decode(args.MAHtoken).id;
          if (args.id) {
            return User.findById(userId)
              .then((us) => {
                if (us.isAdmin) {
                  return User.findById(args.id)
                    .then(us => us)
                    .catch((error) => { throw new UserError(error); });
                }
                throw new UserError('Solo los administradores pueden acceder');
              });
          }
          return User.findById(userId)
            .then(us => us);
        },
      },
      AllUsers: {
        type: SearchUserResultType,
        args: {
          limit: {
            type: Int,
          },
          order: {
            type: Gstring,
          },
          page: {
            type: Int,
          },
        },
        resolve: (_nada, args) => {
          const options = {};
          const LIMIT = 9;
          if (args.page) {
            options.limit = LIMIT;
            options.offset = args.page === 1 ? 0 : (args.page - 1) * LIMIT;
          }
          return User.findAndCountAll(options)
            .then((res) => {
              const result = {};
              result.hasNextPage = res.count > res.rows.length && res.rows.length !== 0;
              result.totalCount = res.count;
              result.Users = res.rows;
              return result;
            });
        }, /* resolver(User, {
          before: (options, args) => {
            const LIMIT = 9;
            if (args.page) {
              options.limit = LIMIT;
              options.offset = args.page === 1 ? 0 : (args.page - 1) * LIMIT;
            }
            return options;
          },
        }), */
      },
      AllUsersResume: {
        name: 'AllUsersResume',
        type: SearchResumeType,
        args: {
          page: {
            type: Int,
          },
          userType: {
            type: Gstring,
          },

        },
        resolve: (_nada, args) => {
          const options = {};
          const LIMIT = 9;
          if (args.page) {
            options.limit = LIMIT;
            options.offset = args.page === 1 ? 0 : (args.page - 1) * LIMIT;
          }
          if (args.userType) {
            if (args.userType === 'Agencia') {
              options.where = { isAgency: true };
            } else {
              options.where = { isAgency: false };
            }
          }
          return User.findAndCountAll(options)
            .then((res) => {
              const result = {};

              const getStatics = (stateName, user) => Publication.count({
                where: { user_id: user.id },
                include: [
                  {
                    model: PublicationState,
                    where: {
                      stateName,
                    },
                    through: { where: { active: true } },
                  },
                ],
              })
                .then(t => user[stateName] = t);
              const PromiseArray = res.rows.map(user =>
                getStatics('Pendiente', user)
                  .then(() => getStatics('Suspendida', user))
                  .then(() => getStatics('Publicada', user))
                  .then(() => getStatics('Destacada', user)));
              return Promise.all(PromiseArray)
                .then(() => {
                  result.hasNextPage = res.count > res.rows.length && res.rows.length !== 0;
                  result.totalCount = res.count;
                  result.Users = res.rows;
                  return result;
                });
            });
        },
      },
      AllUsersMails: {
        type: SearchUserResultType,
        args: {
          limit: {
            type: Int,
          },
          order: {
            type: Gstring,
          },
          page: {
            type: Int,
          },
        },
        resolve: (_nada, args) => {
          const options = {};
          const LIMIT = 9;
          options.attributes = ['email', 'id', 'isAdmin'];
          if (args.page) {
            options.limit = LIMIT;
            options.offset = args.page === 1 ? 0 : (args.page - 1) * LIMIT;
          }
          return User.findAndCountAll(options)
            .then((res) => {
              const result = {};
              result.hasNextPage = res.count > res.rows.length && res.rows.length !== 0;
              result.totalCount = res.count;
              result.Users = res.rows;
              return result;
            });
        }, /* resolver(User, {
          before: (options, args) => {
            const LIMIT = 9;
            if (args.page) {
              options.limit = LIMIT;
              options.offset = args.page === 1 ? 0 : (args.page - 1) * LIMIT;
            }
            return options;
          },
        }), */
      },
      Publication: {
        type: PublicationType,
        args: {
          id: {
            description: 'id de la publicación',
            type: new NotNull(Int),
          },
        },
        resolve: resolver(Publication),
      },
      AllPublications: {
        type: new List(PublicationType),
        args: {
          user_id: {
            type: Int,
            description: 'El id de un usuario registrado',
          },
          stateName: {
            type: Gstring,
            description: 'El estado actual de la publicacion',
          },
          limit: {
            type: Int,
          },
          order: {
            type: Gstring,
          },
          MAHtoken: { type: Gstring },
        },
        resolve: resolver(Publication, {
          before: (options, args) => {
            const { Op } = sequelize;
            if (args.MAHtoken) {
              options.where = {
                [Op.and]: { user_id: decode(args.MAHtoken).id },
              };
            }
            if (args.stateName === 'Activas') {
              options.include = [
                {
                  model: PublicationState,
                  where: {
                    [Op.or]: [
                      { stateName: 'Publicada' },
                      { stateName: 'Destacada' },
                      { stateName: 'Vendida' },
                      { stateName: 'Apto para garantía' },
                    ],
                  },
                  through: { where: { active: true } },
                },
              ];
              options.order = [
                sequelize.options.dialect === 'mysql' ? sequelize.fn('RAND') : sequelize.fn('RANDOM'), // en postgres es RANDOM
              ];
              return options;
            }
            if (args.stateName && args.stateName !== 'Activas') {
              options.include = [
                {
                  model: PublicationState,
                  where: { stateName: args.stateName },
                  through: { where: { active: true } },
                },
              ];
              return options;
            }
            return options;
          },
        }),
      },
      LastPublications: {
        type: new List(PublicationType),
        args: {
          limit: { type: Int },
        },
        resolve: (_nada, args) => Publication.findAndCountAll({
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: PublicationState,
              where: {
                stateName: 'Publicada',
              },
              through: { where: { active: true } },
            },
          ],
          limit: args.limit,
        })
          .then(({ rows, count }) => {
            const searchMorePubs = () => {
              args.limit += 5;
              return Publication.findAndCountAll({
                order: [['createdAt', 'DESC']],
                include: [
                  {
                    model: PublicationState,
                    where: {
                      stateName: 'Publicada',
                    },
                    through: { where: { active: true } },
                  },
                ],
                limit: args.limit,
              })
                .then(({ rows, count }) => {
                  if (count > rows.length && rows.length < 4) {
                    return searchMorePubs();
                  }
                  return rows;
                });
            };
            if (count > rows.length && rows.length < 4) {
              return searchMorePubs();
            }
            return rows;
          }),
      },
      HighlightedPublications: {
        type: new List(PublicationType),
        args: {
          limit: { type: Int },
        },
        resolve: (_nada, args) => Publication.findAndCountAll({
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: PublicationState,
              where: {
                stateName: 'Destacada',
              },
              through: { where: { active: true } },
            },
          ],
          limit: args.limit,
        })
          .then(({ rows, count }) => {
            const fillWithNormalPubs = (numberOfPubs, findedPubs) => {
              const limit = numberOfPubs;
              return Publication.findAll({
                order: sequelize.options.dialect === 'mysql' ? sequelize.fn('RAND') : sequelize.fn('RANDOM'),
                include: [
                  {
                    model: PublicationState,
                    where: {
                      stateName: 'Publicada',
                    },
                    through: { where: { active: true } },
                  },
                ],
                limit,
              })
                .then((rows) => {
                  const result = _.concat(findedPubs, rows);
                  return result;
                });
            };

            const searchMorePubs = () => {
              args.limit += 5;
              return Publication.findAndCountAll({
                order: [['createdAt', 'DESC']],
                include: [
                  {
                    model: PublicationState,
                    where: {
                      stateName: 'Destacada',
                    },
                    through: { where: { active: true } },
                  },
                ],
                limit: args.limit,
              })
                .then(({ rows, count }) => {
                  if (count > rows.length && rows.length < 4) {
                    return searchMorePubs();
                  }
                  if (rows.length < 12) {
                    const numberOfPubs = 12 - rows.length;
                    return fillWithNormalPubs(numberOfPubs, rows);
                  }
                  return rows;
                });
            };

            if (count > rows.length && rows.length < 4) {
              return searchMorePubs();
            }
            if (rows.length < 12) {
              const numberOfPubs = 12 - rows.length;
              return fillWithNormalPubs(numberOfPubs, rows);
            }
            return rows;
          }),
      },
      PublicationState: {
        type: PublicationStateType,
        args: {
          id: {
            description: ' id de los estados',
            type: new NotNull(Int),
          },
        },
        resolve: resolver(PublicationState),
      },
      GetThreadForInbox: {
        type: CommentThreadType,
        args: {
          id: { type: new NotNull(Int) },
          MAHtoken: { type: new NotNull(Gstring) },
        },
        resolve: resolver(CommentThread), /* , {
          before: (options, args) => {
            const userId = decode(args.MAHtoken).id;
            User.findById(userId)
              .then((usr) => {
                if (usr.isAdmin) {
                  Object.assign(options.where, { id: args.id });
                  return options;
                }
                args.participant2_id = userId;
                Object.assign(options.where, { participant2_id: userId });
                return options;
              });
          },
          //after:(a,b)=>{console.log('a',a); console.log('b',b)}
        }), */
      },
      CommentThread: {
        type: List(CommentThreadType),
        args: {
          id: {
            description: 'id del grupo de mensajes',
            type: Int,
          },
          chatToken: {
            description: 'Token del chat anonimo',
            type: Gstring,
          },
          publication_id: {
            description: 'id de la publicacion asociada',
            type: Int,
          },
          MAHtokenP1: {
            type: Gstring,
          },
          MAHtokenP2: {
            type: Gstring,
          },
        },
        resolve: resolver(CommentThread, {
          before: (options, args) => {
            if (args.MAHtokenP1) {
              const userId = decode(args.MAHtokenP1).id;
              if (!options.where) {
                options.where = { participant1_id: userId };
              } else {
                Object.assign(options.where, { participant1_id: userId });
              }
            }
            if (args.MAHtokenP2) {
              const userId = decode(args.MAHtokenP2).id;
              if (!options.where) {
                options.where = { participant2_id: userId };
              } else {
                Object.assign(options.where, { participant2_id: userId });
              }
            }
            options.include = [{ model: Message, as: 'messages' }];

            return options;
          },
          after: (result, args) => {
            if (
              !args.MAHtokenP2 &&
              !args.chatToken &&
              (!args.MAHtokenP1 && !args.chatToken)
            ) {
              result = [];
            }
            return result;
          },
        }),
      },
      Messages: {
        type: new List(MessageType),
        args: {
          commentThread_id: {
            type: Int,
          },
        },
        resolve: resolver(Message),
      },
      UnreadMessages: {
        type: new List(CommentThreadType),
        args: {
          MAHtoken: {
            type: Gstring,
          },
        },
        resolve: resolver(CommentThread, {
          before: (options, args) => {
            const userId = decode(args.MAHtoken).id;
            (options.where = { participant2_id: userId }),
            (options.include = [
              { model: Message, as: 'messages', where: { read: null } },
            ]);
            return options;
          },
        }),
      },
      CountUnreadMessages: {
        type: List(Int),
        args: {
          MAHtoken: {
            type: Gstring,
          },
        },
        resolve: resolver(CommentThread, {
          before: (options, args) => {
            const userId = decode(args.MAHtoken).id;
            (options.where = { participant2_id: userId }),
            (options.include = [
              { model: Message, as: 'messages', where: { read: null } },
            ]);
            return options;
          },
          after: (results) => {
            const arrayMessages = [];
            results.map((result) => {
              arrayMessages.push(result.dataValues.messages);
            });

            return [arrayMessages.length];
          },
        }),
      },
      CountActivePublications: {
        type: Int,
        args: {
          MAHtoken: { type: Gstring },
        },
        resolve: (_nada, args) => {
          const userId = decode(args.MAHtoken).id;
          const { Op } = sequelize;
          return Publication.count({
            where: { user_id: userId },
            include: [{
              model: PublicationState,
              where: { [Op.or]: { stateName: ['Publicada', 'Pendiente', 'Destacada', 'Vendida'] } },
              through: { where: { active: true } },
            }],
          })
            .then(res => res);
        },
      },
      CountHighLighPublications: {
        type: Int,
        args: {
          MAHtoken: { type: Gstring },
        },
        resolve: (_nada, args) => {
          const userId = decode(args.MAHtoken).id;
          const { Op } = sequelize;
          return Publication.count({
            where: { user_id: userId },
            include: [{
              model: PublicationState,
              where: { [Op.or]: { stateName: ['Destacada'] } },
              through: { where: { active: true } },
            }],
          })
            .then(res => res);
        },
      },
      GetAllAgencies: {
        type: List(UserType),
        resolve: () => User.findAll({ where: { isAgency: true } })
          .then(agen => agen),
      },
      GetAgencyDetail: {
        type: UserType,
        args: {
          id: { type: new NotNull(Int) },
          slug: { type: Gstring },
        },
        resolve: (_nada, args) => User.findOne({ where: { isAgency: true, [Op.or]: [{ id: args.id }, { slug: args.slug }] } })
          .then(agen => agen),
      },

      // Admin
      AdminCommentThread: {
        name: 'AdminCommentThread',
        type: List(CommentThreadType),
        args: {
          MAHtoken: { type: new NotNull(Gstring) },
          page: { type: Int },
        },
        resolve: (_nada, args) => {
          const userId = decode(args.MAHtoken).id;
          return User.findById(userId)
            .then((usr) => {
              if (usr && usr.isAdmin) {
                return CommentThread.findAll({ order: [['createdAt', 'DESC']] })
                  .then(ct => ct);
              }
              throw new UserError('Solo los administradores pueden acceder');
            });
        },
      },

      // Web
      PageTexts: {
        name: 'PageTexts',
        type: List(PageTextsType),
        args: {
          route: { type: Gstring },
          section: { type: Gstring },
        },
        resolve: resolver(PageTexts),
      },
      AllRates: {
        name: 'webRates',
        type: List(RatesType),
        args: {
          limit: { type: Gstring },
        },
        resolve: resolver(Rates),
      },
    },
  }),
  mutation: new ObjectGraph({
    name: 'Mutations',
    description: 'Donde las cosas mutan',
    fields: {
      createCommentThread,
      deleteCommentThread,
      addMessage,
      deleteMessage,
      searchPublication,
      aprovePublication,
      disaprovePublication,
      markThreadAsReaded,
      modifyUserData,
      updatePassword,
      deleteUser,
      resetPassword,
      markAsSold,
      adminChangeState,
      highlightPublication,
      adminhighlightPublication,
      adminUnHighlightPublication,
      updateText,
      updateRates,
      searchUser,
    },
  }),
  subscription: new ObjectGraph({
    name: 'Subscription',
    description:
      'Dónde las cosas se actualizan autómaticamente (como con sockets)',
    fields: {
      messageAdded,
      threadAdded,
    },
  }),
});
maskErrors(schema);
module.exports = schema;
