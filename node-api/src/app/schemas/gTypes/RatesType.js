const { UserError } = require('graphql-errors');
const decode = require('jwt-decode');
const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { Rates, User } = require('../../models').mah;

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLNonNull: NotNull,
  GraphQLInt: Int,
  GraphQLString: Gstring,
  GraphQLFloat: Float,
} = graphql;

const RatesType = new ObjectGraph({
  name: 'TasasDeCuota',
  description: 'Tasas de cuotas editables por el administrador',
  fields: _.assign(attributeFields(Rates)),
});

const RateMutations = {
  updateRates: {
    type: RatesType,
    name: 'updateRates',
    description: 'Usado para modificar las cuotas del cotizador',
    args: {
      MAHtoken: { type: new NotNull(Gstring) },
      period: { type: new NotNull(Gstring) },
      rate: { type: new NotNull(Float) },
      term: { type: new NotNull(Int) },
    },
    resolve: (_nada, args) => {
      const userID = decode(args.MAHtoken).id;
      return User.findById(userID)
        .then((usr) => {
          if (!usr.isAdmin) {
            throw new UserError('Solo los administradores pueden editar');
          }
          return Rates.findOne({ where: { period: args.period, term: args.term } })
            .then(rt => rt.update({
              rate: args.rate,
            })
              .then(rtUpdated => rtUpdated));
        });
    },
  },
};
module.exports = { RatesType, RateMutations };
