import jsonwebtoken from "jsonwebtoken";
import { jwtOpts } from "../config/index.js";
import {UserRepository} from "../app/repositories/index.js";

export const emailVerificationUtils = {
  generateEmailVerificationToken: (user) => {
    // Define JWT payload
    const payload = {
      sub: user.id,
      email: user.email,
      iat: Date.now(),
    };

    // Get signed token
    return jsonwebtoken.sign(payload, jwtOpts.emailSecretOrKey, {
      expiresIn: jwtOpts.emailExpiresIn,
    });
  },


  // Used in mutation
  decodeEmailVerificationToken: (token) => {
    return jsonwebtoken.verify(token, jwtOpts.emailSecretOrKey); // Decodificar el token utilizando la clave secreta
  },

  // Used in mutation
  isTokenExpired: (exp) => {
    return exp < Date.now() / 1000
  },

};
