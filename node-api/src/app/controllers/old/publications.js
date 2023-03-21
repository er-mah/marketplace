const { split } = require("split-object");
const decode = require("jwt-decode");
const { prepareArrayToSharp } = require("../../../helpers/index.js");
const {
  generateSinRegistro,
  generateForAdmin,
  generateMailAgenciaoParticular,
} = require("../../../mails/index.js");
const sgMail = require("@sendgrid/mail");
const moment = require("moment/moment");

const {
    User,
    Publication,
    ImageGroup,
    PublicationState
} = require('../../models/index.js').mah;


// TODO cHANGE THIS TO ENV VARIABLE
const miautoEmail = 'contacto@miautohoy.com';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const createPublication = (req, res) => {
  split(req.body).map((row) => {
    if (req.body[row.key] === "SI") req.body[row.key] = true;
    if (req.body[row.key] === "NO") req.body[row.key] = false;
    if (req.body[row.key] === ".") req.body[row.key] = false;
  });
  const {
    brand,
    group,
    modelName,
    year,
    Combustible,
    observation,
    carState,
    codia,
    name,
    email,
    phone,
    province_id,
    town_id,
  } = req.body;
  let { price, kms } = req.body;

  if (!price) {
    price = null;
  }
  if (!kms) {
    kms = null;
  }
  const imageGroup = req.files;
  if (imageGroup.length === 0) {
    res.status(400).send("Por favor elija aunque sea una imágen");
    return false;
  }
  const imageData = {};
  let userId = null;
  let isAdmin = false;
  let userMail = "";
  let agencyEmail = "";
  let ownerEmail = "";
  let userProvince = null;
  let userTown = null;
  if (req.headers.authorization) {
    userId = decode(req.headers.authorization.slice(7)).id;
    User.findById(userId).then((usr) => {
      if (usr.isAdmin) {
        isAdmin = true;
        userId = req.body.userId;
        User.findById(userId)
          .then((us) => {
            agencyEmail = us.dataValues.agencyEmail;
            ownerEmail = us.dataValues.ownerEmail;
            userMail = us.dataValues.email;
            userProvince = us.dataValues.province_id;
            userTown = us.dataValues.town_id;
          })
          .catch(() =>
            res
              .status(400)
              .send("Cree publicaciones para un usuario desde el superAdmin")
          );
        return false;
      }
      User.findById(userId).then((us) => {
        agencyEmail = us.dataValues.agencyEmail;
        ownerEmail = us.dataValues.ownerEmail;
        userMail = us.dataValues.email;
        userProvince = us.dataValues.province_id;
        userTown = us.dataValues.town_id;
      });
    });
  }
  let fuel;
  switch (Combustible) {
    case "NAF":
      fuel = "Nafta";
      break;
    case "DSL":
      fuel = "Diesel";
      break;
    case "GNC":
      fuel = "GNC";
      break;
    default:
      fuel = "No especificado";
  }
  Promise.all(prepareArrayToSharp(imageGroup))
    .then(() => {
      for (let i = 0; i < imageGroup.length; i += 1) {
        const objectName = `image${i + 1}`;
        imageData[objectName] = `opt-${imageGroup[i].filename}`;
      }
      if (!email && !userId) {
        res.status(400).send("Datos incompletos (faltan datos de contacto)");
        return false;
      }
      if (email) {
        Publication.findOne({ where: { email } })
          .then((pub) => {
            if (pub) {
              throw new Error(
                "Solo le permitimos una publicación a los usuarios no registrados."
              );
            }
          })
          .then(() => ImageGroup.create(imageData))
          .then((resp) =>
            Publication.create({
              brand,
              group,
              modelName,
              kms: kms || null,
              price: price || null,
              year,
              fuel,
              observation,
              carState,
              codia,
              imageGroup_id: resp.id,
              name,
              email,
              phone,
              words: `${brand} ${group} ${modelName} ${kms} ${price} ${year} ${name} ${email} ${observation}`,
              province_id,
              town_id,
              user_id: userId,
            })
          )
          .then((publication) =>
            PublicationState.findOne({
              where: { stateName: isAdmin ? "Publicada" : "Pendiente" },
            }).then((ps) => {
              publication.setPublicationStates(ps, {
                through: { active: true },
              });
              res.status(200).send({
                status: "ok",
                message:
                  "Felicitaciones, tu publicación fue creada exitosamente, permanecerá en estado pendiente hasta que sea aprobada por Mi Auto Hoy",
              });
              const msg = {
                to: publication.email,
                from: miautoEmail,
                subject: "Publicación creada!",
                html: generateSinRegistro(publication, "newPublication"),
              };
              sgMail.send(msg);
              const msgToAdmin = {
                to: miautoEmail,
                from: miautoEmail,
                subject: "Nueva Publicación anónima!",
                html: generateForAdmin(
                  "Hola!",
                  "Se ha creado una nueva publicación anónima",
                  null,
                  "Una nueva publicación anónima está en estado Pendiente en el administrador, ingresa a https://www.miautohoy.com/superAdminPublications?stateName=Pendiente para revisarla."
                ),
              };
              sgMail.send(msgToAdmin);
            })
          )
          .catch((e) => {
            res.status(400).send(e.message);
          });
      } else {
        return ImageGroup.create(imageData)
          .then((resp) =>
            Publication.create({
              brand,
              group,
              modelName,
              kms: kms || null,
              price: price || null,
              year,
              fuel,
              observation,
              carState,
              codia,
              imageGroup_id: resp.id,
              name,
              email,
              phone,
              province_id: userProvince,
              town_id: userTown,
              user_id: userId,
              words: `${brand} ${group} ${modelName} ${kms} ${price} ${year} ${name} ${email} ${observation} `,
            })
          )
          .then((publication) => {
            PublicationState.findOne({
              where: { stateName: isAdmin ? "Publicada" : "Pendiente" },
            }).then((ps) => {
              publication.setPublicationStates(ps, {
                through: { active: true },
              });
              res.status(200).send({
                status: "ok",
                message:
                  "Felicitaciones, tu publicación fue creada exitosamente, permanecerá en estado pendiente hasta que sea aprobada por Mi Auto Hoy",
              });
              const msg = {
                to: userMail,
                cc: [agencyEmail, ownerEmail],
                from: miautoEmail,
                subject: "Publicación creada!",
                html: generateMailAgenciaoParticular(
                  publication,
                  "newPublication"
                ),
              };
              sgMail.send(msg);
              const msgToAdmin = {
                to: miautoEmail,
                from: miautoEmail,
                subject: "Nueva Publicación!",
                html: generateForAdmin(
                  "Hola!",
                  "Se ha creado una nueva publicación",
                  null,
                  "Una nueva publicación está en estado Pendiente en el administrador, ingresa a https://www.miautohoy.com/superAdminPublications?stateName=Pendiente para revisarla."
                ),
              };
              if (!isAdmin) {
                sgMail.send(msgToAdmin);
              }
            });
          })
          .catch((e) => {
            res.status(400).send(e);
            console.log(e);
          })
          .catch(() => {
            res.status(400).send("No existe un usuario con ese id");
          });
      }
    })

    .catch((err) => {
      res.status(400).send(`Ocurrio un error al subir las imágenes. ${err}`);
      return false;
    });
};
export const editPublication = (req, res) => {
  split(req.body).map((row) => {
    if (req.body[row.key] === "SI") req.body[row.key] = true;
    if (req.body[row.key] === "NO") req.body[row.key] = false;
    if (req.body[row.key] === ".") req.body[row.key] = false;
  });
  let { price, kms } = req.body;

  if (!price) {
    price = null;
  }
  if (!kms) {
    kms = null;
  }
  const {
    publication_id,
    brand,
    group,
    modelName,
    year,
    Combustible,
    observation,
    carState,
    codia,
    name,
    email,
    phone,
    province_id,
    town_id,
  } = req.body;
  const imageGroup = req.files;
  const imageData = {};
  let userId = null;
  let isAdmin = false;
  let userMail = "";
  if (req.headers.authorization) {
    userId = decode(req.headers.authorization.slice(7)).id;
    User.findById(userId).then((usr) => {
      if (usr.isAdmin) {
        isAdmin = true;
        userId = req.body.userId;
        User.findById(userId).then((us) => {
          userMail = us.dataValues.email;
        });
      } else {
        User.findById(userId).then((us) => {
          userMail = us.dataValues.email;
        });
      }
    });
  }
  let fuel;
  switch (Combustible) {
    case "NAF":
      fuel = "Nafta";
      break;
    case "DSL":
      fuel = "Diesel";
      break;
    case "GNC":
      fuel = "GNC";
      break;
    default:
      fuel = "No especificado";
  }
  Publication.findById(publication_id).then((pub) => {
    if (imageGroup.length === 0) {
      pub
        .update({
          brand,
          group,
          modelName,
          kms: kms || null,
          price: price || null,
          year,
          fuel,
          observation,
          carState,
          codia,
          name,
          email,
          phone,
          province_id,
          town_id,
          words: `${brand} ${group} ${modelName} ${kms} ${price} ${year} ${name} ${email} ${observation} `,
          user_id: userId,
        })
        .then((editedPub) => {
          PublicationState.findOne({
            where: { stateName: isAdmin ? "Publicada" : "Pendiente" },
          }).then((ps) => {
            editedPub.setPublicationStates(ps, { through: { active: true } });
            res
              .status(200)
              .send(
                ResponseObj(
                  "ok",
                  "Publicación editada con éxito. Nuevamente en estado Pendiente para su revisión."
                )
              );
          });
        });
      return false;
    }
    Promise.all(prepareArrayToSharp(imageGroup)).then(() => {
      for (let i = 0; i < 9; i += 1) {
        const objectName = `image${i + 1}`;
        if (imageGroup[i]) {
          imageData[objectName] = `opt-${imageGroup[i].filename}`;
        } else {
          imageData[objectName] = null;
        }
      }
      ImageGroup.findById(pub.imageGroup_id).then((ig) => {
        ig.update(imageData).then((resp) => {
          pub
            .update({
              brand,
              group,
              modelName,
              kms: kms || null,
              price: price || null,
              year,
              fuel,
              observation,
              carState,
              codia,
              imageGroup_id: resp.id,
              name,
              email,
              phone,
              province_id,
              town_id,
              user_id: userId,
              words: `${brand} ${group} ${modelName} ${kms} ${price} ${year} ${name} ${email} ${observation} `,
            })
            .then((editedPub) => {
              PublicationState.findOne({
                where: { stateName: isAdmin ? "Publicada" : "Pendiente" },
              }).then((ps) => {
                editedPub.setPublicationStates(ps, {
                  through: { active: true },
                });
                res
                  .status(200)
                  .send(
                    "Publicación editada con éxito. Nuevamente en estado Pendiente para su revisión."
                  );
              });
            });
        });
      });
    });
  });
};

