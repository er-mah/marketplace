const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { HistoryState } = require('../../models').mah;

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLString: Gstring,
} = graphql;

const HistoryStateType = new ObjectGraph({
  name: 'HistorialDePublicacion',
  description: 'El estado en que se encuentra una publicación',
  fields: {
    createdAt: { type: Gstring },
    stateName: { type: Gstring },
  },
});

module.exports = { HistoryStateType };
