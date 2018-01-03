const { attributeFields, resolver } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { Publication } = require('../models').mah;
const { ImageGroupType } = require('./ImageGroupType');
const { PublicationStateType } = require('./PublicationStateType');

const {
  GraphQLObjectType: ObjectGraph, GraphQLList: List,
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
    },
  ),
});

module.exports = { PublicationType };
