import jsonwebtoken from "jsonwebtoken";
import { jwtOpts } from "../config/index.js";

export const jwtUtils = {
  issueJWT: async (user) => {
    // Define JWT payload
    const payload = {
      sub: user.id,
      iat: Date.now(),
    };

    // Get signed token
    return await jsonwebtoken.sign(payload, jwtOpts.secretOrKey, {
      expiresIn: jwtOpts.expiresIn,
    });
  },
  isTokenExpired: (token) => {
    return Date.now() >=
      JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp *
        1000
  },
};
