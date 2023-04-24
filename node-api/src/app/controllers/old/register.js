const {
  generateMailAgenciaoParticular,
  generateForAdmin,
} = require("../../../utils/templates/_old/index.js");

const { split } = require("split-object");
const slugify = require("slugify");
const { ResponseObj } = require("./responseObject.js");

const { User } = require("../../models/index.js").mah;

// TODO cHANGE THIS TO ENV VARIABLE
const miautoEmail = "contacto@miautohoy.com";

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const registerAgency = (req, res) => {
  const data = req.body;
  if (!data.password) {
    return res
      .status(400)
      .send(ResponseObj("error", "Ingresa una contraseña."));
  }
  if (!data.agencyName) {
    return res
      .status(400)
      .send(ResponseObj("error", "Ingresa un nombre para la agencia."));
  }
  if (!data.email) {
    return res
      .status(400)
      .send(ResponseObj("error", "Ingresa el email de la agencia."));
  }
  data.isAdmin = false;
  data.isAgency = true;
  data.password = User.generateHash(data.password);
  data.slug = slugify(data.agencyName);
  User.findOne({ where: { email: data.email } }).then((user) => {
    if (user) {
      res
        .status(400)
        .send(
          ResponseObj(
            "error",
            "Ya existe una agencia registrada con ese email."
          )
        );
    } else {
      User.create(data)
        .then((usr) => {
          res
            .status(200)
            .send(ResponseObj("ok", "Agencia registrada con éxito", usr));
          const msg = {
            to: data.email,
            from: miautoEmail,
            subject: "Bienvenido a Mi auto hoy!",
            html: generateMailAgenciaoParticular(data, "newAccount"),
          };
          sgMail.send(msg);
          const msgToAdmin = {
            to: miautoEmail,
            from: miautoEmail,
            subject: "Nueva agencia Registrada!",
            html: generateForAdmin(
              "Hola!",
              "Se ha registrado una nueva agencia",
              null,
              `Se ha registrado una nueva agencia con email: ${data.email} y nombre ${data.name} `
            ),
          };
          sgMail.send(msgToAdmin);
        })
        .catch((err) => {
          res.status(400).send(ResponseObj("error", err));
        });
    }
  });
};
export const registerUser = (req, res) => {
  const data = req.body;
  data.isAdmin = false;
  data.isAgency = false;
  data.password = User.generateHash(data.password);
  split(data).map((obj) => {
    if (obj.value === "" || obj.value === null || obj.value === undefined) {
      let field = "";
      switch (obj.key) {
        case "name":
          field = "Nombre y apellido";
          break;
        case "phone":
          field = "Teléfono";
          break;
        case "address":
          field = "Dirección";
          break;
        case "password":
          field = "Contraseña";
          break;
        default:
          field = obj.key;
      }
      res
        .status(400)
        .send(ResponseObj("error", `Por favor complete el campo ${field}.`));
      return false;
    }
  });
  User.findOne({ where: { email: data.email } }).then((usr) => {
    if (usr) {
      res
        .status(400)
        .send(
          ResponseObj("error", "Ya existe un usuario registrado con ese email.")
        );
    } else {
      User.create(data)
        .then((user) => {
          res
            .status(200)
            .send(ResponseObj("ok", "Usuario registrado con éxito", user));
          const msg = {
            to: data.email,
            from: miautoEmail,
            subject: "Bienvenido a Mi auto hoy!",
            html: generateMailAgenciaoParticular(data, "newAccount"),
          };
          sgMail.send(msg);
          const msgToAdmin = {
            to: miautoEmail,
            from: miautoEmail,
            subject: "Nuevo Usuario Registrado!",
            html: generateForAdmin(
              "Hola!",
              "Se ha registrado un nuevo usuario",
              null,
              `Se ha registrado un nuevo usuario con email: ${data.email} y nombre ${data.name} `
            ),
          };
          sgMail.send(msgToAdmin);
        })
        .catch((err) => {
          res.status(400).send(ResponseObj("error", err));
        });
    }
  });
};
