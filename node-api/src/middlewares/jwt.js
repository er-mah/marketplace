const jwt = require("express-jwt");

import {openRoutes} from "../app/routes";

// Utilizamos el middleware jwt para verificar tokens de autenticación en todas las rutas excepto en las que
// se encuentran en el objeto unless.
// TODO: CHANGE TO ENV VAR
export const jwtMdw = jwt({ secret: "MAH2018!#" }).unless({ path: openRoutes });