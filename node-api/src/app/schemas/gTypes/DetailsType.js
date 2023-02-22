
const graphql = require('graphql');

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLString: Gstring,
} = graphql;

const DetailsType = new ObjectGraph({
  name: 'Caracteristicas',
  description: `Características de infoauto{
    Details(ta3_codia: 12287177) {
  Potencia
  Combustible
  VelMax
  Alimentacion
  Cilindrada
  Computadora
  FarosAntiniebla
  Cuero
  CajaAutomatica
  AsientosElectricos
  Bluetooth
  SensorEstacion
  CalefaccionAsientos
  LLantasDeAleacion
  AireAcondicionado
  OpticasXenon
  LevasAlBolante
  CamaraEstacionamiento
  TechoSolarPanoramico
  TechoCorredizo
  SensorDeLluvia
  ControlDeEstabilidad
  AirbagCortina
  ControlTraccion
  ReguladorParFrenado
  AsistenteFrenadoEmergencia
  Airbag
  SensorCrepuscular
  ABS
  AribagLateral
  Isofix
  AirbagRodilla
  RepartidorDeFrenado
  AirbagDeCabeza
  MonitoreoPresionCubiertas
  AyudaArranqueEnPendiente
  ControlDeDescenso
  BloqueoDiferencal
  ControlDinamicoDeConduccion
  DireccionAsistida
  TipoDeVehiculo
  Ancho
  Peso
  Largo
  CantidadDePuertas
  Altura
  PermiteCarga
  Importado
    }
  }
  `,
  fields: {
    Traccion: { type: Gstring },
    Potencia: { type: Gstring },
    Combustible: { type: Gstring },
    VelMax: { type: graphql.GraphQLInt },
    Alimentacion: { type: Gstring },
    Cilindrada: { type: Gstring },
    Computadora: { type: Gstring },
    FarosAntiniebla: { type: Gstring },
    Cuero: { type: Gstring },
    CajaAutomatica: { type: Gstring },
    AsientosElectricos: { type: Gstring },
    Bluetooth: { type: Gstring },
    SensorEstacion: { type: Gstring },
    CalefaccionAsientos: { type: Gstring },
    LLantasDeAleacion: { type: Gstring },
    AireAcondicionado: { type: Gstring },
    OpticasXenon: { type: Gstring },
    LevasAlBolante: { type: Gstring },
    CamaraEstacionamiento: { type: Gstring },
    TechoSolarPanoramico: { type: Gstring },
    TechoCorredizo: { type: Gstring },
    SensorDeLluvia: { type: Gstring },
    ControlDeEstabilidad: { type: Gstring },
    AirbagCortina: { type: Gstring },
    ControlTraccion: { type: Gstring },
    ReguladorParFrenado: { type: Gstring },
    AsistenteFrenadoEmergencia: { type: Gstring },
    Airbag: { type: Gstring },
    SensorCrepuscular: { type: Gstring },
    ABS: { type: Gstring },
    AribagLateral: { type: Gstring },
    Isofix: { type: Gstring },
    AirbagRodilla: { type: Gstring },
    RepartidorDeFrenado: { type: Gstring },
    AirbagDeCabeza: { type: Gstring },
    MonitoreoPresionCubiertas: { type: Gstring },
    AyudaArranqueEnPendiente: { type: Gstring },
    ControlDeDescenso: { type: Gstring },
    BloqueoDiferencal: { type: Gstring },
    ControlDinamicoDeConduccion: { type: Gstring },
    DireccionAsistida: { type: Gstring },
    TipoDeVehiculo: { type: Gstring },
    Ancho: { type: Gstring },
    Peso: { type: Gstring },
    Largo: { type: Gstring },
    CantidadDePuertas: { type: Gstring },
    Altura: { type: Gstring },
    PermiteCarga: { type: Gstring },
    Importado: { type: Gstring },
  },
});

module.exports = { DetailsType };
