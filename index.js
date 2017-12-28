require('dotenv').config();

const express = require('express');
const Graphql = require('graphql').graphql;
const bcrypt = require('bcrypt-nodejs');
const models = require('./models');
const jwt = require('express-jwt');
const jsonwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const _ = require('lodash');
const socketioJwt = require('socketio-jwt');
const cors = require('cors');
const schema = require('./schema');

// SERVER CONFIGURATION ----------------------------------------------
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.listen(process.env.PORT || 4000);
console.log(`Running a GraphQL API server at http://localhost:${process.env.PORT || 4000}/graphql`);


const httpGraphQLHandler = (req, res) => {
  const { query, variables, rootVals } = req.query;
  const authToken = req.user || {};
  return Graphql(schema, query, { authToken, rootVals }, variables)
    .then(result => res.send(result))
    .catch(err => console.log(err));
};
app.post('/', httpGraphQLHandler);
app.use(express.static('images'));
app.use(jwt({ secret: 'marketGot2017' }).unless({
  path: [
    '/graphql',
    '/login',
    /^\/images/,
  ],
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// ===================================================================

// SOCKETS ------------------------------------------------------------
const socketServer = require('http').createServer(app);
const io = require('socket.io')(socketServer);

socketServer.listen(process.env.PORT || 4100);

io.use((socket, next) => {
  const handShake = socket.handshake;
  const { token } = handShake.query;
  if (jsonwt.verify(token, 'MAH2018!#')) {
    next();
  }
  next(new Error('No autorizado'));
});

io.of('/offerChat').on('connection', (socket) => {
  const id = socket.handshake.query.offerId;
  const sockets = {};
  if (id !== '') {
    sockets[id] = socket;
  }
  socket.on('sellerTyping', () => {
    socket.broadcast.emit('sellerTyping');
  });
  socket.on('sellerStopTyping', () => {
    socket.broadcast.emit('sellerStopTyping');
  });
  socket.on('buyerTyping', () => {
    socket.broadcast.emit('buyerTyping');
  });
  socket.on('buyerStopTyping', () => {
    socket.broadcast.emit('buyerStopTyping');
  });

/*   socket.on('newMessage', (data) => {
    createMessage(data.id_from, data.id_to, data.messageThread_id, data.content)
      .then((res) => {
        socket.emit('messageCreated', res);
        socket.broadcast.emit('messageCreated', res);
      });
  }); */
});

// ===================================================================

// ROUTES --------------------------------------------------------------
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
          'MAH2018!#',
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
        'MAH2018!#',
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
app.post('/loginAdmin', loginAdmin);
// ===================================================================

