const { attributeFields, resolver } = require('graphql-sequelize');
const decode = require('jwt-decode');
const _ = require('lodash');
const graphql = require('graphql');
const { UserError } = require('graphql-errors');
const {
  Publication,
  PublicationState,
  HistoryState,
  sequelize,
} = require('../models').mah;
const { ImageGroupType } = require('./ImageGroupType');
const { HistoryStateType } = require('./HistoryStateType');
const { PublicationStateType } = require('./PublicationStateType');
const { PublicationDetailType } = require('./PublicationDetailType');
const { UserType } = require('./UserType');

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
    },
    resolve: (_nada, args) => {
      const result = {};
      const { Op } = sequelize;
      const options = {};
      const LIMIT = 9;
      options.where = { [Op.and]: {} };

      if (args.page) {
        options.limit = LIMIT;
        options.offset = args.page === 1 ? 0 : (args.page - 1) * LIMIT;
      }
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
      if (args.MAHtoken) {
        options.where = { [Op.and]: {} };
        const user_id = decode(args.MAHtoken).id;
        options.where[Op.and] = Object.assign(options.where[Op.and], {
          user_id,
        });
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
              active: true,
            },
          },
        ];
      }
      return Publication.count(options)
        .then((count) => {
          if (count < 9) {
            delete options.limit;
            delete options.offset;
          }
          return Publication.findAll(options).then((publications) => {
            const totalPages = parseInt(count / 9, 10);
            result.totalCount = count;
            result.hasNextPage = args.page < totalPages;
            result.Publications = publications;
            return result;
          });
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
};

module.exports = { PublicationType, PublicationMutation };
