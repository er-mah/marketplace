require('src/newrelic');
require('dotenv').config();

const express = require('express');
const Graphql = require('graphql').graphql;
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const moment = require('moment');
const _ = require('lodash');
const methodOverride = require('method-override');
const morgan = require('morgan');
const { thumb } = require('node-thumbnail');

// TODO CHECK ESTO
// thumb({
//   source: 'imagesEjemplo', // could be a filename: dest/path/image.jpg
//   destination: 'thumbs',
//   concurrency: 4,
//   width: 290,
//   ignore: true
// }, (files, err, stdout, stderr) => {
//   console.log('All done!');
// });

//  SCHEDULER
const {
  Publication,
  PublicationState,
  HistoryState,
  User,
} = require('../src/models').mah;

const rule = new schedule.RecurrenceRule();
rule.hour = 3;
rule.minute = 1;
const j = schedule.scheduleJob(rule, () => {
  console.log('COMENZANDO CON LA REVISIÓN DE PUBLICACIONES....');
  HistoryState.findAll({
    where: { active: true },
    include: [PublicationState],
  }).then((res) => {
    let publicacionesVencidas = 0;

    res.map((row) => {
      const publicationDate = moment(row.dataValues.createdAt);
      const actualDate = moment();
      const diff = actualDate.diff(publicationDate, 'days');
      const { publication_id } = row.dataValues;
      if (diff > 60) {
        publicacionesVencidas += 1;
        return Publication.findById(publication_id)
          .then(pub => pub.getPublicationStates({ through: { where: { active: true } } })
            .then((oldPs) => {
              oldPs[0].HistoryState = {
                active: false,
              };
              return PublicationState.findOne({ where: { stateName: 'Vencida' } })
                .then(newPs => pub.setPublicationStates([oldPs[0], newPs], { through: { active: true } }))
                .then(() => pub);
            }));
      }
    });
    console.log('SE VENCIERON:', publicacionesVencidas, 'PUBLICACIONES.');
  });
});


/* HistoryState.findAll({
  where: { active: true },
  include: [PublicationState],
}).then((res) => {
  let publicacionesVencidas = 0;

  res.map((row) => {
    const publicationDate = moment(row.dataValues.createdAt);
    const actualDate = moment();
    const diff = actualDate.diff(publicationDate, 'days');
    const { publication_id } = row.dataValues;
    const mailArray = [];
    Publication.findOne({where: {id: row.dataValues.publication_id}})
    .then(res=>{
      const getUserEmail = (res)=>{
        const data = res.dataValues;
        let userMail = false;
        if ((_.isUndefined(data.email) || _.isNull(data.email)) && data.user_id){
          return User.findById(data.user_id, {attributes: ['email']})
            .then((us)=>{
              mailArray.push(getUserEmail(us.dataValues.mail))
            })
        }else{
          userMail = data.email
          return mailArray.push(userMail);
        }
      }
      getUserEmail(res)
      //generateMailAgenciaoParticular(res.dataValues, 'vencimientoProximo')
    }
  )})
})
const rule2 = new schedule.RecurrenceRule();
rule2.hour = 11;
rule2.minute = 42;
const j2 = schedule.scheduleJob(rule2, () => {
  HistoryState.findAll({
    where: { active: true },
    include: [PublicationState],
  }).then((res) => {
    let publicacionesVencidas = 0;

    res.map((row) => {
      const publicationDate = moment(row.dataValues.createdAt);
      const actualDate = moment();
      const diff = actualDate.diff(publicationDate, 'days');
      const { publication_id } = row.dataValues;
      Publication.findOne({where: {id: row.dataValues.publication_id}})
      .then(res=>{
        const getUserEmail = (res)=>{
          const data = res.dataValues;
          if (_.isUndefined(data.email) || _.isNull(data.email)){
            User.findById(data.user_id)
              .then((us)=>{
                return us.dataValues.email
              })
          }else{
            return data.email
          }
        }
        res.dataValues.email = getUserEmail(res);
        console.log(res.dataValues.email);
        //generateMailAgenciaoParticular(res.dataValues, 'vencimientoProximo')
      }
    )})
})
}) */

