import axios from "axios";
import {config} from "dotenv";

config();

const CCA_URL = process.env.CCA_URL;

export const CCAService = {
  getAllBrands: async function () {
    const { data } = await axios.get(`${CCA_URL}/listamarcas`);

    return await data.map(function (brand, index) {
      return {
        id: brand.name,
        name: brand.name,
      };
    });
  },

  getModelsByBrandName: async function (brandName) {
    const { data } = await axios.get(`${CCA_URL}/listamodelos/${brandName}`);
    return data;
  },

  getYearsByModelID: async function (modelId) {
    const { data } = await axios.get(
      `${CCA_URL}/listaversionanio/${modelId}/null`
    );

    return await data.map(function (year, index) {
      return {
        id: year.name,
        name: year.name,
      };
    });
  },

  getModelVersionsByYear: async function (year, modelId) {
    const { data } = await axios.get(
      `${CCA_URL}/listaversionanio/${modelId}/${year}`
    );

    return await data.map(function (model, index) {
      return {
        id: model.version,
        name: model.version,
      };
    });
  },
};
