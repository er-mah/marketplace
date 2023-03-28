import gql from 'graphql-tag';

const AllBrandsQuery = gql`query AllBrands{
  AllBrands{
    ta3_nmarc
    ta3_marca
  }
}
`;

const GroupsQuery = gql`query Group ($gru_nmarc:Int!){
  Group (gru_nmarc: $gru_nmarc){
    gru_nmarc
    gru_cgrup
    gru_ngrup
  }
}
`;

const ModelsQuery = gql`query Models ($ta3_nmarc:Int!, $ta3_cgrup:Int!){
  Models (ta3_nmarc: $ta3_nmarc, ta3_cgrup: $ta3_cgrup){
    ta3_codia
    ta3_model
  }
}
`;

const YearsQuery = gql`query Price ($ta3_codia: Int!) {
  Price(ta3_codia: $ta3_codia) {
    anio
    precio
  }
}
`;

const InfoCarQuery = gql`query Caracteristics($ext_codia: Int!) {
  Caracteristics(ext_codia: $ext_codia) {
    Combustible
    Alimentacion
    Motor
    Puertas
    Clasificacion
    Cabina
    Carga
    PesoTotal
    VelocidadMax
    Potencia
    Direccion
    AireAcondicionado
    Traccion
    Importado
    Caja
    FrenosAbs
    Airbag
  }
  TecnicalData(ex2_codia: $ext_codia) {
    Climatizador
    FarosAntiniebla
    TechoCorredizo
    SensorEstacionamiento
    AirbagLateral
    AirbagCabezaConductor
    AirbagCortina
    AirbagRodilla
    FijacionISOFIX
    ControlDeTraccion
    ControlDeEstabilidad
    ControlDeDescenso
    SistemaArranqueEnPendiente
    ControlDinamicoConduccion
    BloqueoDiferencial
    RepartidorElectronicoDeFrenado
    AsistenteDeFrenadoDeEmergencia
    ReguladorParFrenado
    Largo
    Ancho
    Alto
  }
  Additionals(ex3_codia: $ext_codia) {
    TapizadoCuero
    AsientosElectronicos
    ComputadoraABordo
    FarosDeXenon
    LlantasDeAleacion
    TechoPanoramico
    SensorDeLluvia
    SensorCrepuscular
    IndicadorPresionNeumaticos
    VolanteConLevas
    Bluetooth
    AsientosTermicos
    RunFlat
  }
}
`;


export { AllBrandsQuery, GroupsQuery, ModelsQuery, YearsQuery, InfoCarQuery };
