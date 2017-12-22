const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { User } = require('../models').mah;

const {
  GraphQLObjectType: ObjectGraph,
} = graphql;

const UserType = new ObjectGraph({
  name: 'User',
  description: 'Usuario que puede ser agencia o un usuario común',
  fields: _.assign(attributeFields(User)),
});

module.exports = { UserType };
