import express from "express";

import { publicationRouter } from "./publicationRouter.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send("TechMo Marketplace API");
});
router.use(publicationRouter)


/*



const { loginAdmin, login } = require("../controllers/auth");
const { recoverPassword, changePassword } = require("../controllers/accountRecovery");
const {
  createPublication,
  getSoldPublications,
  getImages,
  editPublication,
} = require("../controllers/publications");
const { uploadAgencyImages } = require("../controllers/agency");
const { registerAgency, registerUser } = require("../controllers/register");
const {
  checkFacebookLogin,
  loginOrRegisterFacebook,
} = require("../controllers/facebookAuth");
const { uploadSliders, getSliders, deleteSlider } = require("../controllers/sliders");
const { getProvinces, getTowns } = require("../controllers/addressInfo");




// On every request made `/techmogql` the user from the token is stored by passport-jwt to req.user
//router.use(  "/techmogql",  passport.authenticate("jwt", { session: false, optional: true }));router.use(    "/techmogql",    apolloServer.getMiddleware());

router.post("/publication", upload.array("imageGroup", 8), createPublication);
router.patch("/publication", upload.array("imageGroup", 8), editPublication);
router.get("/getSoldPublications", getSoldPublications);
router.get("/getImages/:publication_id", getImages);
// TODO FIX FACEBOOK LOGIN
router.post("/registerAgency", registerAgency);
router.post("/registerUser", registerUser);
router.post("/requestCredit", requestCredit);
router.get("/getSliders", getSliders);
router.get("/deleteSlider/:id", deleteSlider);
router.post(
  "/uploadAgencyImages/:id",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  uploadAgencyImages
);
router.post(
  "/uploadSliders/",
  upload.fields([
    { name: "slider", maxCount: 1 },
    { name: "sliderResponsive", maxCount: 1 },
  ]),
  uploadSliders
);

//router.get("/getToken", getToken); TODO GOOGLE ANALYTICS???





router.use("/images", express.static(`${__dirname}/images`));
router.use("/logo", express.static(`${__dirname}/templates/logo.png`));

// TODO FIX Migrate apollo-server-express v1.4.0 to apollo/server
router.use("/graphql", graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'wss://api.miautohoy.com/subscriptions',
}));

router.post("/", httpGraphQLHandler);
router.use(
    "/graphiql",
    graphiqlExpress({
      endpointURL: "/graphql",
      subscriptionsEndpoint: "wss://api.miautohoy.com/subscriptions",
    })
)

 */

export const openRoutes = [
  "/logo",
  "/subscriptions",
  "/graphql",
  "/login",
  "/loginAdmin",
  "/get123Canales",
  /^\/checkFacebookLogin/,
  "/loginOrRegisterFacebook",
  "/recoverPassword",
  "/createPublication",
  "/registerAgency",
  "/registerUser",
  /^\/images/,
  "/requestCredit",
  "/getSliders",
  "/getProvinces",
  /^\/getTowns/,
  "/addUserAndCarData",
];
