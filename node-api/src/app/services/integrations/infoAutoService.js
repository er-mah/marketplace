import axios from "axios";
import { config } from "dotenv";
import { jwtUtils } from "../../../utils/index.js";

config();

const INFOAUTO_AUTH_URL = process.env.INFOAUTO_AUTH_URL;
const INFOAUTO_URL = process.env.INFOAUTO_URL;
const INFOAUTO_USERNAME = process.env.INFOAUTO_USERNAME;
const INFOAUTO_PASSWORD = process.env.INFOAUTO_PASSWORD;

export const InfoAutoService = {
  accessToken: null,
  refreshToken: null,

  /**
   * This function updates the tokens the system needs to get information from InfoAuto
   * @returns {Promise<null>}
   */
  authenticate: async function () {
    const { data } = await axios.post(
      `${INFOAUTO_AUTH_URL}/login`,
      {},
      {
        auth: {
          username: INFOAUTO_USERNAME,
          password: INFOAUTO_PASSWORD,
        },
      }
    );

    // Store token values
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;

    return this.accessToken;
  },

  /**
   * This function gets a new access token with the existing refresh token
   * @returns {Promise<null>}
   */
  refreshAccessToken: async function () {
    const { data } = await axios.post(
      `${INFOAUTO_AUTH_URL}/refresh`,
      {},
      {
        headers: {
          Authorization: "Bearer " + this.refreshToken,
        },
      }
    );

    // Update access token
    this.accessToken = data.access_token;

    return this.accessToken;
  },

  /**
   * This function returns the current available token and its job is to update it in case the access token is invalid
   * @returns {Promise<null>}
   */
  getAccessToken: async function () {
    if (!this.accessToken) {
      return await this.authenticate();
    }

    // If the token is expired, we refresh the token
    if (jwtUtils.isTokenExpired(this.accessToken)) {
      // If refreshToken doesn't exist or refresh is expired, we get new tokens
      if (!this.refreshToken || jwtUtils.isTokenExpired(this.refreshToken)) {
        return await this.authenticate();
      } else {
        return await this.refreshAccessToken();
      }
    }
    return this.accessToken;
  },
  getAllBrands: async function () {
    const { data } = await axios.get(`${INFOAUTO_URL}/brands/download/`, {
      headers: {
        Authorization: "Bearer " + (await this.getAccessToken()),
      },
    });
  },
  searchModel: async function (queryString, page, pageSize) {
    let URL;
    if (page && pageSize) {
      URL = `${INFOAUTO_URL}/search/?query_string=${queryString}&page=${page}&page_size=${pageSize}`;
    } else {
      URL = `${INFOAUTO_URL}/search/?query_string=${queryString}&page=1&page_size=10`;
    }

    const { data, headers } = await axios.get(URL, {
      headers: {
        Authorization: "Bearer " + (await this.getAccessToken()),
      },
    });
    const pagination = headers["x-pagination"];
    return { models: data, pagination: JSON.parse(pagination) };
  },
  getModelFeatures: async function (codia) {
    const { data } = await axios.get(`${INFOAUTO_URL}/models/${codia}/features/`, {
      headers: {
        Authorization: "Bearer " + (await this.getAccessToken()),
      },
    });

    let comfort = [];
    let technical_info = [];
    let engine_transmission = [];
    let safety = [];

    data.forEach(feature => {
      switch (feature.category_name) {
        case 'Confort':
          comfort.push(feature);
          break;
        case 'Datos técnicos':
          technical_info.push(feature);
          break;
        case 'Motor y transmisión':
          engine_transmission.push(feature);
          break;
        case 'Seguridad':
          safety.push(feature);
          break;
      }
    });

    return { comfort, technical_info, engine_transmission, safety };
  },
};
