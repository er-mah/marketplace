const graphql = require('graphql');

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLString: Gstring,
} = graphql;

const AdditionalsType = new ObjectGraph({
  name: 'Adicionales',
  description: 'Data almacenada en extrad3',
  fields: {
    TapizadoCuero: { type: Gstring },
    AsientosElectronicos: { type: Gstring },
    ComputadoraABordo: { type: Gstring },
    FarosDeXenon: { type: graphql.GraphQLInt },
    LlantasDeAleacion: { type: Gstring },
    TechoPanoramico: { type: Gstring },
    SensorDeLluvia: { type: Gstring },
    SensorCrepuscular: { type: Gstring },
    IndicadorPresionNeumaticos: { type: Gstring },
    VolanteConLevas: { type: Gstring },
    Bluetooth: { type: Gstring },
    AsientosTermicos: { type: Gstring },
    RunFlat: { type: Gstring },
  },
});

module.exports = { AdditionalsType };
