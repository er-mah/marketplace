import {gql} from "@apollo/client";

const CarDetailQuery = gql`#graphql
query Publication($id: Int!) {
  Publication(id: $id) {
      CurrentState {
        stateName
      }
      ImageGroup {
        image1
        image2
        image3
        image4
        image5
        image6
        image7
        image8
        image9
        image10
        image11
        image12
        image13
        image14
        image15
        image16
        image17
        image18
        image19
        image20
      }
      brand
      observation
      group
      modelName
      price
      fuel
      year
      carState
      codia
      kms
      name
      email
      phone
      User{
        id
        email
        name
        address
        phone
        isAgency
        agencyName
        agencyAdress
        agencyEmail
        agencyPhone
        profileImage
        bannerImage
      }
      Province{
        name
      }
      Town{
        name
      }
    }
  }
    `;
const CarSpecs = gql`query Specifications($id: Int!) {
  Publication(id: $id) {
    Specifications {
      Alimentacion
    Motor
    Puertas
    Clasificacion
    Cabina
    Carga
    PesoTotal
    VelocidadMax
    Potencia
    Largo
    Ancho
    Alto

    Direccion
    Traccion
    Importado
    Caja
    FrenosAbs
    Airbag
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
    AsistenteDeFrenadoEmergencia
    ReguladorParFrenado
    
    TapizadoCuero
    AireAcondicionado    
    AsientosElectronicos
    ComputadoraABordo
    FarosDeXenon
    LLantasDeAleacion
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
}
`;
const CommentThreadQuery = gql`
query CommentThread($publication_id: Int!, $MAHtokenP1: String, $chatToken: String) {
  CommentThread(publication_id: $publication_id, MAHtokenP1: $MAHtokenP1, chatToken: $chatToken) {
    id
    chatToken
    messages {
      id
      content
      from_id
      User {
        name
      }
    }
  }
}
`;

export { CarDetailQuery, CarSpecs, CommentThreadQuery };
