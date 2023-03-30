export const typeDefs = `#graphql

"'Agency' type represents the agency that has vehicle publications associated"
type Agency {
  id: ID!
  created_at: String
  deleted_at: String
  name: String
  address: String
  email: String
  phone: String
  bannerImage: String
  representatives: [User]
}

"'ConversationMessage' represents a message emitted by a user"
type ConversationMessage {
  id: ID!
  created_at: String
  deleted_at: String
  read_at: String
  content: String
  user: User!
}



"'ConversationThread' represents the communication between a seller and a person interested in a vehicle"
type ConversationThread {
  id: ID!
  created_at: String
  deleted_at: String
  chat_token: String
  messages: [ConversationMessage]!
  participant_1: User!
  participant_2: User!
  publication: Publication!
}

"'Department' is part of a province"
type Department {
  id: ID!
  name: String
  #localities: [Locality!]!
  #province: Province!
}

"'Locality' represents a locality that belongs to a department inside a province"
type Locality {
  id: ID!
  name: String
  latitude: String
  longitude: String
}

"'Province' represents an argentinian province"
type Province {
  id: ID!
  name: String
}

enum VehicleState {
  nuevo
  usado
}

enum VehicleSegment {
  alta_gama
  ciudad
  familia
  todo_terreno
  utilitario
  otro
}

enum Currency {
  usd
  ars
}

enum Fuel {
  diesel
  nafta
  nafta_gnc
  turbo_diesel
  otro
}

"'Publication' type represents a vehicle publication that users can interact with"
type Publication {
  id: ID!
  created_at: String
  deleted_at: String
  vehicle_year: String
  vehicle_brand: String!
  vehicle_version: String!
  vehicle_group: String!
  vehicle_codia_id: Int!
  vehicle_state: VehicleState
  vehicle_segment: VehicleSegment
  location: Locality
  kms: String
  price: Float
  fuel: Fuel
  owner_observations: String
  info_auto_specs: ModelFeatures
  words: String
  slug: String
  changes: [PublicationChanges]
  conversations_id: [Int]
  photos: [String]
  owner: BasicUser
}

"'PublicationChanges' represents a publication associated images"
type PublicationChanges {
  id: ID!
  active: Boolean!
  state: PublicationState!
  created_at: String
  deleted_at: String
}

type PublicationState {
  id: ID!
  state_name: String
}

"'Vehicle feature' type defines the data type InfoAuto uses to associate characteristics"
type VehicleFeature {
  id: ID
  description: String
  type: String
  position: Int
  length: Int
  value: String
  value_description: String
}

type ModelFeatures {
  comfort: [VehicleFeature]!
  technical_info: [VehicleFeature]!
  engine_transmission:[VehicleFeature]!
  safety:[VehicleFeature]!
}

"'User' represents the different users the system interacts with"
type User {
  id: ID!
  email: String!
  password: String!
  first_name: String!
  last_name: String!
  address: String
  phone: String
  profile_image: String
  dni: String
  is_admin: Boolean
  is_agency_representative: Boolean
  is_email_verified: Boolean
  is_account_disabled: Boolean
  createdAt: String!
  updatedAt: String!
  deletedAt: String
}


type BasicUser {
  id: ID!
  email: String!
  first_name: String!
  last_name: String!
}

type AuthResponse {
  id: ID!
  token: String
}


type ModelsSearch {
  models: [VehicleModel]!
  pagination: Pagination!
}
type VehicleModel {
  position: Int!
  codia: Int!
  brand: VehicleBrand!
  group: VehicleSegment!
  description: String!
  photo_url: String!
  prices_from: Int!
  prices_to: Int!
}
type VehicleBrand {
  id: Int!
  name: String!
}
type VehicleGroup {
  id: Int!
  name: String!
}

type Pagination {
  total: Int!
  total_pages: Int!
  first_page: Int
  last_page: Int
  page: Int!
  next_page: Int
  page_size: Int!
}




type Query {
  # Agency
  "Get an agency by its ID"
  getAgencyById(id: ID!): Agency
  "Get all agencies"
  getAllAgencies: [Agency]

  # Conversation thread
  "Get a conversation thread by its ID"
  getConversationThreadById(id: ID!): ConversationThread

  # Location info
  "Get localities by a department ID"
  getLocalitiesByDepartmentId(id: ID!): [Locality]
  "Get departments by a province ID"
  getDepartmentsByProvinceId(id: ID!): [Department]
  "Get all provinces"
  getAllProvinces: [Province]

  # Publications
  "Get a publication by its ID"
  getPublicationById(id: ID!): Publication
  "Get all publications"
  getAllPublications: [Publication]

  # Users
  "Get a user by their ID"
  getUserById(id: ID!): User
  "Get all users"
  getAllUsers: [User!]!

  searchVehicleModel(query: String!, page: Int, pageSize: Int): ModelsSearch!
  getVehicleModelFeatures(modelId: Int!): ModelFeatures!

}

type Mutation {

  # Agency
  "Create an agency"
  createAgency(
    name: String!
    address: String!
    email: String!
    phone: String!
    bannerImage: String!
    representativeIds: [ID]!
  ): Agency

  "Update agency information"
  updateAgency(
    id: ID!
    name: String
    address: String
    email: String
    phone: String
    bannerImage: String
    representativeIds: [ID]
  ): Agency
  "Safe delete agency information"
  deleteAgency(id: ID!): Boolean

  # Conversation
  # Thread
  "Start a conversation"
  createConversationThread(
    participant1Id: ID!
    participant2Id: ID!
    publicationId: ID!
  ): ConversationThread
  # Message
  "Add a new message to the conversation"
  createConversationMessage(
    content: String!
    userId: ID!
    threadId: ID!
  ): ConversationMessage

  # Publication
  "Create a new publication"
  createPublication(input: NewPublicationInput): Publication!


  "Update an existing publication"
  updatePublication(
    id: ID!
    vehicleYear: String
    vehicleBrand: String
    vehicleModel: String
    vehicleVersion: String
    vehicleCodiaId: Int
    vehicleState: String
    vehicleGroup: String
    localityId: ID
    kms: String
    price: Float
    fuel: String

    ownerObservations: String
    "infoAutoSpecs: [VehicleFeatureInput]"
    words: String
    "photoAlbum: PublicationPhotoAlbumInput"
    slug: String
    "changes: [PublicationChangeInput]"
    conversationThreadIds: [ID]
  ): Publication
  "Delete a publication"
  deletePublication(id: ID!): Boolean

  # Publication change
  "Create a new publication change"
  createPublicationChange(
    publicationId: ID!
    active: Boolean
  ): PublicationChanges
  "Update an existing publication change"
  updatePublicationChange(id: ID!, active: Boolean): PublicationChanges
  "Delete a publication change"
  deletePublicationChange(id: ID!): Boolean

  # User
  "Update user information"
  updateUser(id: ID!, input: UpdateUserInput!): User!
  "Safe delete account user"
  deleteUser(id: ID!): User!


  # Authentication 
  "Register new user"
  register(input: RegisterInput!): BasicUser!
  login(input: LoginInput!): AuthResponse
}

input RegisterInput {
  first_name: String!
  last_name: String!
  email: String!
  password: String!
}

input LoginInput {
  email: String!
  password: String!
}

input NewPublicationInput {
  vehicle_brand: String!
  vehicle_group: String
  vehicle_version: String
  vehicle_codia_id: ID
}

input UpdateUserInput {
  email: String
  password: String
  first_name: String
  last_name: String
  address: String
  phone: String
  profile_image: String
  dni: String
  is_admin: Boolean
  is_agency_representative: Boolean
  is_email_verified: Boolean
  is_account_disabled: Boolean
}
`;
