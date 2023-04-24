import { Buffer } from "buffer";

export const jwtUtils = {
  isTokenExpired: (token: string): boolean | void => {
    if (token) {
      return (
        Date.now() >=
        JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp *
          1000
      );
    }
  },
};
