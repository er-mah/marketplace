/*
const fs = require('fs');
const sharp = require('sharp');
const fetch = require('node-fetch');
const oauth2 = require('simple-oauth2');
const NodeCache = require('node-cache');
const split = require('split-object');
require('dotenv').config();

// Initialize the OAuth2 Library
const tokenCache = new NodeCache();
const infoAutoCache = new NodeCache();
const getInfoAutoToken = async () => {
  let accessToken = await tokenCache.get('infoAutoToken');
  if (!accessToken) {
    const credentials = {
      client: {
        id: process.env.client_id,
        secret: process.env.client_secret,
      },
      auth: {
        tokenHost: 'https://info_auto.gestion.online',
      },
    };
    const tokenConfig = {
      username: process.env.user_name,
      password: process.env.password,
      expires_in: '7200',
    };
    const authentication = oauth2.create(credentials);
    return authentication.ownerPassword.getToken(tokenConfig)
      .then((rslt) => {
        accessToken = authentication.accessToken.create(rslt);
        tokenCache.set('infoAutoToken', accessToken.token, accessToken.token.expires_in);
        return accessToken.token.access_token;
      })
      .catch(err => console.log(err));
  }
  return accessToken.access_token;
  //---------
};
const customFetch = (url, method, token, contentType) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': contentType,
    },
    method,
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData => responseData)
    .catch(e => Promise.reject(e));
};

const infoAutoResolver = async (type, arg) => {
  const baseUrl = 'https://info_auto.gestion.online/api/custom/public';
  const privateBaseUrl = 'https://info_auto.gestion.online/api/custom/private';
  const baseOpt = {
    headers: {
      Accept: 'application/vnd.gestion.online+json',
      'X-Force-Content-Type': 'application/json',
    },
    method: 'GET',
  };
  switch (type) {
    case 'brand': {
      const brandResp = await infoAutoCache.get('marcas');
      if (!brandResp) {
        return fetch(`${baseUrl}/brands`, baseOpt)
          .then(response => response.json())
          .then((resData) => {
            infoAutoCache.set('marcas', resData);
            return resData.map(row => ({
              ta3_marca: row.name,
              ta3_nmarc: row.id,
            }));
          });
      }
      return brandResp.map(row => ({
        ta3_marca: row.name,
        ta3_nmarc: row.id,
      }));
    }
    case 'group': {
      const groupResp = await infoAutoCache.get(arg);
      if (!groupResp) {
        return fetch(`${baseUrl}/models?brandId=${arg}`, baseOpt)
          .then(response => response.json())
          .then((resData) => {
            infoAutoCache.set(arg, resData);
            return resData.map(row => ({
              gru_cgrup: row.id,
              gru_ngrup: row.name,
              gru_nmarc: arg,
              type: row.type,
            }));
          });
      }
      return groupResp.map(row => ({
        gru_cgrup: row.id,
        gru_ngrup: row.name,
        gru_nmarc: arg,
        type: row.type,
      }));
    }
    case 'model': {
      const modelResp = await infoAutoCache.get(arg);
      if (!modelResp) {
        return fetch(`${baseUrl}/vehicles?modelId=${arg}`, baseOpt)
          .then(response => response.json())
          .then((resData) => {
            infoAutoCache.set(arg, resData);
            return resData.map(row => ({
              ta3_codia: row.id,
              ta3_model: row.name,
              since: row.since,
              to: row.to,
              description: row.description,
            }));
          });
      }
      return modelResp.map(row => ({
        ta3_codia: row.id,
        ta3_model: row.name,
        since: row.since,
        to: row.to,
        description: row.description,
      }));
    }
    case 'prices': {
      baseOpt.headers.Authorization = `Bearer ${await getInfoAutoToken()}`;
      return fetch(`${privateBaseUrl}/vehicleCurrentPrices?vehicleId=${arg}`, baseOpt)
        .then(response => response.json())
        .then(async (resData) => {
          infoAutoCache.set(arg, resData); return split(resData).map(row => ({ anio: row.key, precio: row.value * 1000 }));
        });
    }
    case 'details': {
      const detailResp = await infoAutoCache.get(`detail-${arg}`);
      if (!detailResp) {
        return fetch(`${baseUrl}/vehicleProperties?vehicleId=${arg}`, baseOpt)
          .then(response => response.json())
          .then((resData) => {
            const mot = resData['Motor y Transmision'];
            const com = resData.Comodidades;
            const seg = resData.Seguridad;
            const tec = resData['Datos Tecnicos'];
            const iden = resData.Identidad;
            const response = {
              Traccion: mot.traccion.value,
              Potencia: mot.Potencia.value,
              Combustible: mot.Combustible.value,
              VelMax: mot['Velocidad maxima'].value,
              Alimentacion: mot.Alimentacion.value,
              Cilindrada: mot.cilindrada.value,
              Computadora: com.Computadora.value,
              FarosAntiniebla: com['Faros antiniebla'].value,
              Cuero: com.Cuero.value,
              CajaAutomatica: com['Caja automatica'].value,
              AsientosElectricos: com['Asientos electricos'].value,
              Bluetooth: com.Bluetooth.value,
              SensorEstacion: com['Sensor estacionamiento'].value,
              CalefaccionAsientos: com['Asientos calefaccionados'].value,
              LLantasDeAleacion: com['Llantas de aleacion'].value,
              AireAcondicionado: com['Aire acondicionado'.value],
              OpticasXenon: com['Opticas xenon'].value,
              LevasAlBolante: com['Levas al volante'].value,
              CamaraEstacionamiento: com['Camara estacionamiento'].value,
              TechoSolarPanoramico: com['Techo solar panoramico'.value],
              TechoCorredizo: com['Techo corredizo'].value,
              SensorDeLluvia: seg['Sensor de lluvia'].value,
              ControlDeEstabilidad: seg['Control de estabilidad'].value,
              AirbagCortina: seg['Airbag cortina'].value,
              ControlTraccion: seg['Control de traccion'].value,
              ReguladorParFrenado: seg['Regulador de par de frenado'].value,
              AsistenteFrenadoEmergencia: seg['Asistente frenado de emergencia'].value,
              Airbag: seg.Airbag.value,
              SensorCrepuscular: seg['Sensor Crepuscular'].value,
              ABS: seg.ABS.value,
              AribagLateral: seg['Airbag lateral'].value,
              Isofix: seg.isofix.value,
              AirbagRodilla: seg['Airbag de rodilla'].value,
              RepartidorDeFrenado: seg['Repartidoe electronico de frenado'].value,
              AirbagDeCabeza: seg['Airbag de cabeza'].value,
              MonitoreoPresionCubiertas: seg['Monitoreo presion de cubiertas'].value,
              AyudaArranqueEnPendiente: seg['Ayuda arranque en pendiente'].value,
              ControlDeDescenso: seg['Control de descenso'].value,
              BloqueoDiferencal: seg['Bloqueo diferencial'].value,
              ControlDinamicoDeConduccion: seg['Control dinamico de conduccion'].value,
              DireccionAsistida: tec['Direccion asistida'].value,
              TipoDeVehiculo: tec['Tipo de vehiculo'].value,
              Ancho: tec.ancho.value,
              Peso: tec.Peso.value,
              Largo: tec.largo.value,
              CantidadDePuertas: tec['Cantidad de puertas'].value,
              Altura: tec.altura.value,
              PermiteCarga: tec['Permite Carga'].value,
              Importado: iden.Importado.value,
            };
            infoAutoCache.set(`detail-${arg}`, response);
            return response;
          });
      }
      return detailResp;
    }
    default: return false;
  }
};
const removeOldFile = (file) => {
  fs.unlinkSync(`./images/${file.filename}`);
};
const optimizeImage = file => sharp(`./images/${file.filename}`)
  .jpeg({
    quality: 60,
    chromaSubsampling: '4:4:4',
  })
  .toFile(`./images/opt-${file.filename}`)
  .then(() => removeOldFile(file));

const prepareArrayToSharp = (imageGroup) => {
  const promiseArray = imageGroup.map(file => optimizeImage(file));
  return promiseArray;
};


module.exports = { customFetch, infoAutoResolver, prepareArrayToSharp };

* */
import { passwordsUtils } from "./passwordsUtils.js";
import { jwtUtils } from "./jwtUtils.js";
import {uriUtils} from "./uriUtils.js";


export { jwtUtils, passwordsUtils, uriUtils };
