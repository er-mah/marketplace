const fetch = require('node-fetch');
const oauth2 = require('simple-oauth2');
require('dotenv').config();


const credentials = {
  client: {
    id: process.env.client_id,
    secret: process.env.client_secret,
  },
  auth: {
    tokenHost: 'https://info_auto.gestion.online',
  },
};
// const tokenConfig = {
//   scope: 'read',
// };
// let accessToken;
// const authentication = oauth2.create(credentials);
// authentication.authorizationCode.getToken(tokenConfig)
//   .then((result) => {
//     accessToken = authentication.accessToken.create(result);
//     console.log(accessToken);
//   });
// Initialize the OAuth2 Library
const customFetch = (url, method, token, contentType) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': contentType,
    },
    method,
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData => responseData)
    .catch(e => Promise.reject(e));
};

const infoAutoResolver = (type, arg) => {
  const baseUrl = 'https://info_auto.gestion.online/api/custom/public';
  const baseOpt = {
    headers: {
      Accept: 'application/vnd.gestion.online+json',
      'X-Force-Content-Type': 'application/json',
    },
    method: 'GET',
  };
  switch (type) {
    case 'brand': {
      return fetch(`${baseUrl}/brands`, baseOpt)
        .then(response => response.json())
        .then(resData => resData.map(row => ({
          ta3_marca: row.name,
          ta3_nmarc: row.id,
        })));
    }
    case 'group': {
      return fetch(`${baseUrl}/models?brandId=${arg}`, baseOpt)
        .then(response => response.json())
        .then(resData => resData.map(row => ({
          gru_cgrup: row.id,
          gru_ngrup: row.name,
          gru_nmarc: arg,
          type: row.type,
        })));
    }
    case 'model': {
      return fetch(`${baseUrl}/vehicles?modelId=${arg}`, baseOpt)
        .then(response => response.json())
        .then(resData => resData.map(row => ({
          ta3_codia: row.codia,
          ta3_model: row.name,
          since: row.since,
          to: row.to,
          description: row.description,
        })));
    }
    default: return false;
  }
};
module.exports = { customFetch, infoAutoResolver };
