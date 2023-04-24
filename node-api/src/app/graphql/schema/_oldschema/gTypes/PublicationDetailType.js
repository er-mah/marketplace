const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { PublicationDetail } = require('../../../../models/index.js').mah;

const {
  GraphQLObjectType: ObjectGraph,
} = graphql;

const PublicationDetailType = new ObjectGraph({
  name: 'DetalleDePublicacion',
  description: 'Guarda los detalles del auto',
  fields: _.assign(attributeFields(PublicationDetail)),
});

module.exports = { PublicationDetailType };
