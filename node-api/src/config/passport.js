import passport from "passport";
import LocalStrategy from "passport-local";
import { UserModel } from "../app/models/index.js";
import { passwordsUtils } from "../helpers/index.js";
import { ExtractJwt } from "passport-jwt";
import { Strategy as JwtStrategy } from "passport-jwt";
import { config } from "dotenv";

config();

const secretKeyForJwt = process.env.SECRET_KEY_FOR_JWT;

export const options = {
  // ExtractJwt function - Helps extract token from HTTP Authentication header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKeyForJwt,
  expiresIn: "1d",
};

const verifyValidUser = ({ sub }, done) => {
  // After the token is verified with `jsonwebtoken` library, we check if we found a valid user in the database
    // `sub` is the user id from the database. JWT payload also has iat and exp
  UserModel.findOne({ where: { id: sub } })
    .then((user) => {
      // Grab the user for passport to attach it to request.user
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      return done(err, null);
    });
};

const jwtStrategy = new JwtStrategy(options, verifyValidUser);

passport.use("jwt", jwtStrategy);

export { passport };
