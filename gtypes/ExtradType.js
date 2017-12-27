const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { extrad } = require('../models').tauto;

const {
  GraphQLObjectType: ObjectGraph,
} = graphql;

const ExtradType = new ObjectGraph({
  name: 'Caracteristicas',
  description: 'Características principales de un auto',
  fields: _.assign(attributeFields(extrad)),
});

module.exports = { ExtradType };
