const { attributeFields, resolver } = require('graphql-sequelize');
const decode = require('jwt-decode');
const _ = require('lodash');
const graphql = require('graphql');
const { UserError } = require('graphql-errors');
const {
  Publication,
  PublicationState,
  HistoryState,
  User,
  sequelize,
} = require('../models').mah;
const { ImageGroupType } = require('./ImageGroupType');
const { HistoryStateType } = require('./HistoryStateType');
const { PublicationStateType } = require('./PublicationStateType');
const { PublicationDetailType } = require('./PublicationDetailType');
const { UserType } = require('./UserType');
const { generateMailAgenciaoParticular, generateSinRegistro } = require('../mails');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const miautoEmail = 'contacto@miautohoy.com';

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLList: List,
  GraphQLNonNull: NotNull,
  GraphQLInt: Int,
  GraphQLBoolean: Gboolean,
  GraphQLString: Gstring,
} = graphql;
const { Op } = sequelize;

const PublicationType = new ObjectGraph({
  name: 'Publicacion',
  description: 'Publicación que crea un usuario o una agencia',
  fields: _.assign(
    attributeFields(Publication),
    {
      ImageGroup: {
        type: ImageGroupType,
        resolve: resolver(Publication.ImageGroup),
      },
    },
    {
      HistoryState: {
        type: List(HistoryStateType),
        resolve: args =>
          HistoryState.findAll({
            where: { publication_id: args.id },
            include: [PublicationState],
            order: [['createdAt', 'ASC']],
          }).then((res) => {
            const result = [];
            res.map(hs =>
              result.push({
                createdAt: hs.dataValues.createdAt,
                stateName: hs.dataValues.PublicationState.stateName,
              }));
            return result;
          }),
      },
      CurrentState: {
        type: PublicationStateType,
        resolve: args =>
          HistoryState.findOne({
            where: { publication_id: args.id, active: true },
            include: [PublicationState],
          }).then((res) => {
            res.stateName = res.PublicationState.stateName;
            return res;
          }),
      },
      Specifications: {
        type: PublicationDetailType,
        resolve: resolver(Publication.PublicationDetail),
      },
      User: {
        type: UserType,
        resolve: resolver(Publication.User),
      },
    },
  ),
});

const SearchResult = new ObjectGraph({
  name: 'SearchResult',
  fields: {
    hasNextPage: { type: Gboolean },
    Publications: { type: List(PublicationType) },
    totalCount: { type: Int },
  },
});

