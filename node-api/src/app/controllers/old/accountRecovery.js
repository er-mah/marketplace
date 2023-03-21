import {ResponseObj} from "./responseObject.js";

const { generateMailAgenciaoParticular } = require("../../../mails/index.js");
const sgMail = require("@sendgrid/mail");
const decode = require("jwt-decode");
// TODO CHANGE THIS LIBRARY -> bcrypt or bcryptjs
const bcrypt = require("bcrypt");


const { User } = require("../../models/index.js").mah;

// TODO cHANGE THIS TO ENV VARIABLE
const miautoEmail = "contacto@miautohoy.com";

export const recoverPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ where: { email } }).then((us) => {
    if (!us) {
      res
        .status(400)
        .send(
          ResponseObj("error", "No existe un usuario registrado con ese email.")
        );
      return false;
    }
    const hash = User.generateHash(Math.random().toString());
    us.update({
      password_hash: hash,
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
      res.send(
        ResponseObj(
          "ok",
          "Se envió un link a tu correo para recuperar la contraseña"
        )
      );
      sgMail.send(msg).catch((err) => {
        console.log(err);
      });
    });
  });
};

export const changePassword = (req, res) => {
  const { id } = decode(req.headers.authorization.slice(7));
  User.findById(id).then((us) => {
    if (!us.isAdmin) {
      res
        .status(400)
        .send({
          status: "error",
          message: "Solo  administradores pueden realizar esta acción",
        });
    } else {
      const { userId, newPassword } = req.body;
      User.findById(userId).then((us) => {
        if (!us) {
          res
            .status(400)
            .send({ status: "error", message: "Usuario no encontrado" });
        } else {
          const newPass = bcrypt.hashSync(
            newPassword,
            bcrypt.genSaltSync(8),
            null
          );
          return us
            .update({
              password: newPass,
            })
            .then(() =>
              res.send({
                status: "ok",
                message: "Contraseña actualizada con éxito",
              })
            );
        }
      });
    }
  });
};
