const _ = require("lodash");
const { generateMailAgenciaoParticular } = require("../mails");
const sgMail = require("@sendgrid/mail");
const jsonwt = require("jsonwebtoken");

const { User } = require("../models").mah;
import { ResponseObj } from "./responseObject";

// TODO cHANGE THIS TO ENV VARIABLE
const miautoEmail = "contacto@miautohoy.com";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (_.isNull(user)) {
        console.log("usuario inexistente");
        res.status(401).send({
          status: "error",
          message: "Usuario inexistente o contraseña incorrecta.",
        });
        return false;
      }
      try {
        if (_.isNull(user.password)) {
          res.status(401).send({
            status: "error",
            message:
              "Usted ya se encuentra registrado a través de una red social. Ingrese presionando el botón correspondiente.",
          });
          return false;
        }
        if (!user.validPassword(password, user.password)) {
          res.status(401).send({
            status: "error",
            message: "Usuario inexistente o contraseña incorrecta.",
          });
          return false;
        }
      } catch (e) {
        if (e === "Not a valid BCrypt hash.") {
          User.findOne({ where: { email } }).then((us) => {
            if (!us) {
              res
                .status(400)
                .send(
                  ResponseObj(
                    "error",
                    "No existe un usuario registrado con ese email."
                  )
                );
              return false;
            }
            const hash = User.generateHash(Math.random().toString());
            us.update({
              password: hash,
            }).then(() => {
              const data = {
                name: us.name,
                hash,
              };
              const msg = {
                to: us.email,
                from: miautoEmail,
                subject: "Recupero de contraseña",
                html: generateMailAgenciaoParticular(data, "recoverPassword"),
              };
              sgMail.send(msg).catch((err) => {
                console.log(err);
              });
            });
          });

          res.status(401).send({
            status: "error",
            message:
              "Tu contraseña ha expirado, te enviaremos un mail para que la actualices.",
          });
          return false;
        }
        return res.status(500).send({
          status: "error",
          message: e,
        });
      }
      let userType;
      if (user.agencyName) {
        userType = "Agencia";
      } else {
        userType = "Usuario";
      }
      if (user.isAdmin) {
        userType = "Admin";
      }
      const MAHtoken = jsonwt.sign(
        {
          id: user.id,
          name: user.agencyName || user.name,
          userType,
        },
        // todo: change this
        "MAH2018!#"
      );

      res.status(200).send({
        status: "ok",
        message: MAHtoken,
      });

      return false;
      /*
            if (user.isAdmin === false) {
              res.status(400).send({
                status: 'error',
                message: 'No tienes permisos para acceder aquí.',
              });
              return false;
            }
       */
    })
    .catch((error) =>
      res.status(400).send({
        status: "error",
        message: error,
      })
    );
};

export const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      console.log(user.dataValues);
      if (_.isNull(user)) {
        console.log("usuario inexistente");
        res.status(400).send({
          status: "error",
          message: "Usuario inexistente o contraseña incorrecta.",
        });
        return false;
      }
      if (!user.validPassword(password, user.password)) {
        res.status(401).send({
          status: "error",
          message: "Usuario inexistente o contraseña incorrecta.",
        });

        return false;
      }
      let userType;
      if (user.agencyName) {
        userType = "Agencia";
      } else {
        userType = "Usuario";
      }
      if (user.isAdmin) {
        userType = "Admin";
      }
      const MAHtoken = jsonwt.sign(
        {
          id: user.id,
          name: user.agencyName || user.name,
          userType,
        },
        // todo: change this
        "MAH2018!#"
      );
      if (user.isAdmin === false) {
        res.status(400).send({
          status: "error",
          message: "No tienes permisos para acceder aquí.",
        });
        return false;
      }

      res.status(200).send({
        status: "ok",
        message: MAHtoken,
      });
    })
    .catch((error) =>
      res.status(400).send({
        status: "error",
        message: error,
      })
    );
};
