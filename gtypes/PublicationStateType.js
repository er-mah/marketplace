const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { PublicationState } = require('../models').mah;

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLString: Gstring,
} = graphql;

const PublicationStateType = new ObjectGraph({
  name: 'EstadoDePublicacion',
  description: 'El estado en que se encuentra una publicación',
  fields: _.assign(attributeFields(PublicationState), {
    createdAt: { type: Gstring },
  }),
});

module.exports = { PublicationStateType };
