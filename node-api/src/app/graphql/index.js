import {typeDefs} from "./typeDefs.js";
import {agency, auth, department, province} from "./resolvers/index.js";

// Resolver map: data resolution functions that resolve the fields solicited by te client
const resolvers = {
  Query: {
    //...messagesResolvers.Query,
    ...department.Query,
    ...province.Query,
    ...agency.Query,
  },
  Mutation: {
    //...messagesResolvers.Mutation,
    ...auth.Mutation,
  },
};

export {resolvers, typeDefs}