const PublicationMutation = {
  searchPublication: {
    type: SearchResult,
    name: 'searchPublication',
    description: 'Búsqueda de una publicacion con cualquier parámetro',
    args: {
      MAHtoken: { type: Gstring },
      carState: { type: Gstring },
      text: { type: Gstring },
      page: { type: Int },
      limit: { type: Int },
      offset: { type: Int },
      fuel: { type: Gstring },
      year: { type: Int },
      state: { type: Gstring },
      order: { type: Gstring },
      user_id: { type: Int },
      userType: { type: Gstring },
    },
    resolve: (_nada, args) => {
      const result = {};
      const { Op } = sequelize;
      const options = {};
      const LIMIT = 9;
      options.where = { [Op.and]: {} };

      if (args.text) {
        options.where = { [Op.or]: {}, [Op.and]: {} };
        args.text = _.upperFirst(_.lowerCase(args.text));
        args.text += '%';

        options.where[Op.or] = Object.assign(
          options.where[Op.or],
          { brand: { [Op.like]: args.text } },
          { group: { [Op.like]: args.text } },
          { modelName: { [Op.like]: args.text } },
          { kms: { [Op.like]: args.text } },
          { fuel: { [Op.like]: args.text } },
          { name: { [Op.like]: args.text } },
        );
      }
      if (args.user_id) {
        options.where[Op.and] = Object.assign(options.where[Op.and], {
          user_id: args.user_id,
        });
      }
      if (args.fuel) {
        options.where[Op.and] = Object.assign(options.where[Op.and], {
          fuel: args.fuel,
        });
      }
      if (args.year) {
        options.where[Op.and] = Object.assign(options.where[Op.and], {
          year: args.year,
        });
      }
      if (args.state) {
        options.include = [
          {
            model: PublicationState,
            where: {
              stateName: args.state,
            },
            through: { where: { active: true } },
          },
        ];
      }
      if (args.carState) {
        options.where[Op.and] = Object.assign(options.where[Op.and], {
          carState: args.carState,
        });
      }
      if (args.state === 'Activas') {
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
              through: { where: { active: true } },
            },
          },
        ];
      }
      if (args.userType) {
        if (args.userType === 'Agencia') {
          options.include = [
            {
              model: User,
              where: { isAgency: true, isAdmin: false },
            },
          ];
        } else {
          options.include = [
            {
              model: User,
              where: { isAgency: false, isAdmin: false },
            },
          ];
        }
      }
      if (args.page) {
        options.limit = LIMIT;
        options.offset = args.page === 1 ? 0 : (args.page - 1) * LIMIT;
      }

      return Publication.findAndCountAll(options)
        .then(({ rows, count }) => {
          const searchMorePubs = () => {
            options.limit += 5;
            options.offset = args.page === 1 ? 0 : (args.page - 1) * LIMIT;
            return Publication.findAndCountAll(options)
              .then(({ rows, count }) => {
                if
                (count > rows.length && rows.length < LIMIT) {
                  return searchMorePubs();
                }
                const totalPages = parseInt(count / 9, 10);
                result.totalCount = count;
                result.hasNextPage = args.page < totalPages;
                result.Publications = rows;
                return result;
              });
          };
          if (count > rows.length && rows.length < LIMIT) {
            return searchMorePubs();
          }
          const totalPages = parseInt(count / 9, 10);
          result.totalCount = count;
          result.hasNextPage = args.page < totalPages;
          result.Publications = rows;
          return result;
        });
    },
  },
  markAsSold: {
    type: PublicationType,
    name: 'markPublicationAsSold',
    args: {
      publication_id: { type: Int },
      MAHtoken: { type: Gstring },
    },
    resolve: (_nada, args) => {
      const userID = decode(args.MAHtoken).id;
      return Publication.findOne({
        where: { id: args.publication_id, user_id: userID },
      }).then((pub) => {
        if (!pub) {
          throw new UserError('Esta publicación no corresponde al usuario.');
        }
        return pub.getPublicationStates({ through: { where: { active: true } } })
          .then((oldPs) => {
            if (
              oldPs[0].dataValues.stateName === 'Vendida' ||
            oldPs[0].dataValues.stateName === 'Pendiente' ||
            oldPs[0].dataValues.stateName === 'Suspendida' ||
            oldPs[0].dataValues.stateName === 'Eliminada' ||
            oldPs[0].dataValues.stateName === 'Vencida') {
              throw new UserError('Esta publicación ya está vendida o no se ecuentra activa actualmente.');
            }
            oldPs[0].HistoryState = {
              active: false,
            };
            return PublicationState.findOne({ where: { stateName: 'Vendida' } })
              .then(newPs => pub.setPublicationStates([oldPs[0], newPs], { through: { active: true } }))
              .then(() => pub);
          });
      });
    },
  },
  highlightPublication: {
    type: PublicationType,
    name: 'highlightPublication',
    args: {
      publication_id: { type: Int },
      MAHtoken: { type: Gstring },
    },
    resolve: (_nada, args) => {
      const userID = decode(args.MAHtoken).id;
      return Publication.findOne({
        where: { id: args.publication_id, user_id: userID },
      }).then((pub) => {
        if (!pub) {
          throw new UserError('Esta publicación no corresponde al usuario.');
        }
        return pub.getPublicationStates({ through: { where: { active: true } } })
          .then((oldPs) => {
            if (
              oldPs[0].dataValues.stateName === 'Destacada' ||
            oldPs[0].dataValues.stateName === 'Pendiente' ||
            oldPs[0].dataValues.stateName === 'Suspendida' ||
            oldPs[0].dataValues.stateName === 'Eliminada' ||
            oldPs[0].dataValues.stateName === 'Vencida') {
              throw new UserError('Esta publicación ya está destacada o no se ecuentra activa actualmente.');
            }
            oldPs[0].HistoryState = {
              active: false,
            };
            return PublicationState.findOne({ where: { stateName: 'Destacada' } })
              .then(newPs => pub.setPublicationStates([oldPs[0], newPs], { through: { active: true } }))
              .then(() => pub);
          });
      });
    },
  },
  adminhighlightPublication: {
    type: PublicationType,
    name: 'highlightPublication',
    args: {
      publication_id: { type: Int },
      MAHtoken: { type: Gstring },
    },
    resolve: (_nada, args) => {
      const userID = decode(args.MAHtoken).id;
      return User.findById(userID)
        .then((us) => {
          if (!us.isAdmin) {
            throw new UserError('Solo administradores pueden realizar esta acción.');
          }
          return Publication.findOne({
            where: { id: args.publication_id },
          }).then((pub) => {
            if (!pub) {
              throw new UserError('Esta publicación no existe.');
            }
            return pub.getPublicationStates({ through: { where: { active: true } } })
              .then((oldPs) => {
                if (
                  oldPs[0].dataValues.stateName === 'Destacada' ||
                oldPs[0].dataValues.stateName === 'Pendiente' ||
                oldPs[0].dataValues.stateName === 'Suspendida' ||
                oldPs[0].dataValues.stateName === 'Eliminada' ||
                oldPs[0].dataValues.stateName === 'Vencida') {
                  throw new UserError('Esta publicación ya está destacada o no se ecuentra activa actualmente.');
                }
                oldPs[0].HistoryState = {
                  active: false,
                };
                return PublicationState.findOne({ where: { stateName: 'Destacada' } })
                  .then(newPs => pub.setPublicationStates([oldPs[0], newPs], { through: { active: true } }))
                  .then(() => pub);
              });
          });
        });
    },
  },
  aprovePublication: {
    type: PublicationType,
    name: 'AprovePublication',
    args: {
      MAHtoken: { type: new NotNull(Gstring) },
      publication_id: { type: new NotNull(Int) },
    },
    resolve: (_nada, args) => {
      const userID = decode(args.MAHtoken).id;
      return User.findById(userID)
        .then((usr) => {
          if (!usr.isAdmin) {
            throw new UserError('Solo los administradores pueden realizar esta acción.');
          } else {
            return Publication.findOne({
              where: { id: args.publication_id },
            })
              .then((pub) => {
                if (!pub) {
                  throw new UserError('Esta publicación no existe.');
                } else {
                  return pub.getPublicationStates({ through: { where: { active: true } } })
                    .then((oldPs) => {
                      if (
                        oldPs[0].dataValues.stateName === 'Publicada' ||
                      oldPs[0].dataValues.stateName === 'Destacada' ||
                      oldPs[0].dataValues.stateName === 'Vendida' ||
                      oldPs[0].dataValues.stateName === 'Archivada' ||
                      oldPs[0].dataValues.stateName === 'Vencida' ||
                      oldPs[0].dataValues.stateName === 'Eliminada' ||
                      oldPs[0].dataValues.stateName === 'Apto para garantía'
                      ) {
                        throw new UserError('Esta publicación ya está activa.');
                      }
                      oldPs[0].HistoryState = {
                        active: false,
                      };
                      if (pub.user_id) {
                        User.findById(pub.user_id)
                          .then((us) => {
                            const data = {
                              name: us.name,
                              brand: pub.brand,
                              modelName: pub.modelName,
                            };
                            const msg = {
                              to: us.email,
                              from: miautoEmail,
                              subject: 'Publicación aprobada!',
                              html: generateMailAgenciaoParticular(data, 'approvedPublication'),
                            };
                            sgMail.send(msg);
                          });
                      } else {
                        const data = {
                          name: pub.name,
                          brand: pub.brand,
                          modelName: pub.modelName,
                        };
                        const msg = {
                          to: pub.email,
                          from: miautoEmail,
                          subject: 'Publicación aprobada!',
                          html: generateSinRegistro(data, 'approvedPublication'),
                        };
                        sgMail.send(msg);
                      }
                      return PublicationState.findOne({ where: { stateName: 'Publicada' } })
                        .then(newPs => pub.setPublicationStates([oldPs[0], newPs], { through: { active: true } }))
                        .then(() => pub);
                    });
                }
              });
          }
        });
    },
  },
  disaprovePublication: {
    type: PublicationType,
    name: 'AprovePublication',
    args: {
      MAHtoken: { type: new NotNull(Gstring) },
      publication_id: { type: new NotNull(Int) },
      reason: { type: new NotNull(Gstring) },
    },
    resolve: (_nada, args) => {
      const userID = decode(args.MAHtoken).id;
      return User.findById(userID)
        .then((usr) => {
          if (!usr.isAdmin) {
            throw new UserError('Solo los administradores pueden realizar esta acción.');
          } else {
            return Publication.findOne({
              where: { id: args.publication_id },
            })
              .then((pub) => {
                if (!pub) {
                  throw new UserError('Esta publicación no existe.');
                } else {
                  return pub.getPublicationStates({ through: { where: { active: true } } })
                    .then((oldPs) => {
                      if (oldPs[0].dataValues.stateName === 'Suspendida') {
                        throw new UserError('Esta publicación ya está suspendida.');
                      }
                      if (oldPs[0].dataValues.stateName === 'Vendida') {
                        throw new UserError('Esta publicación ya ha sido vendida.');
                      }
                      if (oldPs[0].dataValues.stateName === 'Vencida') {
                        throw new UserError('Esta publicación ya está vencida.');
                      }
                      oldPs[0].HistoryState = {
                        active: false,
                      };
                      if (pub.email && pub.name) {
                        const data = {
                          name: pub.name,
                          brand: pub.brand,
                          modelName: pub.modelName,
                          reason: args.reason,
                        };
                        const msg = {
                          to: pub.email,
                          from: miautoEmail,
                          subject: 'Publicación desaprobada',
                          html: generateSinRegistro(data, 'disapprovedPublication'),
                        };
                        sgMail.send(msg);
                      } else {
                        User.findById(pub.user_id)
                          .then((us) => {
                            const data = {
                              name: us.name,
                              brand: pub.brand,
                              modelName: pub.modelName,
                              reason: args.reason,
                            };
                            const msg = {
                              to: us.email,
                              from: miautoEmail,
                              subject: 'Publicación desaprobada',
                              html: generateMailAgenciaoParticular(data, 'disapprovedPublication'),
                            };
                            sgMail.send(msg);
                          });
                      }
                      return PublicationState.findOne({ where: { stateName: 'Suspendida' } })
                        .then(newPs => pub.setPublicationStates([oldPs[0], newPs], { through: { active: true } }))
                        .then(() => pub);
                    });
                }
              });
          }
        });
    },
  },

};

module.exports = { PublicationType, PublicationMutation };
