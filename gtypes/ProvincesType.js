const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { Provinces } = require('../models').mah;

const {
  GraphQLObjectType: ObjectGraph,
} = graphql;

const ProvincesType = new ObjectGraph({
  name: 'Provinces',
  description: 'Provincias',
  fields: _.assign(attributeFields(Provinces)),
});

module.exports = { ProvincesType };
