const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { ImageGroup } = require('../../../../models/index.js').mah;

const {
  GraphQLObjectType: ObjectGraph,
} = graphql;

const ImageGroupType = new ObjectGraph({
  name: 'GruposDeImagenesDePublicaion',
  description: 'Lista de imágenes de una publicación',
  fields: _.assign(attributeFields(ImageGroup)),
});

module.exports = { ImageGroupType };
