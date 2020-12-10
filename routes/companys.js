
let Companys= require('../models/companyModel');
const CompanyService = require('../services/companyService');
const { Router } = require('express');

const {
    getCompanys,
    borrarCompany,
    crearCompany,
    getEmailsSends,
    getEmailsDeliverys,
    getEmailsRejects,
    getEmailsOpens
} = require('../controllers/controlerCompany')


const router = Router();
router.get( '/getCompanys', getCompanys );
router.delete('/borrarLista/:id', borrarCompany);
router.post( '/',   crearCompany );
router.post('/getEmailsSends',getEmailsSends);
router.post('/getEmailsDeliverys',getEmailsDeliverys);
router.post('/getEmailsRejects',getEmailsRejects);
router.post('/getEmailsOpens',getEmailsOpens);

module.exports= router;
