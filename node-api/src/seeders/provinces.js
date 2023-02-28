import { ProvinceModel } from "../app/models/index.js";

const provincesToCreate = [
  {
    id: 1,
    name: "BUENOS AIRES",
  },
  {
    id: 2,
    name: "CATAMARCA",
  },
  {
    id: 3,
    name: "CHACO",
  },
  {
    id: 4,
    name: "CHUBUT",
  },
  {
    id: 5,
    name: "CIUDAD DE BUENOS AIRES",
  },
  {
    id: 6,
    name: "CÓRDOBA",
  },
  {
    id: 7,
    name: "CORRIENTES",
  },
  {
    id: 8,
    name: "ENTRE RÍOS",
  },
  {
    id: 9,
    name: "FORMOSA",
  },
  {
    id: 10,
    name: "JUJUY",
  },
  {
    id: 11,
    name: "LA PAMPA",
  },
  {
    id: 12,
    name: "LA RIOJA",
  },
  {
    id: 13,
    name: "MENDOZA",
  },
  {
    id: 14,
    name: "MISIONES",
  },
  {
    id: 15,
    name: "NEUQUÉN",
  },
  {
    id: 16,
    name: "RÍO NEGRO",
  },
  {
    id: 17,
    name: "SALTA",
  },
  {
    id: 18,
    name: "SAN JUAN",
  },
  {
    id: 19,
    name: "SAN LUIS",
  },
  {
    id: 20,
    name: "SANTA CRUZ",
  },
  {
    id: 21,
    name: "SANTA FE",
  },
  {
    id: 22,
    name: "SANTIAGO DEL ESTERO",
  },
  {
    id: 23,
    name: "TIERRA DEL FUEGO, ANTÁRTIDA E ISLAS DEL ATLÁNTICO SUR",
  },
  {
    id: 24,
    name: "TUCUMÁN",
  },
];

export const insertProvincesSeeder = async () => {
  try {
    // Check if at least one register exists
    const existingRegister = await ProvinceModel.findOne();

    if (!existingRegister) {
      // Make bulk insert if there are no registers
      return await ProvinceModel.bulkCreate(provincesToCreate, {
        ignoreDuplicates: true,
      });
    }
  } catch (e) {
    console.error("Error inserting provinces: ", e);
  }
};
