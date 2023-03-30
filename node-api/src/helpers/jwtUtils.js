import jsonwebtoken from "jsonwebtoken";
import { JWTopts } from "../config/index.js";

export const jwtUtils = {
  issueJWT: async (user) => {
    // Define JWT payload
    const payload = {
      sub: user.id,
      iat: Date.now(),
    };

    // Get signed token
    return await jsonwebtoken.sign(payload, JWTopts.secretOrKey, {
      expiresIn: JWTopts.expiresIn,
    });
  },
  isTokenExpired: (token) => {
    return Date.now() >=
      JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp *
        1000
  },
};
