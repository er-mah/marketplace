import { db } from "../../config/db.js";
import { DataTypes } from "sequelize";

/* Todo: delete this
* DETERMINA EL ESTADO DE LAS PUBLICACIONES
1	Pendiente
2	Publicada
3	Destacada
4	Suspendida
5	Vendida
6	Archivada
7	Eliminada
8	Vencida
9	Apto para garantía
* */

// This model holds the different states a publication can have
export const PublicationStateModel = db.define(
  "Publication State",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    state_name: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);
