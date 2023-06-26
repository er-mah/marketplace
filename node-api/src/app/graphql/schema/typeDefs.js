export const types = `#graphql

"'Agency' type represents the agency that has vehicle publications associated"
type Agency {
  id: ID!
  name: String
  address: String
  email: String
  phone: String
  locality_id: ID
  bannerImage: String
  zip_code: String
  representatives: [BasicUser]
}

"'ConversationMessage' represents a message emitted by a user"
type ConversationMessage {
  id: ID!
  createdAt: String
  deletedAt: String
  read_at: String
  content: String
  user: User!
}



"'ConversationThread' represents the communication between a seller and a person interested in a vehicle"
type ConversationThread {
  id: ID!
  createdAt: String
  deletedAt: String
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
  createdAt: String
  deletedAt: String
  vehicle_year: String!
  vehicle_brand: String!
  vehicle_version: String!
  vehicle_model: String!
  vehicle_state: VehicleState
  vehicle_segment: VehicleSegment
  location: Locality
  kms: String
  price: Float
  fuel: Fuel
  details: String
  slug: String!
  changes: [PublicationChanges]
  conversations: [Int]
  photos_urls: [String]
  owner: BasicUser
}

"'PublicationChanges' represents a publication associated images"
type PublicationChanges {
  id: ID!
  active: Boolean!
  name: String!
  createdAt: String
  deletedAt: String
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
  agency_id: ID
  locality_id: ID
  is_admin: Boolean
  is_agency_representative: Boolean
  is_email_verified: Boolean
  is_account_disabled: Boolean
}

type BasicAgency {
  id: ID!
  name: String!
}


type BasicUser {
  id: ID!
  email: String!
  first_name: String!
  last_name: String!
}

type AuthResponse {
  token: String!
  pending_steps: String!
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

type CCAResponse {
  id: ID
  name: String
  version: String
  precio: String
}
`;
export const queries = `#graphql

type Query {
  # Agency
  "Get an agency by its ID"
  getAgencyById(id: ID!): Agency
  "Get all agencies"
  getAllAgencies: [Agency]
  "Search agencies by name"
  searchAgencies(query: String!): [BasicAgency]

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
  
  "Get available brands from CCA API"
  getVehicleBrands: [CCAResponse]
  "Get available models by a brand from CCA API"
  getVehicleModelsByBrandName(brand: String!): [CCAResponse]
  "Get available years of a model from CCA API"
  getVehicleYearsByModelID(modelId: ID!): [CCAResponse]
  "Get available versions in an specific year from CCA API"
  getVehicleVersionsByYear(year: String!, modelId: ID!): [CCAResponse]

  # Users
  "Get a user by their ID"
  getUserById(id: ID!): User
  #"Get all users"
  #getAllUsers: [User!]!
  "Get user"
  me: User!

}
`;
export const mutations = `#graphql

type Mutation {

  # Agency
  "Create an agency"
  createAgency(input: NewAgencyInput): Agency!

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
  resendAccountVerificationCode(email: String!): String

  "Send password recovery email"
  sendPasswordRecoveryEmail(email: String!): String

  "Set new password with recovery token"
  setNewPassword(recovery_token: String!, password: String!, repeat_password: String!): BasicUser!
  
  "Logs user with correct credentials"
  login(input: LoginInput!): AuthResponse!

  loginOrRegisterWithProvider(input: OAuthProviderInput!): AuthResponse!
  
  "User adds aditional required data"
  completePersonalInformation(input: AdditionalUserDataInput!): User!
}


input RegisterInput {
  first_name: String!
  last_name: String!
  email: String!
  password: String!
  repeat_password: String!
}

input LoginInput {
  email: String!
  password: String!
}

input OAuthProviderInput {
    firebase_uid: String!
    provider: String!
    first_name: String!
    last_name: String!
    photo_url: String!
    email: String!
    is_email_verified: Boolean!
}


input AdditionalUserDataInput {
  address: String!
  phone: String!
  dni: String!
  is_agency_representative: Boolean!
  agency_id: ID
  locality_id: String!
}


input NewAgencyInput {
  name: String!
  address: String!
  email: String!
  phone: String!
  locality_id: ID!
  zip_code: String!
}

input NewPublicationInput {
  vehicle_brand: String!
  vehicle_model: String!
  vehicle_year: String!
  vehicle_version: String!
}

input AdditionalPublicationInfoInput {
  vehicle_state: VehicleState!
  vehicle_segment: VehicleSegment!
  kms: Float!
  fuel: Fuel!
  description: String!
  locality_id: ID!
  currency: Currency!
  price: Int!
}



`;

export const typeDefs = types + queries + mutations;
