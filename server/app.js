/**
 * WEB SERVER
 */
const express = require('express');

/**
 * MIDDLEWARE
 */
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator'); // string validation
const expressStatusMonitor = require('express-status-monitor'); // realtime server metrics
const lusca = require('lusca'); // security
const multer = require('multer'); // multipart / form data
const session = require('express-session');

/**
 * LOGGING AND ERROR HANDLING
 */
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');

/**
 * UTILITIES
 */
const path = require('path');
const dotenv = require('dotenv');


/**
 * DATAs
 */
const upload = multer({ dest: path.join(__dirname, 'uploads') }); // file uploads
// const mongoose = require('mongoose'); // MongoDB database


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const apiController = require('./controllers/api');
const contactController = require('./controllers/contact');

/**
 * Create Express server.
 */
const app = express();
const server = require('http').createServer(app);

/**
 * Connect to MongoDB.
 */
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useNewUrlParser', true);
// mongoose.connect(process.env.MONGODB_URI);
// mongoose.connection.on('error', (err) => {
//   console.error(err);
//   console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
//   process.exit();
// });

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(expressStatusMonitor());
app.use(compression());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "wubbalubbadubdubthisisalongiugfy8wefgwr7932g^*FYIGFGJUHbk",
  cookie: { maxAge: 604800000 }, // one week in milliseconds
  // store: new MongoStore({
  //   url: process.env.MONGODB_URI,
  //   autoReconnect: true,
  // })
}));

app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
// use the pageRoute property to serve the dashboard html page
// app.get('/status', expressStatusMonitor.pageRoute);

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);
app.get('/api/upload', apiController.getFileUpload);
app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start websocket server (for realtime audio uploads)
 */
require('./integrations/websockets')(server);

/**
 * Start Express server.
 */
server.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
})

module.exports = app;
