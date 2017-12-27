const graphql = require('graphql');

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLString: Gstring,
} = graphql;

const CaracteristicType = new ObjectGraph({
  name: 'Caracteristicas',
  fields: {
    Combustible: { type: Gstring },
    Alimentacion: { type: Gstring },
    Motor: { type: Gstring },
    Puertas: { type: graphql.GraphQLInt },
    Clasificacion: { type: Gstring },
    Cabina: { type: Gstring },
    Carga: { type: Gstring },
    PesoTotal: { type: Gstring },
    VelocidadMax: { type: Gstring },
    Potencia: { type: Gstring },
    Direccion: { type: Gstring },
    AireAcondicionado: { type: Gstring },
    Traccion: { type: Gstring },
    Importado: { type: Gstring },
    Caja: { type: Gstring },
    FrenosAbs: { type: Gstring },
    AirBag: { type: Gstring },
  },
});

module.exports = { CaracteristicType };
