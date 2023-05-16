import jwt_decode from "jwt-decode";

export const jwtUtils = {
  getEmailFromToken: async (token: string): Promise<string> => {
    try {
      const decodedToken = await jwt_decode(token);
      return decodedToken.email;
    } catch (error) {
      console.error(error);
      return "";
    }
  },
};
