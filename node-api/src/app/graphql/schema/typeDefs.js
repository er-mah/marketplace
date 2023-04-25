export const types = `#graphql

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
  hibrido
  electrico
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
  first_name: String!
  last_name: String!
  address: String
  phone: String
  profile_image: String
  dni: String
  locality_id: ID
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
  token: String!
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
`;
export const queries = `#graphql

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
  #"Get all users"
  #getAllUsers: [User!]!
  "Get user"
  me: User!

  # Publication
  "Search vehicle models by searching in InfoAuto API"
  searchVehicleModel(query: String!, page: Int, pageSize: Int): ModelsSearch!

  "Get additional vehicle info from InfoAuto"
  getVehicleModelFeatures(modelId: Int!): ModelFeatures!

}
`;
export const mutations = `#graphql

type Mutation {

  # Agency
  # "Create an agency"

  # "Update agency information"

  # Conversation
  # Thread
  # "Start a conversation"
  # Message
  #  "Add a new message to the conversation"



  # "Update an existing publication"
  # "Delete a publication"

  # Publication change
  # "Create a new publication change"
  # "Update an existing publication change"
  # "Delete a publication change"


  # Publication
  "Create a new publication"
  createPublication(input: NewPublicationInput): Publication!
  "Add additional information to publication"
  addInfoToPublicationBySlug(slug: String, input: AdditionalPublicationInfoInput): Publication!
  
  # Authentication 
  "Register new user"
  register(input: RegisterInput!): BasicUser!

  "Verify newly created account with token"
  verifyAccount(verification_token: String!): BasicUser!

  "Resend account verification email"
  resendVerificationEmail(email: String!): String
  
  "Logs user with correct credentials"
  login(input: LoginInput!): AuthResponse!
  
  "User adds aditional required data"
  verifiedUserAddsRemainingData(input: AdditionalUserDataInput!): BasicUser!
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

input AdditionalUserDataInput {
  address: String
  phone: String
  profile_image: String
  dni: String
  is_agency_representative: Boolean
  agency_id: ID
  locality_id: ID
}


input NewPublicationInput {
  vehicle_brand: String!
  vehicle_group: String
  vehicle_version: String
  vehicle_codia_id: ID
}

input AdditionalPublicationInfoInput {
  vehicle_state: VehicleState!
  vehicle_year: Int!
  vehicle_segment: VehicleSegment!
  kms: Float!
  fuel: Fuel!
  owner_observations: String!
  locality_id: ID!
  currency: Currency!
  price: Int!
  tags: [String]!
}



`;

export const typeDefs = types + queries + mutations;