const { graphiqlExpress } = require('apollo-server-express');
/* const socketioJwt = require('socketio-jwt'); */
const cors = require('cors');
const schema = require('../src/schema');
const {
  login,
  loginAdmin,
  recoverPassword,
  changePassword,
  createPublication,
  editPublication,
  uploadAgencyImages,
  getImages,
  getSoldPublications,
  registerAgency,
  registerUser,
  checkFacebookLogin,
  loginOrRegisterFacebook,
  requestCredit,
  uploadSliders,
  getSliders,
  deleteSlider,
  getProvinces,
  getTowns,
  getToken,
} = require('../src/routes');

const {
  // 123 seguro
  addUserAndCarData,
  get123Provinces,
  get123Localities,
  get123Token,
  get123Quotes,
  assurance123Seguro,
  get123Leads,
  get123Brands,
  get123Years,
  get123Family,
  get123Models,
  get123Canales,
  //---
} = require('../src/integrations/123seguros');

const {
  getMeliAuthURL,
  addMeliUserCode,
  createTestUser,
  meliCategory,
  provinceMeli,
  stateMeli,
  cityMeli,
  neighborhoodMeli,
  userStatusMeli,
  validatePublicationMeli,
  publicationMeli,
  updatePublicationMeli,
  getQuestionsMeli,
  answerMeli,
  deleteQuestionMeli,
} = require('../src/integrations/meli');

const multer = require('multer');

const { execute, subscribe } = require('graphql');
const graphqlHTTP = require('express-graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    let ext;
    // Mimetype stores the file type, set extensions according to filetype
    switch (file.mimetype) {
      case 'image/jpeg':
        ext = '.jpg';
        break;
      case 'image/png':
        ext = '.png';
        break;
      case 'image/gif':
        ext = '.gif';
        break;
      default: ext = '';
    }
    cb(null, file.originalname.slice(0, 9) + Date.now() + ext);
  },
});
const upload = multer({
  storage,
});
const app = express();

// ************* PLAYGROUND ****************\
/* const {
  User,
  Publication,
  PublicationState,
  CommentThread,
  Message,
  HistoryState,
  sequelize,
} = require('./models').mah;

 */

// ***************************************** */

// SERVER CONFIGURATION ----------------------------------------------
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphql', graphqlHTTP({
  schema,
}));
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'wss://api.miautohoy.com/subscriptions',
  }),
);

const ws = createServer(app);

// Set up the WebSocket for handling GraphQL subscriptions
ws.listen(process.env.PORT || 4000, () => {
  console.log(`Running a GraphQL API server at http://localhost:${process.env.PORT ||
      4000}/graphiql`);

  SubscriptionServer.create(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: ws,
      path: '/subscriptions',
    },
  );
});

const httpGraphQLHandler = (req, res) => {
  const { query, variables, rootVals } = req.query;
  const authToken = req.user || {};
  return Graphql(schema, query, { authToken, rootVals }, variables)
    .then(result => res.send(result))
    .catch(err => console.log(err));
};
app.post('/', httpGraphQLHandler);
app.use('/images', express.static(`${__dirname}/images`));
app.use('/logo', express.static(`${__dirname}/mails/logo.png`));

