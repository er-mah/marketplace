const graphql = require('graphql');

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLString: Gstring,
} = graphql;

const TechnicalDataType = new ObjectGraph({
  name: 'TecnicalData',
  description: 'Data almacenada en extrad 2',
  fields: {
    Climatizador: { type: Gstring },
    FarosAntiniebla: { type: Gstring },
    TechoCorredizo: { type: Gstring },
    SensorEstacionamiento: { type: Gstring },
    AirbagLateral: { type: Gstring },
    AirbagCabezaConductor: { type: Gstring },
    AirbagCortina: { type: Gstring },
    AirbagRodilla: { type: Gstring },
    FijacionISOFIX: { type: Gstring },
    ControlDeTraccion: { type: Gstring },
    ControlDeEstabilidad: { type: Gstring },
    ControlDeDescenso: { type: Gstring },
    SistemaArranqueEnPendiente: { type: Gstring },
    ControlDinamicoConduccion: { type: Gstring },
    BloqueoDiferencial: { type: Gstring },
    RepartidorElectronicoDeFrenado: { type: Gstring },
    AsistenteDeFrenadoDeEmergencia: { type: Gstring },
    ReguladorParFrenado: { type: Gstring },
    Largo: { type: Gstring },
    Ancho: { type: Gstring },
    Alto: { type: Gstring },
  },
});

module.exports = { TechnicalDataType };
