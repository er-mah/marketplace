const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { Town } = require('../../models').mah;

const {
  GraphQLObjectType: ObjectGraph,
} = graphql;

const TownType = new ObjectGraph({
  name: 'Town',
  description: 'Provincias',
  fields: _.assign(attributeFields(Town)),
});

module.exports = { TownType };
