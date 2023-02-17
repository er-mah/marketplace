require('dotenv').config();
const jsonwt = require('jsonwebtoken');
const { split } = require('split-object');
const decode = require('jwt-decode');
const moment = require('moment');
const PythonShell = require('python-shell');
const bcrypt = require('bcrypt-nodejs');
const slugify = require('slugify');

const {
  User,
  Publication,
  ImageGroup,
  PublicationState,
  PublicationDetail,
  Sliders,
  Provinces,
  Town,
  sequelize,
} = require('../models').mah;
const _ = require('lodash');
const { customFetch, prepareArrayToSharp } = require('../helpers');

const { generateMailAgenciaoParticular, generateSinRegistro, generateForAdmin } = require('../mails');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const miautoEmail = 'contacto@miautohoy.com';
// Helper
const ResponseObj = (status, message, data) => ({ status, message, data });
//-----------------


// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (_.isNull(user)) {
        console.log('usuario inexistente');
        res.status(401).send({
          status: 'error',
          message: 'Usuario inexistente o contraseña incorrecta.',
        });
        return false;
      }
      try {
        if ((_.isNull(user.password))) {
          res.status(401).send({
            status: 'error',
            message: 'Usted ya se encuentra registrado a través de una red social. Ingrese presionando el botón correspondiente.',
          });
          return false;
        }
        if (!user.validPassword(password, user.password)) {
          res.status(401).send({
            status: 'error',
            message: 'Usuario inexistente o contraseña incorrecta.',
          });
          return false;
        }
      } catch (e) {
        if (e === 'Not a valid BCrypt hash.') {
          User.findOne({ where: { email } })
            .then((us) => {
              if (!us) {
                res.status(400).send(ResponseObj('error', 'No existe un usuario registrado con ese email.'));
                return false;
              }
              const hash = User.generateHash(Math.random().toString());
              us.update({
                password: hash,
              })
                .then(() => {
                  const data = {
                    name: us.name,
                    hash,
                  };
                  const msg = {
                    to: us.email,
                    from: miautoEmail,
                    subject: 'Recupero de contraseña',
                    html: generateMailAgenciaoParticular(data, 'recoverPassword'),
                  };
                  sgMail.send(msg)
                    .catch((err) => {
                      console.log(err);
                    });
                });
            });

          res.status(401).send({
            status: 'error',
            message: 'Tu contraseña ha expirado, te enviaremos un mail para que la actualices.',
          });
          return false;
        }
        return res.status(500).send({
          status: 'error',
          message: e,
        });
      }
      let userType;
      if (user.agencyName) {
        userType = 'Agencia';
      } else {
        userType = 'Usuario';
      }
      if (user.isAdmin) {
        userType = 'Admin';
      }
      const MAHtoken = jsonwt.sign(
        {
          id: user.id,
          name: user.agencyName || user.name,
          userType,
        },
        'MAH2018!#',
      );

      res.status(200).send({
        status: 'ok',
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
    .catch(error =>
      res.status(400).send({
        status: 'error',
        message: error,
      }));
};
const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      console.log(user.dataValues);
      if (_.isNull(user)) {
        console.log('usuario inexistente');
        res.status(400).send({
          status: 'error',
          message: 'Usuario inexistente o contraseña incorrecta.',
        });
        return false;
      }
      if (!user.validPassword(password, user.password)) {
        res.status(401).send({
          status: 'error',
          message: 'Usuario inexistente o contraseña incorrecta.',
        });

        return false;
      }
      let userType;
      if (user.agencyName) {
        userType = 'Agencia';
      } else {
        userType = 'Usuario';
      }
      if (user.isAdmin) {
        userType = 'Admin';
      }
      const MAHtoken = jsonwt.sign(
        {
          id: user.id,
          name: user.agencyName || user.name,
          userType,
        },
        'MAH2018!#',
      );
      if (user.isAdmin === false) {
        res.status(400).send({
          status: 'error',
          message: 'No tienes permisos para acceder aquí.',
        });
        return false;
      }

      res.status(200).send({
        status: 'ok',
        message: MAHtoken,
      });
    })
    .catch(error =>
      res.status(400).send({
        status: 'error',
        message: error,
      }));
};
const checkFacebookLogin = (req, res) => {
  const { email } = req.params;
  User.findOne({ where: { email } })
    .then((us) => {
      if (!us) {
        res.status(200).send({ message: 'Usuario no registrado' });
      } else {
        let userType;
        if (us.agencyName) {
          userType = 'Agencia';
        } else {
          userType = 'Usuario';
        }
        if (us.isAdmin) {
          userType = 'Admin';
        }
        const MAHtoken = jsonwt.sign(
          {
            id: us.id,
            name: us.agencyName || us.name,
            userType,
          },
          'MAH2018!#',
        );
        res.status(200).send({
          status: 'ok',
          message: MAHtoken,
        });
      }
    });
};
const loginOrRegisterFacebook = (req, res) => {
  const { data: { email, name } } = req.body;
  User.findOne({ where: { email } })
    .then((us) => {
      if (!us) {
        User.create({
          email,
          name,
          isAgency: false,
        }).then((usr) => {
          const msgToAdmin = {
            to: miautoEmail,
            from: miautoEmail,
            subject: 'Nuevo Usuario Registrado!',
            html: generateForAdmin('Hola!', 'Se ha registrado un nuevo usuario', null, `Se ha registrado un nuevo usuario con email: ${email} a través de Facebook.`),
          };
          sgMail.send(msgToAdmin);
          const userType = 'Usuario';
          const MAHtoken = jsonwt.sign(
            {
              id: usr.id,
              name: usr.agencyName || usr.name,
              userType,
            },
            'MAH2018!#',
          );
          res.status(200).send({
            status: 'ok',
            message: MAHtoken,
          });
        });
      } else {
        let userType;
        if (us.isAgency) {
          userType = 'Agencia';
        } else {
          userType = 'Usuario';
        }
        if (us.isAdmin) {
          userType = 'Admin';
        }
        const MAHtoken = jsonwt.sign(
          {
            id: us.id,
            name: us.agencyName || us.name,
            userType,
          },
          'MAH2018!#',
        );
        res.status(200).send({
          status: 'ok',
          message: MAHtoken,
        });
      }
    });
};

