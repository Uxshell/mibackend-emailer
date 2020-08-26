const express = require('express');
const app = express();
//----------------------------------------------
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
//----------------------------------------------

const { config } = require('./config/index');
const routesApi = require('./routes/routes.js');
const routesUserApi = require('./routes/routesUsers.js');
const routesClientApi = require('./routes/routesClients');
const routesCampaignsApi = require('./routes/routesCampaign');
const routesListApi = require('./routes/routesLists');
const routesBlackApi= require('./routes/routesBlack');
var cors = require('cors')
var fileupload = require("express-fileupload");

//body parser
app.use(express.json());
app.use(cors())
app.use(fileupload());


routesApi(app);
routesUserApi(app);
routesClientApi(app);
routesCampaignsApi(app);
routesListApi(app);
routesBlackApi(app);
app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});

module.exports = app;