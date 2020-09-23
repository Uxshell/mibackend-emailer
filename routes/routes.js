const express = require('express');
const DataService = require('../services/serviceData');
var Request = require("request");
const { config } = require('../config');
const AWS_LAMBDA_EMAIL = config.lambdaEmail;
const AWS_LAMBDA_MASSIVE_EMAIL = config.lambdaMassiveEmail;
const AWS_LAMBDA_STADISTICS = config.lambdaStadistics;
const AWS_LAMBDA_ALL_STATISTICS = config.lambdaAllStatistics;
const dataService = new DataService();
"use strict";

var fs = require("fs");
var mailComposer = require("nodemailer/lib/mail-composer");

const AWS = require("aws-sdk");
var ses = new AWS.SES({ apiVersion: "2010-12-01" });


function routesApi(app) {
    const router = express.Router();
    app.use('/aws', router);

    router.post('/sendEmails', async function(req, res, next) {
        var response = await executeLambda();
        console.log("wait end sendEmail..." + JSON.stringify(response))
        res.status(200).json({
            response: response
        });
    });

    router.post('/stadistics', async function(req, res, next) {
        //var clientArray = req.body.data.arr;
        var clientArray = req.body.clients;
        var html = req.body.html;
        var subject = req.body.subject;
        var response = await getStadistics(clientArray, html, subject);
        res.status(200).json({
            response: response,
            message: 'email ok'
        });
    });

    router.post('/getAllStatistics', async function(req, res, next) {
        var response = await getAllStatistics(req);
        res.status(200).json({
            response: response,
            message: 'statistics'
        });
    });


    router.post('/sendMassiveEmails', async function(req, res, next) {
        //var clientArray = req.body.data.arr;
        var clientArray = req.body.clients;
        var htmls = req.body.html;
        var html = req.body.html;
        var subject = req.body.subject;
        // para el envio de correos masivos con mas de 1 tag
       // var response = await executeLambdaOneByOne(clientArray, html, subject);
        
        var response = await executeMassiveLambda(clientArray, html, subject);
        res.status(200).json({
            statusCode: response,
            message: 'email ok'
        });
    });

    /*
    router.post('/uploadDataFile', async function(req, res, next) {
        //var clientArray = req.body.data.arr;
        var clientArray = req.body.clients;
        var html = req.body.html;
        var subject = req.body.subject;
        console.log(JSON.stringify(req.body));


        //file = req.files.FormFieldName; // here is the field name of the form
        console.log(req.file);

        var response = await uploadFile(req.file);
        res.status(200).json({
            statusCode: response,
            message: 'email ok'
        });
    });
//*/

    var executeLambda = async function() {
        //var jsonObject = await dataService.buildArrayEmail();
        var jsonObject = await dataService.buildArrayAndSendEmail();
        console.log("jsonObject: " + JSON.stringify(jsonObject))
        console.log("wait end...")
        return jsonObject;
        /*
            return new Promise((resolve, reject) => {
                Request.post({
                    "headers": {
                        "content-type": "application/json",
                        "X-Amz-Invocation-Type": "Event"
                    },
                    "url": AWS_LAMBDA_EMAIL,
                    "body": JSON.stringify(jsonObject)
                }, (error, response, body) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                    }
                    //console.log("response server: " + JSON.stringify(response))
                    console.log("body server: " + JSON.stringify(body))


                    var bodyP = JSON.parse(body);

                    var status = bodyP.statusCode;
                    var totalEmails = bodyP.totalEmails;
                    var tiempo = bodyP.tiempo;

                    var result = {
                            statusCode: status,
                            totalEmails: totalEmails,
                            tiempo: tiempo
                        }
                        //console.log("response server: " + response)
                        //console.log("response: " + res)
                        //console.log("response: " + JSON.stringify(result))
                    resolve(result);

                });
        
            });
            //*/
    }

    
var executeLambdaOneByOne = async function(cliente, htmlBody, subject){
        var error = {}
        var response = {}
        //htmlBody = processTag(htmlBody, cliente.name)
        htmlBody = htmlBody;
        subject= subject;
        //subject = processTag(subject, cliente.name)
        return new Promise(resolve => {
    
            // encrypting pdf email
    
            let sendRawEmailPromise;
            const mail = new mailComposer({
                //from: "Afore XXI Banorte <experienciadelcliente@xxibanorte.com>",
                from: "Afore XXI Banorte <servicio.afore@xxi-banorte.com>",
                to: cliente.email,
                headers: {
                    "X-SES-CONFIGURATION-SET": "EmailerSET",
                    "X-SES-MESSAGE-TAGS": "emailerMassiveMetrics=Custom"
                },
                subject: subject,
                html: htmlBody
            });
    
            mail.compile().build(async(err, message) => {
                if (err) {
                    error.code = "compiling_mail"
                    error.message = "Error during email compilation (mailComposer)"
                    response.status = 400
                    response.body = error
                    return resolve(response)
                }
                try {
                    sendRawEmailPromise = await ses.sendRawEmail({ RawMessage: { Data: message } }).promise();
                    response.status = 200
                    response.body = sendRawEmailPromise;
                    return resolve(response);
    
    
                } catch (err) {
                    console.log("error of sendRawEmail");
                    error.code = err.code || "invalid_email"
                    error.message = err.message || "Error sending email"
                    response.status = 400
                    response.body = error
                    console.log(err)
                    return resolve(response)
                }
            });
    
    
        }); // end promise
    }


    var executeMassiveLambda = async function(clientArray, html, subject) {
        var jsonObject = await dataService.buildTemplateAndEmail(clientArray, html, subject);

        console.log("executeMassiveLambda...:" + JSON.stringify(jsonObject));
        return new Promise((resolve, reject) => {
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": AWS_LAMBDA_MASSIVE_EMAIL,
                "body": JSON.stringify(jsonObject)
            }, (error, response, body) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                var res = response.statusCode

                resolve(res);

            });
        });
    }

    var getStadistics = async function(clientArray, html, subject) {
        //var jsonObject = await dataService.buildTemplateAndEmail(clientArray, html, subject);

        console.log("executeMassiveLambda...:" + JSON.stringify(jsonObject));
        return new Promise((resolve, reject) => {
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": AWS_LAMBDA_STADISTICS,
                "body": JSON.stringify({}),
                "isBase64Encoded": false
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                //var res = response.statusCode
                //console.log(res)
                //console.log("response: " + JSON.stringify(response));
                //console.log("body: " + JSON.stringify(body));

                //let responseB = JSON.parse(response)

                resolve(response);

            });
            //*/
        });
    }
//para 
    var getAllStatistics = async function(request) {


        return new Promise((resolve, reject) => {
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": AWS_LAMBDA_ALL_STATISTICS,
                "body": JSON.stringify(request.body),
                "isBase64Encoded": false
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                //console.log("response: " + JSON.stringify(response));
                resolve(response.body);

            });
        });
    }

}

module.exports = routesApi;