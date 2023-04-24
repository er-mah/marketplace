import jsonwebtoken from "jsonwebtoken";
import { jwtOpts } from "../config/index.js";

export const emailVerificationUtils = {
  generateEmailVerificationToken: async (user) => {
    // Define JWT payload
    const payload = {
      sub: user.id,
      email: user.email,
      iat: Date.now(),
    };


    // Get signed token
    return await jsonwebtoken.sign(payload, jwtOpts.emailSecretOrKey, {
      expiresIn: jwtOpts.emailExpiresIn,
    });
  },
  // Used in query
  isTokenExpired: (token) => {
    return (
      Date.now() >=
      JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp *
        1000
    );
  },
  // Used in query
  decodeEmailVerificationToken: (token) => {
    try {
      return jsonwebtoken.verify(token, jwtOpts.emailSecretOrKey); // Decodificar el token utilizando la clave secreta
    } catch (err) {
      console.error(
        "There has been an error verifying the token:",
        err.message
      );
      return null;
    }
  },
};
