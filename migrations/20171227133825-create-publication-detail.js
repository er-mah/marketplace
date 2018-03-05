

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PublicationDetails', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    Alimentacion: {
      type: Sequelize.STRING,
    },
    Motor: {
      type: Sequelize.STRING,
    },
    Puertas: {
      type: Sequelize.INTEGER,
    },
    Clasificacion: {
      type: Sequelize.STRING,
    },
    Cabina: {
      type: Sequelize.STRING,
    },
    Carga: {
      type: Sequelize.STRING,
    },
    PesoTotal: {
      type: Sequelize.STRING,
    },
    VelocidadMax: {
      type: Sequelize.STRING,
    },
    Potencia: {
      type: Sequelize.STRING,
    },
    Largo: {
      type: Sequelize.FLOAT,
    },
    Ancho: {
      type: Sequelize.FLOAT,
    },
    Alto: {
      type: Sequelize.FLOAT,
    },

    Direccion: {
      type: Sequelize.STRING,
    },
    AireAcondicionado: {
      type: Sequelize.BOOLEAN,
    },
    Traccion: {
      type: Sequelize.STRING,
    },
    Importado: {
      type: Sequelize.STRING,
    },
    Caja: {
      type: Sequelize.STRING,
    },
    FrenosAbs: {
      type: Sequelize.BOOLEAN,
    },
    Airbag: {
      type: Sequelize.BOOLEAN,
    },
    Climatizador: {
      type: Sequelize.STRING,
    },
    FarosAntiniebla: {
      type: Sequelize.BOOLEAN,
    },
    TechoCorredizo: {
      type: Sequelize.BOOLEAN,
    },
    SensorEstacionamiento: {
      type: Sequelize.STRING,
    },
    AirbagLateral: {
      type: Sequelize.BOOLEAN,
    },
    AirbagCabezaConductor: {
      type: Sequelize.BOOLEAN,
    },
    AirbagCortina: {
      type: Sequelize.BOOLEAN,
    },
    AirbagRodilla: {
      type: Sequelize.BOOLEAN,
    },
    
    FijacionISOFIX: {
      type: Sequelize.BOOLEAN,
    },
    ControlDeTraccion: {
      type: Sequelize.BOOLEAN,
    },
    ControlDeEstabilidad: {
      type: Sequelize.BOOLEAN,
    },
    ControlDeDescenso: {
      type: Sequelize.BOOLEAN,
    },
    SistemaArranqueEnPendiente: {
      type: Sequelize.BOOLEAN,
    },
    ControlDinamicoConduccion: {
      type: Sequelize.BOOLEAN,
    },
    BloqueoDiferencial: {
      type: Sequelize.BOOLEAN,
    },
    RepartidorElectronicoDeFrenado: {
      type: Sequelize.BOOLEAN,
    },
    AsistenteDeFrenadoEmergencia: {
      type: Sequelize.BOOLEAN,
    },
    ReguladorParFrenado: {
      type: Sequelize.BOOLEAN,
    },
    TapizadoCuero: {
      type: Sequelize.BOOLEAN,
    },
    AsientosElectronicos: {
      type: Sequelize.BOOLEAN,
    },
    ComputadoraABordo: {
      type: Sequelize.BOOLEAN,
    },
    FarosDeXenon: {
      type: Sequelize.BOOLEAN,
    },
    LLantasDeAleacion: {
      type: Sequelize.BOOLEAN,
    },
    TechoPanoramico: {
      type: Sequelize.BOOLEAN,
    },
    SensorDeLluvia: {
      type: Sequelize.BOOLEAN,
    },
    SensorCrepuscular: {
      type: Sequelize.BOOLEAN,
    },
    IndicadorPresionNeumaticos: {
      type: Sequelize.BOOLEAN,
    },
    VolanteConLevas: {
      type: Sequelize.BOOLEAN,
    },
    Bluetooth: {
      type: Sequelize.BOOLEAN,
    },
    AsientosTermicos: {
      type: Sequelize.BOOLEAN,
    },
    RunFlat: {
      type: Sequelize.BOOLEAN,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('PublicationDetails'),
};
