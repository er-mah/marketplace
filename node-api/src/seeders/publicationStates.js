import {PublicationStateModel} from "../app/models/index.js";

const statesToCreate = [
  {
    "id" : 1,
    "state_name" : "Pendiente"
  },
  {
    "id" : 2,
    "state_name" : "Publicada"
  },
  {
    "id" : 3,
    "state_name" : "Destacada"
  },
  {
    "id" : 4,
    "state_name" : "Suspendida"
  },
  {
    "id" : 5,
    "state_name" : "Vendida"
  },
  {
    "id" : 6,
    "state_name" : "Archivada"
  },
  {
    "id" : 7,
    "state_name" : "Eliminada"
  },
  {
    "id" : 8,
    "state_name" : "Vencida"
  },
  {
    "id" : 9,
    "state_name" : "Apto para garantía"
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
      });
    }

  } catch (e) {
    console.error("Error inserting publication states: ", e);
  }
};
