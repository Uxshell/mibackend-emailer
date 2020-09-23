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
app.use(cors())
app.use(fileupload());
dbConnection();
app.use(express.static('public'));
app.use('/api/listas', require('./routes/listas'));
app.use('/api/blacks', require('./routes/blacks'));
app.use( '/api/login', require('./routes/auth') );

routesApi(app);
routesUserApi(app);
routesClientApi(app);
routesCampaignsApi(app);
//routesListApi(app);
//routesBlackApi(app);
app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
    exports.handler = async (event) => {
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "https://www.example.com",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify('Hello from Lambda!'),
        };
        return response;
    }; 
});


module.exports = app;