import {graphiqlExpress} from "apollo-server-express";
import graphqlHTTP from "express-graphql";
import schema from "../schemas";

const express = require("express");


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


export const router = express.Router();

// TODO: We can refactor this

router.post("/login", login);
router.post("/loginAdmin", loginAdmin);
router.post("/recoverPassword", recoverPassword);
router.post("/changePassword", changePassword);
router.post("/publication", upload.array("imageGroup", 8), createPublication);
router.patch("/publication", upload.array("imageGroup", 8), editPublication);
router.get("/getSoldPublications", getSoldPublications);
router.get("/getImages/:publication_id", getImages);
// TODO FIX FACEBOOK LOGIN
// router.get('/checkFacebookLogin/:email', checkFacebookLogin);
// router.post('/loginOrRegisterFacebook/', loginOrRegisterFacebook);
router.post("/registerAgency", registerAgency);
router.post("/registerUser", registerUser);
router.post("/requestCredit", requestCredit);
router.get("/getSliders", getSliders);
router.get("/deleteSlider/:id", deleteSlider);
router.get("/getProvinces", getProvinces);
router.get("/getTowns/:province_id", getTowns);
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
// TODO GOOGLE ANALYTICS???
//router.get("/getToken", getToken);
router.use(
    "/graphiql",
    graphiqlExpress({
        endpointURL: "/graphql",
        subscriptionsEndpoint: "wss://api.miautohoy.com/subscriptions",
    })
)
router.post("/", httpGraphQLHandler);

router.use("/images", express.static(`${__dirname}/images`));
router.use("/logo", express.static(`${__dirname}/mails/logo.png`));
router.use("/graphql", graphqlHTTP({ schema }));


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