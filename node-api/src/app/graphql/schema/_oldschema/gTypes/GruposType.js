const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { grupos } = require('../../../../models/index.js').tauto;

const {
  GraphQLObjectType: ObjectGraph,
} = graphql;

const GruposType = new ObjectGraph({
  name: 'Grupos',
  description: 'Grupos de autos',
  fields: _.assign(attributeFields(grupos)),
});

module.exports = { GruposType };
