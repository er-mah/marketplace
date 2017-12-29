const { attributeFields, resolver } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { Publication, User, ImageGroup } = require('../models').mah;
const { ImageGroupType } = require('./ImageGroupType');
const { PublicationStateType } = require('./PublicationStateType');

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLList: List,
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
      State: {
        type: List(PublicationStateType),
        resolve: resolver(Publication.state, {
          before: options => options,
          after(result) {
            return result;
          },
        }),
      },
    },
  ),
});

module.exports = { PublicationType };
