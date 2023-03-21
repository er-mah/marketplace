import passport from "passport";
import LocalStrategy from "passport-local";
import { UserModel } from "../app/models/index.js";
import { passwordsUtils } from "../helpers/index.js";

const customFields = {
  usernameField: "email",
};

// Verify Callback function:
// -- Required by the strategy
// -- `done` is a callback function that represents a function that eventually be
// passed the results of the authentication (localAuthController)
// -- We make our own implementation of password verification
const verifyCallback = (email, password, done) => {
  // Check if user exists
  UserModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        // User doesn't exist: 1st param - there's not an error, 2nd param - there's not a user
        return done(null, false);
      }

      // Check if the password matches with the hash stored in the database
      const isValid = passwordsUtils.arePasswordsMatching(
        password,
        user.password
      );
      if (isValid) {
          // Passwords are valid, the user is authenticated
        return done(null, true);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const localStrategy = new LocalStrategy(customFields, verifyCallback);


passport.use("local", localStrategy);

// Express session related --> we put a user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Express session related --> we grab a user out of the session
passport.deserializeUser((userId, done) => {
  UserModel.findByPk(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

export { passport as passportMdw };
