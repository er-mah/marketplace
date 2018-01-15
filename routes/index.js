const jsonwt = require('jsonwebtoken');
const { split } = require('split-object');

const {
  User,
  Publication,
  ImageGroup,
  PublicationState,
  PublicationDetail,
  sequelize,
} = require('../models').mah;
const _ = require('lodash');
// Helper
const ResponseObj = (status, message, data) => ({ status, message, data });
//-----------------

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
    name,
    email,
    phone,
    user_id,
    Alimentacion,
    Motor,
    Puertas,
    Clasificacion,
    Cabina,
    Carga,
    PesoTotal,
    VelocidadMax,
    Potencia,
    Direccion,
    AireAcondicionado,
    Traccion,
    Importado,
    Caja,
    FrenosAbs,
    Airbag,
    Climatizador,
    FarosAntiniebla,
    TechoCorredizo,
    SensorEstacionamiento,
    AirbagLateral,
    AirbagCabezaConductor,
    AirbagCortina,
    AirbagRodilla,
    FijacionISOFIX,
    ControlDeTraccion,
    ControlDeEstabilidad,
    ControlDeDescenso,
    SistemaArranqueEnPendiente,
    ControlDinamicoConduccion,
    BloqueoDiferencial,
    RepartidorElectronicoDeFrenado,
    AsistenteDeFrenadoEmergencia,
    ReguladorParFrenado,
    Largo,
    Ancho,
    Alto,
    TapizadoCuero,
    AsientosElectronicos,
    ComputadoraABordo,
    FarosDeXenon,
    LLantasDeAleacion,
    TechoPanoramico,
    SensorDeLluvia,
    SensorCrepuscular,
    IndicadorPresionNeumaticos,
    VolanteConLevas,
    Bluetooth,
    AsientosTermicos,
    RunFlat,
  } = req.body;
  const imageGroup = req.files;
  const imageData = {};
  for (let i = 0; i < imageGroup.length; i += 1) {
    const objectName = `image${i + 1}`;
    imageData[objectName] = imageGroup[i].filename;
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
          Publication.create(
            {
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
              publicationDetail: {
                hasDetails,
                Alimentacion,
                Motor,
                Puertas,
                Clasificacion,
                Cabina,
                Carga,
                PesoTotal,
                VelocidadMax,
                Potencia,
                Direccion,
                AireAcondicionado,
                Traccion,
                Importado,
                Caja,
                FrenosAbs,
                Airbag,
                Climatizador,
                FarosAntiniebla,
                TechoCorredizo,
                SensorEstacionamiento,
                AirbagLateral,
                AirbagCabezaConductor,
                AirbagCortina,
                AirbagRodilla,
                FijacionISOFIX,
                ControlDeTraccion,
                ControlDeEstabilidad,
                ControlDeDescenso,
                SistemaArranqueEnPendiente,
                ControlDinamicoConduccion,
                BloqueoDiferencial,
                RepartidorElectronicoDeFrenado,
                AsistenteDeFrenadoEmergencia,
                ReguladorParFrenado,
                Largo,
                Ancho,
                Alto,
                TapizadoCuero,
                AsientosElectronicos,
                ComputadoraABordo,
                FarosDeXenon,
                LLantasDeAleacion,
                TechoPanoramico,
                SensorDeLluvia,
                SensorCrepuscular,
                IndicadorPresionNeumaticos,
                VolanteConLevas,
                Bluetooth,
                AsientosTermicos,
                RunFlat,
              },
            },
            {
              include: [
                {
                  model: PublicationDetail,
                  as: 'publicationDetail',
                },
              ],
            },
          ).then((publication) => {
            PublicationState.findOne({
              where: { stateName: 'Pendiente' },
            }).then((ps) => {
              publication.setPublicationStates(ps);
              res.status(200).send({
                status: 'ok',
                message:
                  'Felicitaciones, tu publicación fue creada exitosamente, permanecerá en estado pendiente hasta que sea aprobada por Mi Auto Hoy',
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
    .catch(() => {
      res.status(400).send({
        status: 'error',
        error: 'No existe un usuario con ese id',
      });
    });
};
const uploadAgencyImages = (req, res) => {
  const { avatar, banner } = req.files;
  const { id } = req.params;
  const imageData = {};
  if (avatar) {
    imageData.profileImage = avatar[0].filename;
  }
  if (banner) {
    imageData.bannerImage = banner[0].filename;
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
          message: 'Cambios guardados con éxito',
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
const getFiltersAndTotalResult = (req, res) => {
  req.body = req.body.search;
  let { text } = req.body;
  const {
    carState, fuel, year, state,
  } = req.body;
  const { Op } = sequelize;
  text += '%';
  const LIMIT = 9;
  let hasNextPage = true;
  const options = {};
  options.where = {
    [Op.or]: [
      { brand: { [Op.like]: text } },
      { group: { [Op.like]: text } },
      { modelName: { [Op.like]: text } },
      { kms: { [Op.like]: text } },
      { price: { [Op.like]: text } },
      { year: { [Op.like]: text } },
      { fuel: { [Op.like]: text } },
      { codia: { [Op.like]: text } },
      { name: { [Op.like]: text } },
    ],
    [Op.and]: { carState },
  };
  options.include = [User, PublicationState];
  if (fuel) {
    options.where[Op.and] = Object.assign(options.where[Op.and], { fuel });
  }
  if (year) {
    options.where[Op.and] = Object.assign(options.where[Op.and], { year });
  }
  if (state) {
    options.include = [
      {
        model: PublicationState,
        where: {
          stateName: state,
        },
      },
      { model: User }];
  }

  Publication.findAll(options)
    .then((results) => {
      if (results === null) {
        results = {};
      }
      const newObj = {};
      newObj.fuel = {};
      newObj.year = {};
      newObj.state = {};
      results.map(({ dataValues }) => {
        split(dataValues).map((row) => {
          if (
            row.key === 'fuel' ||
                row.key === 'year' ||
                row.key === 'state'
          ) {
            newObj[row.key][row.value] = 0;
          }
          if (row.key === 'PublicationStates') {
            row.key = 'state';
            row.value = _.last(row.value).dataValues.stateName;
            newObj[row.key][row.value] = 0;
          }
          return newObj;
        });
      });
      if (results.length < LIMIT) {
        hasNextPage = false;
      } else {
        hasNextPage = true;
      }
      results.map(({ dataValues }) => {
        split(dataValues).map((row) => {
          if (row.key === 'PublicationStates') {
            row.key = 'state';
            row.value = _.last(row.value).dataValues.stateName;
            newObj[row.key][row.value] += 1;
          }
          switch (row.key) {
            case 'fuel':
              newObj[row.key][row.value] += 1;
              break;
            case 'year':
              newObj[row.key][row.value] += 1;
              break;
            default:
              return '';
          }
        });
      });
      res.status(200).send(ResponseObj('ok', null, { filters: newObj, totalResults: results.length, hasNextPage }));
    });
};
module.exports = {
  login, createPublication, uploadAgencyImages, getFiltersAndTotalResult,
};