const createPublication = (req, res) => {
  split(req.body).map((row) => {
    if (req.body[row.key] === 'SI') req.body[row.key] = true;
    if (req.body[row.key] === 'NO') req.body[row.key] = false;
    if (req.body[row.key] === '.') req.body[row.key] = false;
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

  if (!price) { price = null; }
  if (!kms) { kms = null; }
  const imageGroup = req.files;
  if (imageGroup.length === 0) {
    res.status(400).send('Por favor elija aunque sea una imágen');
    return false;
  }
  const imageData = {};
  let userId = null;
  let isAdmin = false;
  let userMail = '';
  let agencyEmail = '';
  let ownerEmail = '';
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
          .catch(() => res.status(400).send('Cree publicaciones para un usuario desde el superAdmin'));
        return false;
      }
      User.findById(userId)
        .then((us) => {
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
    case 'NAF':
      fuel = 'Nafta';
      break;
    case 'DSL':
      fuel = 'Diesel';
      break;
    case 'GNC':
      fuel = 'GNC';
      break;
    default:
      fuel = 'No especificado';
  }
  Promise.all(prepareArrayToSharp(imageGroup))
    .then(() => {
      for (let i = 0; i < imageGroup.length; i += 1) {
        const objectName = `image${i + 1}`;
        imageData[objectName] = `opt-${imageGroup[i].filename}`;
      }
      if (!email && !userId) {
        res.status(400).send('Datos incompletos (faltan datos de contacto)');
        return false;
      }
      if (email) {
        Publication.findOne({ where: { email } })
          .then((pub) => {
            if (pub) {
              throw new Error('Solo le permitimos una publicación a los usuarios no registrados.');
            }
          })
          .then(() => ImageGroup.create(imageData))
          .then(resp => Publication.create({
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
          }))
          .then(publication =>
            PublicationState.findOne({
              where: { stateName: isAdmin ? 'Publicada' : 'Pendiente' },
            })
              .then((ps) => {
                publication.setPublicationStates(ps, { through: { active: true } });
                res
                  .status(200)
                  .send({ status: 'ok', message: 'Felicitaciones, tu publicación fue creada exitosamente, permanecerá en estado pendiente hasta que sea aprobada por Mi Auto Hoy' });
                const msg = {
                  to: publication.email,
                  from: miautoEmail,
                  subject: 'Publicación creada!',
                  html: generateSinRegistro(publication, 'newPublication'),
                };
                sgMail.send(msg);
                const msgToAdmin = {
                  to: miautoEmail,
                  from: miautoEmail,
                  subject: 'Nueva Publicación anónima!',
                  html: generateForAdmin('Hola!', 'Se ha creado una nueva publicación anónima', null, 'Una nueva publicación anónima está en estado Pendiente en el administrador, ingresa a https://www.miautohoy.com/superAdminPublications?stateName=Pendiente para revisarla.'),
                };
                sgMail.send(msgToAdmin);
              }))
          .catch((e) => {
            res.status(400).send(e.message);
          });
      } else {
        return ImageGroup.create(imageData)
          .then(resp => Publication.create({
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
          }))
          .then((publication) => {
            PublicationState.findOne({
              where: { stateName: isAdmin ? 'Publicada' : 'Pendiente' },
            }).then((ps) => {
              publication.setPublicationStates(ps, { through: { active: true } });
              res
                .status(200)
                .send({ status: 'ok', message: 'Felicitaciones, tu publicación fue creada exitosamente, permanecerá en estado pendiente hasta que sea aprobada por Mi Auto Hoy' });
              const msg = {
                to: userMail,
                cc: [agencyEmail, ownerEmail],
                from: miautoEmail,
                subject: 'Publicación creada!',
                html: generateMailAgenciaoParticular(publication, 'newPublication'),
              };
              sgMail.send(msg);
              const msgToAdmin = {
                to: miautoEmail,
                from: miautoEmail,
                subject: 'Nueva Publicación!',
                html: generateForAdmin('Hola!', 'Se ha creado una nueva publicación', null, 'Una nueva publicación está en estado Pendiente en el administrador, ingresa a https://www.miautohoy.com/superAdminPublications?stateName=Pendiente para revisarla.'),
              };
              if (!isAdmin) { sgMail.send(msgToAdmin); }
            });
          })
          .catch((e) => {
            res.status(400).send(e);
            console.log(e);
          })
          .catch(() => {
            res.status(400).send('No existe un usuario con ese id');
          });
      }
    })

    .catch((err) => {
      res.status(400).send(`Ocurrio un error al subir las imágenes. ${err}`);
      return false;
    });
};
const editPublication = (req, res) => {
  split(req.body).map((row) => {
    if (req.body[row.key] === 'SI') req.body[row.key] = true;
    if (req.body[row.key] === 'NO') req.body[row.key] = false;
    if (req.body[row.key] === '.') req.body[row.key] = false;
  });
  let { price, kms } = req.body;

  if (!price) { price = null; }
  if (!kms) { kms = null; }
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
  let userMail = '';
  if (req.headers.authorization) {
    userId = decode(req.headers.authorization.slice(7)).id;
    User.findById(userId).then((usr) => {
      if (usr.isAdmin) {
        isAdmin = true;
        userId = req.body.userId;
        User.findById(userId)
          .then((us) => { userMail = us.dataValues.email; });
      } else {
        User.findById(userId)
          .then((us) => { userMail = us.dataValues.email; });
      }
    });
  }
  let fuel;
  switch (Combustible) {
    case 'NAF':
      fuel = 'Nafta';
      break;
    case 'DSL':
      fuel = 'Diesel';
      break;
    case 'GNC':
      fuel = 'GNC';
      break;
    default:
      fuel = 'No especificado';
  }
  Publication.findById(publication_id)
    .then((pub) => {
      if (imageGroup.length === 0) {
        pub.update({
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
              where: { stateName: isAdmin ? 'Publicada' : 'Pendiente' },
            }).then((ps) => {
              editedPub.setPublicationStates(ps, { through: { active: true } });
              res
                .status(200)
                .send(ResponseObj('ok', 'Publicación editada con éxito. Nuevamente en estado Pendiente para su revisión.'));
            });
          });
        return false;
      }Promise.all(prepareArrayToSharp(imageGroup))
        .then(() => {
          for (let i = 0; i < 9; i += 1) {
            const objectName = `image${i + 1}`;
            if (imageGroup[i]) {
              imageData[objectName] = `opt-${imageGroup[i].filename}`;
            } else {
              imageData[objectName] = null;
            }
          }
          ImageGroup.findById(pub.imageGroup_id)
            .then((ig) => {
              ig.update(imageData)
                .then((resp) => {
                  pub.update({
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
                        where: { stateName: isAdmin ? 'Publicada' : 'Pendiente' },
                      }).then((ps) => {
                        editedPub.setPublicationStates(ps, { through: { active: true } });
                        res
                          .status(200)
                          .send('Publicación editada con éxito. Nuevamente en estado Pendiente para su revisión.');
                      });
                    });
                });
            });
        });
    });
};
const registerAgency = (req, res) => {
  const data = req.body;
  if (!data.password) {
    return res.status(400).send(ResponseObj('error', 'Ingresa una contraseña.'));
  }
  if (!data.agencyName) {
    return res.status(400).send(ResponseObj('error', 'Ingresa un nombre para la agencia.'));
  }
  if (!data.email) {
    return res.status(400).send(ResponseObj('error', 'Ingresa el email de la agencia.'));
  }
  data.isAdmin = false;
  data.isAgency = true;
  data.password = User.generateHash(data.password);
  data.slug = slugify(data.agencyName);
  User.findOne({ where: { email: data.email } }).then((user) => {
    if (user) {
      res
        .status(400)
        .send(ResponseObj(
          'error',
          'Ya existe una agencia registrada con ese email.',
        ));
    } else {
      User.create(data)
        .then((usr) => {
          res
            .status(200)
            .send(ResponseObj('ok', 'Agencia registrada con éxito', usr));
          const msg = {
            to: data.email,
            from: miautoEmail,
            subject: 'Bienvenido a Mi auto hoy!',
            html: generateMailAgenciaoParticular(data, 'newAccount'),
          };
          sgMail.send(msg);
          const msgToAdmin = {
            to: miautoEmail,
            from: miautoEmail,
            subject: 'Nueva agencia Registrada!',
            html: generateForAdmin('Hola!', 'Se ha registrado una nueva agencia', null, `Se ha registrado una nueva agencia con email: ${data.email} y nombre ${data.name} `),
          };
          sgMail.send(msgToAdmin);
        })
        .catch((err) => {
          res.status(400).send(ResponseObj('error', err));
        });
    }
  });
};
const registerUser = (req, res) => {
  const data = req.body;
  data.isAdmin = false;
  data.isAgency = false;
  data.password = User.generateHash(data.password);
  split(data).map((obj) => {
    if (obj.value === '' || obj.value === null || obj.value === undefined) {
      let field = '';
      switch (obj.key) {
        case 'name':
          field = 'Nombre y apellido';
          break;
        case 'phone':
          field = 'Teléfono';
          break;
        case 'address':
          field = 'Dirección';
          break;
        case 'password':
          field = 'Contraseña';
          break;
        default:
          field = obj.key;
      }
      res
        .status(400)
        .send(ResponseObj('error', `Por favor complete el campo ${field}.`));
      return false;
    }
  });
  User.findOne({ where: { email: data.email } }).then((usr) => {
    if (usr) {
      res
        .status(400)
        .send(ResponseObj('error', 'Ya existe un usuario registrado con ese email.'));
    } else {
      User.create(data)
        .then((user) => {
          res
            .status(200)
            .send(ResponseObj('ok', 'Usuario registrado con éxito', user));
          const msg = {
            to: data.email,
            from: miautoEmail,
            subject: 'Bienvenido a Mi auto hoy!',
            html: generateMailAgenciaoParticular(data, 'newAccount'),
          };
          sgMail.send(msg);
          const msgToAdmin = {
            to: miautoEmail,
            from: miautoEmail,
            subject: 'Nuevo Usuario Registrado!',
            html: generateForAdmin('Hola!', 'Se ha registrado un nuevo usuario', null, `Se ha registrado un nuevo usuario con email: ${data.email} y nombre ${data.name} `),
          };
          sgMail.send(msgToAdmin);
        })
        .catch((err) => {
          res.status(400).send(ResponseObj('error', err));
        });
    }
  });
};
const uploadAgencyImages = (req, res) => {
  const { profileImage, bannerImage } = req.files;
  const { id } = req.params;
  const imageData = {};
  if (profileImage) {
    imageData.profileImage = profileImage[0].filename;
  }
  if (bannerImage) {
    imageData.bannerImage = bannerImage[0].filename;
  }
  User.findById(id).then((user) => {
    if (!user) {
      res
        .status(400)
        .send(ResponseObj('error', 'No existe un usuario con ese id.'));
    }
    user
      .update(imageData)
      .then(() => {
        res.status(200).send({
          status: 'ok',
          message: 'Cambios guardados con éxito.',
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send({
          status: 'error',
          e,
        });
      });
  });
};
const getSoldPublications = (req, res) => {
  const userId = decode(req.headers.authorization.slice(7)).id;

  Publication.findAll({
    attributes: [],
    where: { user_id: userId },
    include: [
      {
        model: PublicationState,
        where: {
          stateName: 'Vendida',
        },
        through: { where: { active: true } },
      },
    ],
  }).then((results) => {
    const vendidos = {};
    results.map((result) => {
      const date = moment(result.dataValues.PublicationStates[0].HistoryState.dataValues.createdAt).format('MM/YY');
      vendidos[date] = 0;
    });
    results.map((result) => {
      const date = moment(result.dataValues.PublicationStates[0].HistoryState.dataValues.createdAt).format('MM/YY');
      vendidos[date] += 1;
    });
    res.status(200).send(ResponseObj('ok', undefined, vendidos));
  });
};
const getImages = (req, res) => {
  const { publication_id } = req.params;
  Publication.findOne({ where: { id: publication_id } })
    .then((pub) => {
      ImageGroup.findById(pub.imageGroup_id)
        .then((ig) => {
          const imageArray = [];
          split(ig.dataValues).map((row) => {
            if (row.value !== null && row.key !== 'id') {
              imageArray.push(row.value);
            }
          });
          res.status(200).send(ResponseObj('ok', undefined, imageArray));
        });
    });
};
const recoverPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ where: { email } })
    .then((us) => {
      if (!us) {
        res.status(400).send(ResponseObj('error', 'No existe un usuario registrado con ese email.'));
        return false;
      }
      const hash = User.generateHash(Math.random().toString());
      us.update({
        password_hash: hash,
      })
        .then(() => {
          const data = {
            name: us.name,
            hash,
          };
          const msg = {
            to: us.email,
            from: miautoEmail,
            subject: 'Recupero de contraseña',
            html: generateMailAgenciaoParticular(data, 'recoverPassword'),
          };
          res.send(ResponseObj('ok', 'Se envió un link a tu correo para recuperar la contraseña'));
          sgMail.send(msg)
            .catch((err) => {
              console.log(err);
            });
        });
    });
};
const changePassword = (req, res) => {
  const { id } = decode(req.headers.authorization.slice(7));
  User.findById(id)
    .then((us) => {
      if (!us.isAdmin) {
        res.status(400).send({ status: 'error', message: 'Solo  administradores pueden realizar esta acción' });
      } else {
        const { userId, newPassword } = req.body;
        User.findById(userId)
          .then((us) => {
            if (!us) {
              res.status(400).send({ status: 'error', message: 'Usuario no encontrado' });
            } else {
              const newPass = bcrypt.hashSync(
                newPassword,
                bcrypt.genSaltSync(8),
                null,
              );
              return us
                .update({
                  password: newPass,
                })
                .then(() => res.send({ status: 'ok', message: 'Contraseña actualizada con éxito' }));
            }
          });
      }
    });
};
const requestCredit = (req, res) => {
  const datos = req.body;
  let html = '';
  datos.DNI = datos.dni;
  delete datos.dni;
  datos.Nombre = datos.name;
  delete datos.name;
  datos.Domicilio = datos.address;
  delete datos.address;
  datos.Ingresos = datos.ganancy;
  delete datos.ganancy;
  datos.MontoAFinanciar = datos.financyAmount;
  delete datos.financyAmount;
  datos.DestinoDelCredito = datos.creditReason;
  delete datos.creditReason;
  datos.Telefono = datos.phone;
  delete datos.phone;
  datos.Mensaje = datos.message;
  delete datos.message;
  if (datos.personalShopper) {
    const carData = {};
    carData.Año = datos.year;
    delete datos.year;
    carData.Precio = datos.price;
    delete datos.price;
    carData.Marca = datos.brand;
    delete datos.brand;
    carData.Versión = datos.group;
    delete datos.group;
    carData.Observaciones = datos.observation;
    delete datos.observation;
    datos.Trabajo = datos.job;
    delete datos.job;
    delete datos.personalShopper;
    html = generateForAdmin(datos, carData, 'personalShopper');
  } else {
    html = generateForAdmin(datos, null, 'solicitudCredito');
  }

  const msg = {
    to: 'contacto@miautohoy.com',
    from: datos.email,
    subject: 'Solicitud de Crédito',
    html,
  };
  // return false;
  sgMail.send(msg)
    .catch((err) => {
      console.log(err);
    });
  res.status(200).send({ status: 'ok' });
};
const uploadSliders = (req, res) => {
  let { slider, sliderResponsive } = req.files;
  slider = slider[0];
  sliderResponsive = sliderResponsive[0];
  const { sliderNumber } = req.body;
  const sliderName = `slider${sliderNumber}`;
  optimizeImage(slider)
    .then(() => Sliders.upsert({
      id: sliderNumber,
      name: sliderName,
      image: `opt-${slider.filename}`,
    }))
    .then(() =>
      optimizeImage(sliderResponsive))
    .then(() => {
      const id = parseInt(sliderNumber, 10) + 1;
      return Sliders.upsert({
        id,
        name: sliderName,
        image: `opt-${sliderResponsive.filename}`,
      });
    })
    .then((result) => {
      res.status(200).send({ status: 'ok', message: 'Sliders actualizados con éxito', data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ status: 'error', message: 'No se han podido actualizar los sliders', data: err });
    });
};
const getSliders = (req, res) => {
  Sliders.findAll()
    .then((result) => {
      res.status(200).send({ status: 'ok', data: result });
    })
    .catch((err) => {
      res.status(400).send({ status: 'error', message: 'Hubo un problema, intente mas tarde.', data: err });
    });
};
const deleteSlider = (req, res) => {
  const sliderNumber = req.params.id;
  Sliders.findById(sliderNumber)
    .then(sld => sld.destroy()
      .then(() => res.status(200).send({ status: 'ok' }))
      .catch(err => res.status(400).send({ status: 'error', message: err.message })))
    .catch(err => res.status(400).send({ status: 'error', message: err.message }));
};
const getToken = (req, res) => {
  PythonShell.run('service-account.py', { scriptPath: __dirname, pythonPath: '/usr/bin/python' }, (err, results) => {
    if (err) throw err;
    res.status(200).send({ status: 'ok', message: results });
  });
};

const getProvinces = (req, res) => Provinces.findAll()
  .then((provs) => { console.log(provs); res.send({ status: 'ok', data: provs }); })
  .catch(e => res.status(400).send({ status: 'error', message: e.message }));
const getTowns = (req, res) => {
  const province_id = req.params;
  return Town.findAll({ where: province_id })
    .then(towns => res.send({ status: 'ok', data: towns }))
    .catch(e => res.status(400).send({ status: 'error', message: e.message }));
};
module.exports = {
  login,
  loginAdmin,
  recoverPassword,
  changePassword,
  createPublication,
  uploadAgencyImages,
  getSoldPublications,
  registerAgency,
  registerUser,
  getImages,
  editPublication,
  checkFacebookLogin,
  loginOrRegisterFacebook,
  requestCredit,
  uploadSliders,
  getSliders,
  deleteSlider,
  getToken,
  getProvinces,
  getTowns,
};
