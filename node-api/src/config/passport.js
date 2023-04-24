import passport from "passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy as JwtStrategy } from "passport-jwt";
import { config } from "dotenv";

import { UserModel } from "../app/models/index.js";

config();

const secretKeyForJwt = process.env.SECRET_KEY_FOR_JWT;
const secretKeyForEmail = process.env.SECRET_KEY_FOR_EMAIL;

export const options = {
  // ExtractJwt function - Helps extract token from HTTP Authentication header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKeyForJwt,
  expiresIn: "1d",

  emailSecretOrKey: secretKeyForEmail,
  emailExpiresIn: "2h",
};

const verifyValidUser = (jwtPayload, done) => {
  // After the token is verified with `jsonwebtoken` library, we check if we found a valid user in the database
  // `sub` is the user id from the database. JWT payload also has iat and exp
  UserModel.findOne({ where: { id: jwtPayload.sub } })
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

function authenticateRequest(req, res, next) {
  // Authenticate the request using the "jwt" strategy from Passport
  passport.authenticate(
    "jwt",
    { session: false, optional: true },
    (err, user) => {
      if (err) {
        // If there was an error during authentication, pass it on to the next middleware
        return next(err);
      }
      // If authentication was successful, log in the user and pass control to the next middleware
      req.logIn(user, { session: false }, (err) => {
        if (err) {
          // If there was an error while logging in the user, pass it on to the next middleware
          return next(err);
        }
        next();
      });
    }
  )(req, res, next);
}
function omitAuthenticationCheck(req, res, next) {
  // All resolvers are public. We check if user is authenticated inside them.
  return next();
}

export { passport, authenticateRequest, omitAuthenticationCheck };
