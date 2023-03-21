import express from "express";
import passport from "passport";


export const auth = express.Router();


// auth.post("/login", passport.authenticate('local'), localLoginController)
// auth.post("/register", passport.authenticate('local'), registerController)

/*
    router.post(
      "/login/password",
      // First we pass the request to passport
      passport.authenticate(
        "local",
        {
          successReturnToOrRedirect: "/",
          failureRedirect: "/login",
          failureMessage: true,
        },
        (req, res) => loginController(req, res)
      )
    );
*/
//router.post("/loginAdmin", loginAdmin);
//router.post("/recoverPassword", recoverPassword);
//router.post("/changePassword", changePassword);
// router.get('/checkFacebookLogin/:email', checkFacebookLogin);
// router.post('/loginOrRegisterFacebook/', loginOrRegisterFacebook);