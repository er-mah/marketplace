const graphql = require('graphql');
const { resolver } = require('graphql-sequelize');
const { UserType } = require('../gtypes/UserType');
const { User } = require('../models').mah;

const {
  GraphQLSchema: Schema,
  GraphQLList: List,
  GraphQLNonNull: NotNull,
  GraphQLObjectType: ObjectGraph,
  GraphQLInt: Int,
  GraphQLString: Gstring,
} = graphql;

const schema = new Schema({
  query: new ObjectGraph({
    name: 'Root',
    fields: {
      User: {
        type: UserType,
        // args will automatically be mapped to `where`
        args: {
          id: {
            description: 'id of the user',
            type: new NotNull(Int),
          },
        },
        resolve: resolver(User),
      },
      AllUsers: {
        type: new List(UserType),
        args: {
          // An arg with the key limit will automatically be converted to a limit on the target
          limit: {
            type: Int,
          },
          // An arg with the key order will automatically be converted to a order on the target
          order: {
            type: Gstring,
          },
        },
        resolve: resolver(User),
      },
    },
  }),
});


module.exports = schema;
