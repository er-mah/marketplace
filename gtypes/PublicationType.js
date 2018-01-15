
const { attributeFields, resolver } = require('graphql-sequelize');
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
  },
});

const PublicationMutation = {
  searchPublication: {
    type: SearchResult,
    name: 'searchPublication',
    description: 'Búsqueda de una publicacion con cualquier parámetro',
    args: {
      carState: { type: new NotNull(Gstring) },
      text: { type: new NotNull(Gstring) },
      page: { type: Int },
      limit: { type: Int },
      offset: { type: Int },
      fuel: { type: Gstring },
      year: { type: Int },
      state: { type: Gstring },
    },
    resolve: resolver(Publication, {
      after: (result, args) => {
        if (result === null) {
          result = {};
        }
        const { Op } = sequelize;
        const options = {};
        args.text += '%';
        const LIMIT = 9;

        if (args.page) {
          options.limit = LIMIT;
          options.offset = args.page === 1 ? 0 : (args.page - 1) * LIMIT;
        }

        options.where = {
          [Op.or]: [
            { brand: { [Op.like]: args.text } },
            { group: { [Op.like]: args.text } },
            { modelName: { [Op.like]: args.text } },
            { kms: { [Op.like]: args.text } },
            { price: { [Op.like]: args.text } },
            { year: { [Op.like]: args.text } },
            { fuel: { [Op.like]: args.text } },
            { codia: { [Op.like]: args.text } },
            { name: { [Op.like]: args.text } },
          ],
          [Op.and]: { carState: args.carState },
        };
        if (args.fuel) {
          Object.assign(options.where, { [Op.and]: { fuel: args.fuel } });
        }
        if (args.year) {
          Object.assign(options.where, { [Op.and]: { year: args.year } });
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
        return Publication.findAll(options)
          .then((publications) => {
            result.Publications = publications;
            return result;
          });
      },
    }),
  },
};

module.exports = { PublicationType, PublicationMutation };
