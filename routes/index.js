const jsonwt = require('jsonwebtoken');
const {
  User, Publication, ImageGroup, PublicationState,
} = require('../models').mah;
const _ = require('lodash');

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (_.isNull(user)) {
        console.log('usuario inexistente');
        res.status(400).send({
          status: 'error',
          message: 'Usuario inexistente o contraseña incorrecta.',
        });
        return false;
      }
      if (password === user.password) {
        const token = jsonwt.sign(
          {
            id: user.id,
            name: user.name,
          },
          'MAH2018!#',
          { expiresIn: '24h' },
        );

        res.status(200).send({
          status: 'ok',
          message: token,
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

      if (user.isAdmin === false) {
        res.status(400).send({
          status: 'error',
          message: 'No tienes permisos para acceder aquí.',
        });
        return false;
      }

      const token = jsonwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        'MAH2018!#',
        { expiresIn: '24h' },
      );

      res.status(200).send({
        status: 'ok',
        message: token,
      });

      return false;
    })
    .catch(error =>
      res.status(400).send({
        status: 'error',
        message: error,
      }));
};
const createPublication = (req, res) => {
  const {
    brand, group, modelName, kms, price, year, fuel, observation, carState, codia, name, email, phone, user_id,
  } = req.body;
  const imageGroup = req.files;
  const imageData = {};
  for (let i = 0; i < imageGroup.length; i += 1) {
    const objectName = `image${i + 1}`;
    imageData[objectName] = imageGroup[i].path.slice(7);
  }
  if (!email && !user_id) {
    res.status(400).send({
      status: 'error',
      message: 'Datos incompletos (faltan datos de contacto)',
    });
    return false;
  }
  return User.findById(user_id)
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
      return true;
    })
    .then(() => {
      ImageGroup.create(imageData)
        .then((resp) => {
          Publication.create({
            brand,
            group,
            modelName,
            kms,
            price,
            year,
            fuel,
            observation,
            carState,
            codia,
            imageGroup_id: resp.id,
            name,
            email,
            phone,
            user_id,
          })
            .then((publication) => {
              PublicationState.findOne({ where: { stateName: 'Pendiente' } })
                .then((ps) => {
                  publication.setPublicationStates(ps);
                  res.status(200).send({
                    status: 'ok',
                    message: 'Felicitaciones, tu publicación fue creada exitosamente, permanecerá en estado pendiente hasta que sea aprobada por Mi Auto Hoy',
                    data: publication,
                  });
                });
            });
        })
        .catch((e) => {
          res.status(400).send({
            status: 'error',
            e,
          });
          console.log(e);
        });
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        error: 'No existe un usuario con ese id',
      });
    });
};
module.exports = { login, createPublication };

