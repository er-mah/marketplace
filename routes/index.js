const jsonwt = require('jsonwebtoken');
const { split } = require('split-object');
const decode = require('jwt-decode');
const moment = require('moment');

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
      if (!user.validPassword(password, user.password)) {
        res.status(401).send({
          status: 'error',
          message: 'Usuario inexistente o contraseña incorrecta.',
        });

        return false;
      }
      let userType;
      if (user.agencyName) { userType = 'Agencia'; } else { userType = 'Usuario'; }
      if (user.isAdmin) { userType = 'Admin'; }
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
      if (user.agencyName) { userType = 'Agencia'; } else { userType = 'Usuario'; }
      if (user.isAdmin) { userType = 'Admin'; }
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
const createPublication = (req, res) => {
  req.body.dataPublication = JSON.parse(req.body.dataPublication);
  split(req.body.dataPublication).map((row) => {
    if (req.body.dataPublication[row.key] === 'SI') req.body.dataPublication[row.key] = true;
    if (req.body.dataPublication[row.key] === 'NO') req.body.dataPublication[row.key] = false;
  });

  const {
    brand,
    group,
    modelName,
    kms,
    price,
    year,
    Combustible,
    observation,
    carState,
    codia,
    name,
    email,
    phone,
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
  } = req.body.dataPublication;
  const imageGroup = req.files;
  const imageData = {};
  let userId = null;
  if (req.headers.authorization) {
    userId = decode(req.headers.authorization.slice(7)).id;
  }
  let fuel;
  switch (Combustible) {
    case 'NAF': fuel = 'Nafta';
      break;
    case 'DSL': fuel = 'Diesel';
      break;
    case 'GNC': fuel = 'GNC';
      break;
    default: fuel = 'No especificado';
  }

  for (let i = 0; i < imageGroup.length; i += 1) {
    const objectName = `image${i + 1}`;
    imageData[objectName] = imageGroup[i].filename;
  }
  if (!email && !userId) {
    res.status(400).send({
      status: 'error',
      message: 'Datos incompletos (faltan datos de contacto)',
    });
    return false;
  }
  return ImageGroup.create(imageData)
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
          user_id: userId,
          publicationDetail: {
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
          publication.setPublicationStates(ps, { through: { active: true } });
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
    })
    .catch(() => {
      res.status(400).send({
        status: 'error',
        error: 'No existe un usuario con ese id',
      });
    });
};
const registerAgency = (req, res) => {
  const data = req.body;
  User.create(data)
    .then((usr) => {
      res.status(200).send(ResponseObj('ok', 'Agencia registrada con éxito', usr));
    })
    .catch((err) => {
      res.status(400).send(ResponseObj('error', err));
    });
};
const registerUser = (req, res) => {
  const { data } = req.body;
  data.isAdmin = false;
  data.isAgency = false;
  data.password = User.generateHash(data.password);
  split(data).map((obj) => {
    if (obj.value === '' || obj.value === null || obj.value === undefined) {
      let field = '';
      switch (obj.key) {
        case 'name': field = 'Nombre y apellido';
          break;
        case 'phone': field = 'Teléfono';
          break;
        case 'address': field = 'Dirección';
          break;
        case 'password': field = 'Contraseña';
          break;
        default: field = obj.key;
      }
      res.status(400).send(ResponseObj('error', `Por favor complete el campo ${field}.`));
      return false;
    }
  });
  User.findOne({ where: { email: data.email } })
    .then((usr) => {
      if (usr) {
        res.status(400).send(ResponseObj('error', 'Ya existe un usuario registrado con ese email.'));
      } else {
        User.create(data)
          .then((user) => {
            res.status(200).send(ResponseObj('ok', 'Usuario registrado con éxito', user));
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
const getFiltersAndTotalResult = (req, res) => {
  req.body = req.body.search;
  let { text } = req.body;
  const {
    carState, fuel, year, state,
  } = req.body;
  const { Op } = sequelize;
  text = _.upperFirst(_.lowerCase(text));
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
      { fuel: { [Op.like]: text } },
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
        through: { where: { active: true } },
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
      }],

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
module.exports = {
  login, loginAdmin, createPublication, uploadAgencyImages, getFiltersAndTotalResult, getSoldPublications, registerAgency, registerUser,
};