export const getSoldPublications = (req, res) => {
  const userId = decode(req.headers.authorization.slice(7)).id;

  Publication.findAll({
    attributes: [],
    where: { user_id: userId },
    include: [
      {
        model: PublicationState,
        where: {
          stateName: "Vendida",
        },
        through: { where: { active: true } },
      },
    ],
  }).then((results) => {
    const vendidos = {};
    results.map((result) => {
      const date = moment(
        result.dataValues.PublicationStates[0].HistoryState.dataValues.createdAt
      ).format("MM/YY");
      vendidos[date] = 0;
    });
    results.map((result) => {
      const date = moment(
        result.dataValues.PublicationStates[0].HistoryState.dataValues.createdAt
      ).format("MM/YY");
      vendidos[date] += 1;
    });
    res.status(200).send(ResponseObj("ok", undefined, vendidos));
  });
};

export const getImages = (req, res) => {
  const { publication_id } = req.params;
  Publication.findOne({ where: { id: publication_id } }).then((pub) => {
    ImageGroup.findById(pub.imageGroup_id).then((ig) => {
      const imageArray = [];
      split(ig.dataValues).map((row) => {
        if (row.value !== null && row.key !== "id") {
          imageArray.push(row.value);
        }
      });
      res.status(200).send(ResponseObj("ok", undefined, imageArray));
    });
  });
};
