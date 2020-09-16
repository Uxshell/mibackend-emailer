const express = require('express');
const app = express();
const { dbConnection } = require('./config/database');
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
//const routesListApi = require('./routes/routesLists');
const routesBlackApi= require('./routes/routesBlack');
var cors = require('cors')
var fileupload = require("express-fileupload");

//body parser
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});
app.use(fileupload());
dbConnection();
app.use('/api/listas', require('./routes/listas'));
app.use('/api/blacks', require('./routes/blacks'));
routesApi(app);
routesUserApi(app);
routesClientApi(app);
routesCampaignsApi(app);
//routesListApi(app);
//routesBlackApi(app);
app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});

module.exports = app;