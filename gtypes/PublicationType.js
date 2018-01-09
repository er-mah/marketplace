
const { attributeFields, resolver } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { Publication, sequelize } = require('../models').mah;
const { ImageGroupType } = require('./ImageGroupType');
const { PublicationStateType } = require('./PublicationStateType');
const { PublicationDetailType } = require('./PublicationDetailType');
const { CommentThreadType } = require('./CommentThreadType');

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLList: List,
  GraphQLNonNull: NotNull,
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
    },
  ),
});

const PublicationMutation = {
  searchPublication: {
    type: List(PublicationType),
    name: 'searchPublication',
    description: 'Búsqueda de una publicacion con cualquier parámetro',
    args: {
      carState: { type: new NotNull(Gstring) },
      text: { type: new NotNull(Gstring) },
    },
    resolve: resolver(Publication, {
      before: (options, args) => {
        const { Op } = sequelize;
        args.text += '%';
        options.where = {
          [Op.or]: [
            { brand: { [Op.like]: args.text } },
            { group: { [Op.like]: args.text } },
            { modelName: { [Op.like]: args.text } },
            { kms: { [Op.like]: args.text } },
            { price: { [Op.like]: args.text } },
            { year: { [Op.like]: args.text } },
            { fuel: { [Op.like]: args.text } },
            { observation: { [Op.like]: args.text } },
            { codia: { [Op.like]: args.text } },
            { name: { [Op.like]: args.text } },
          ],
          [Op.and]: { carState: args.carState },
        };
        return options;
      },
    }),
  },
};

module.exports = { PublicationType, PublicationMutation };
