import {PublicationStateModel} from "../app/models/index.js";

const statesToCreate = [
  {
    "id" : 1,
    "name" : "Creada"
  },
  {
    "id" : 2,
    "name" : "Publicada"
  },
  {
    "id" : 3,
    "name" : "Suspendida"
  },
  {
    "id" : 4,
    "name" : "Destacada"
  },
  {
    "id" : 5,
    "name" : "Vendida"
  },
  {
    "id" : 6,
    "name" : "Archivada"
  },
  {
    "id" : 7,
    "name" : "Eliminada"
  },
  {
    "id" : 8,
    "name" : "Vencida"
  }
];

export const insertPublicationStatesSeeder = async () => {
  try {
    // Check if at least one register exists
    const existingRegister = await PublicationStateModel.findOne();

    if (!existingRegister) {
      // Make bulk insert if there are no registers
      return await PublicationStateModel.bulkCreate(statesToCreate, {
        ignoreDuplicates: true,
      }).finally(() =>
          console.log("\nSeeding publications finished!"));

    }

  } catch (e) {
    console.error("Error inserting publication states: ", e);
  }
};
