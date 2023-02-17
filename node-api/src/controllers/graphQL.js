const Graphql = require("graphql").graphql;
const schema = require("../schema");

export const httpGraphQLHandler = (req, res) => {
    const { query, variables, rootVals } = req.query;
    const authToken = req.user || {};
    return Graphql(schema, query, { authToken, rootVals }, variables)
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
};