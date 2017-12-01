require('dotenv').config();

const restify = require('restify');
const moment = require('moment');
const jwtDecode = require('jwt-decode');

const server = restify.createServer();
const models = require('./models');
const restifyjwt = require('restify-jwt');
const jsonwt = require('jsonwebtoken');
const _ = require('lodash');

const {
  Users,
} = models;


server.listen(process.env.PORT || 4000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
server.pre(restify.pre.sanitizePath());
server.pre(restify.pre.sanitizePath());
server.pre(restify.plugins.pre.userAgentConnection());
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.bodyParser({
  mapParams: true,
  keepExtensions: true,
}));

server.get(/\/pdf\/?.*/, restify.plugins.serveStatic({
  directory: __dirname,
}));
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['Authorization', 'mimeType'],
  exposeHeaders: ['API-Token-Expiry'],
});

server.pre(cors.preflight);
server.use(cors.actual);

const loginAdmin = (req, res) => {
  const { username, password } = req.params;
  Users.findOne({ where: { username } })
    .then((user) => {
      if (_.isNull(user)) {
        console.log('usuario inexistente');
        res.send(400, {
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
          'inVuelto2017#',
          { expiresIn: '24h' },
        );

        res.send(200, {
          status: 'ok',
          message: token,
        });

        return false;
      }
      if (!user.validPassword(password, user.password)) {
        res.send(401, {
          status: 'error',
          message: 'Usuario inexistente o contraseña incorrecta.',
        });

        return false;
      }
      if (user.isAdmin === false) {
        res.send(400, {
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
        'inVuelto2017#',
        { expiresIn: '24h' },
      );

      res.send(200, {
        status: 'ok',
        message: token,
      });

      return false;
    })
    .catch(error =>
      res.send(400, {
        status: 'error',
        message: error,
      }));
};
server.post('/loginAdmin', loginAdmin);