app.use(jwt({ secret: 'MAH2018!#' }).unless({
  path: [
    '/logo',
    '/subscriptions',
    '/graphql',
    '/login',
    '/loginAdmin',
    '/get123Canales',
    // /^\/checkFacebookLogin/,
    // '/loginOrRegisterFacebook',
    '/recoverPassword',
    '/createPublication',
    '/registerAgency',
    '/registerUser',
    /^\/images/,
    '/requestCredit',
    '/getSliders',
    '/getProvinces',
    /^\/getTowns/,
    '/addUserAndCarData',
    '/get123Brands',
    /^\/get123Years/,
    /^\/get123Family/,
    /^\/get123Models/,
    '/get123Token',
    '/get123Quotes',
    '/assurance123Seguro',
    '/get123Provinces',
    /^\/get123Localities/,
    '/addMeliUserCode',
    '/validatePublicationMeli',
  ],
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

/* console.log(schema.getSubscriptionType().getFields().messageAdded) */

// ROUTES --------------------------------------------------------------
app.post('/login', login);
app.post('/loginAdmin', loginAdmin);
app.post('/recoverPassword', recoverPassword);
app.post('/changePassword', changePassword);
app.post(
  '/publication',
  upload.array('imageGroup', 8),
  createPublication,
);
app.patch(
  '/publication',
  upload.array('imageGroup', 8),
  editPublication,
);
app.get('/getSoldPublications', getSoldPublications);
app.get('/getImages/:publication_id', getImages);
// app.get('/checkFacebookLogin/:email', checkFacebookLogin);
// app.post('/loginOrRegisterFacebook/', loginOrRegisterFacebook);
app.post('/registerAgency', registerAgency);
app.post('/registerUser', registerUser);
app.post('/requestCredit', requestCredit);
app.get('/getSliders', getSliders);
app.get('/deleteSlider/:id', deleteSlider);
app.get('/getProvinces', getProvinces);
app.get('/getTowns/:province_id', getTowns);
app.post(
  '/uploadAgencyImages/:id',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 },
  ]),
  uploadAgencyImages,
);
app.post(
  '/uploadSliders/',
  upload.fields([
    { name: 'slider', maxCount: 1 }, { name: 'sliderResponsive', maxCount: 1 },
  ]),
  uploadSliders,
);
app.get('/getToken', getToken);
// 123Seguro
app.post('/addUserAndCarData', addUserAndCarData);
app.get('/get123Provinces', get123Provinces);
app.get('/get123Localities/:province_id', get123Localities);
app.post('/get123Quotes', get123Quotes);
app.post('/assurance123Seguro', assurance123Seguro);
app.get('/assurance123Seguro/:page', get123Leads);
app.get('/get123Token', get123Token);
app.get('/get123Brands', get123Brands);
app.get('/get123Canales', get123Canales);
app.get('/get123Years/:brand_id', get123Years);
app.get('/get123Family/:brand_id/:year', get123Family);
app.get('/get123Models/:brand_id/:year/:family_id', get123Models);
// ===================================================================
// MELI
app.get('/getMeliAuthURL', getMeliAuthURL);
app.get('/createTestUser', createTestUser);
app.get('/addMeliUserCode', addMeliUserCode);
app.get('/meliCategory/:category?/:attributes?', meliCategory);
app.get('/provinceMeli', provinceMeli);
app.get('/stateMeli/:province_id', stateMeli);
app.get('/cityMeli/:state_id', cityMeli);
app.get('/neighborhoodMeli/:city_id', neighborhoodMeli);
app.get('/userStatusMeli/', userStatusMeli);
app.post('/validatePublicationMeli', validatePublicationMeli);
app.post(
  '/publicationMeli',
  upload.array('imageGroup', 8),
  publicationMeli,
);
app.patch(
  '/publicationMeli',
  upload.array('imageGroup', 8),
  updatePublicationMeli,
);
app.get('/questionsMeli/:pub_id/:from?/:seller?/:status?', getQuestionsMeli);
app.delete('/questionsMeli/:question_id', deleteQuestionMeli);
// from:  "name": "From user id", idem con seller, es un user_id de ml
// Los status disponibles son:
//                      "ANSWERED",
//                     "BANNED",
//                     "CLOSED_UNANSWERED",
//                     "DELETED",
//                     "DISABLED",
//                     "UNANSWERED",
//                     "UNDER_REVIEW"

app.post('/answerMeli/', answerMeli);

// ===================================================================

app.use(methodOverride());
function logErrors(err, req, res, next) {
  next(err);
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Algo ha fallado! Intente nuevamente más tarde.' });
  } else {
    next(err);
  }
}
function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).send({ message: err.message });
}
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
