const jsonwt = require("jsonwebtoken");
const { generateForAdmin } = require("../../mails");
const sgMail = require("@sendgrid/mail");

const { User } = require("../models").mah;

// TODO cHANGE THIS TO ENV VARIABLE
const miautoEmail = "contacto@miautohoy.com";

export const checkFacebookLogin = (req, res) => {
  const { email } = req.params;
  User.findOne({ where: { email } }).then((us) => {
    if (!us) {
      res.status(200).send({ message: "Usuario no registrado" });
    } else {
      let userType;
      if (us.agencyName) {
        userType = "Agencia";
      } else {
        userType = "Usuario";
      }
      if (us.isAdmin) {
        userType = "Admin";
      }
      const MAHtoken = jsonwt.sign(
        {
          id: us.id,
          name: us.agencyName || us.name,
          userType,
        },
        "MAH2018!#"
      );
      res.status(200).send({
        status: "ok",
        message: MAHtoken,
      });
    }
  });
};

export const loginOrRegisterFacebook = (req, res) => {
  const {
    data: { email, name },
  } = req.body;
  User.findOne({ where: { email } }).then((us) => {
    if (!us) {
      User.create({
        email,
        name,
        isAgency: false,
      }).then((usr) => {
        const msgToAdmin = {
          to: miautoEmail,
          from: miautoEmail,
          subject: "Nuevo Usuario Registrado!",
          html: generateForAdmin(
            "Hola!",
            "Se ha registrado un nuevo usuario",
            null,
            `Se ha registrado un nuevo usuario con email: ${email} a través de Facebook.`
          ),
        };
        sgMail.send(msgToAdmin);
        const userType = "Usuario";
        const MAHtoken = jsonwt.sign(
          {
            id: usr.id,
            name: usr.agencyName || usr.name,
            userType,
          },
          "MAH2018!#"
        );
        res.status(200).send({
          status: "ok",
          message: MAHtoken,
        });
      });
    } else {
      let userType;
      if (us.isAgency) {
        userType = "Agencia";
      } else {
        userType = "Usuario";
      }
      if (us.isAdmin) {
        userType = "Admin";
      }
      const MAHtoken = jsonwt.sign(
        {
          id: us.id,
          name: us.agencyName || us.name,
          userType,
        },
        "MAH2018!#"
      );
      res.status(200).send({
        status: "ok",
        message: MAHtoken,
      });
    }
  });
};
