const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { tautos30 } = require('../../models').tauto;

const {
  GraphQLObjectType: ObjectGraph,
} = graphql;

const Tautos30type = new ObjectGraph({
  name: 'Brand',
  description: 'Marcas de diferentes autos / camiones',
  fields: _.assign(attributeFields(tautos30)),
});

module.exports = { Tautos30type };
