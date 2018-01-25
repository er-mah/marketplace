
const { attributeFields, resolver } = require('graphql-sequelize');
const decode = require('jwt-decode');
const _ = require('lodash');
const graphql = require('graphql');
const { Publication, PublicationState, sequelize } = require('../models').mah;
const { ImageGroupType } = require('./ImageGroupType');
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
        type: List(PublicationStateType),
        resolve: resolver(Publication.state, {
          before: (options) => {
            options.include = [
              {
                model: Publication,
                attributes: {
                  exclude: [
                    'kms',
                    'brand',
                    'group',
                    'modelName',
                    'price',
                    'year',
                    'fuel',
                    'observation',
                    'imageGroup_id',
                    'carState',
                    'codia',
                    'name',
                    'email',
                    'phone',
                    'createdAt',
                    'updatedAt',
                    'deletedAt',
                  ],
                },
                through: {
                  attributes: ['createdAt'],
                },
              },
            ];
            return options;
          },
          after(result) {
            const resultWithDate = [];
            result.map((row) => {
              row.createdAt = row.HistoryState.dataValues.createdAt;
              resultWithDate.push(row);
            });
            return resultWithDate;
          },
        }),
      },
      CurrentState: {
        type: PublicationStateType,
        resolve: resolver(Publication.state, {
          after(result) {
            result = _.last(result);
            return result;
          },
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
    },
    resolve: resolver(Publication, {
      before: (options) => {},
      after: (result, args) => {
        result = {};
        const { Op } = sequelize;
        const options = {};
        const LIMIT = 9;
        options.where = { [Op.or]: {}, [Op.and]: {} };

        if (args.page) {
          options.limit = LIMIT;
          options.offset = args.page === 1 ? 0 : (args.page - 1) * LIMIT;
        }
        if (args.text) {
          options.where = { [Op.or]: {}, [Op.and]: {} };
          args.text += '%';
          options.where[Op.or] = Object.assign(
            options.where[Op.or], { brand: { [Op.like]: args.text } },
            { group: { [Op.like]: args.text } },
            { modelName: { [Op.like]: args.text } },
            { kms: { [Op.like]: args.text } },
            { price: { [Op.like]: args.text } },
            { year: { [Op.like]: args.text } },
            { fuel: { [Op.like]: args.text } },
            { codia: { [Op.like]: args.text } },
            { name: { [Op.like]: args.text } },
          );
        }
        if (args.fuel) {
          options.where[Op.and] = Object.assign(options.where[Op.and], { fuel: args.fuel });
        }
        if (args.year) {
          options.where[Op.and] = Object.assign(options.where[Op.and], { year: args.year });
        }
        if (args.state) {
          options.include = [
            {
              model: PublicationState,
              where: {
                stateName: args.state,
              },
            }];
        }
        if (args.MAHtoken) {
          options.where = { [Op.and]: {} };
          const user_id = decode(args.MAHtoken).id;
          options.where[Op.and] = Object.assign(options.where[Op.and], { user_id });
        }

        if (args.carState) {
          options.where[Op.and] = Object.assign(options.where[Op.and], { carState: args.carState });
        }

        if (args.state === 'Activas') {
          options.include = [{
            model: PublicationState,
            where: { [Op.or]: [{ stateName: 'Publicada' }, { stateName: 'Destacada' }, { stateName: 'Vendida' }, { stateName: 'Apto para garantía' }] },
          }];
        }

        return Publication.findAndCountAll(options)
          .then((publications) => {
            result.totalCount = publications.count;
            result.hasNextPage = publications.count > publications.rows.length && publications.rows.length !== 0;
            result.Publications = publications.rows;
            return result;
          });
      },
    }),
  },
};

module.exports = { PublicationType, PublicationMutation };
