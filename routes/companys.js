
let Companys= require('../models/companyModel');
const CompanyService = require('../services/companyService');
const { Router } = require('express');

const {
    getCompanys,
    borrarCompany,
    crearCompany,
    
} = require('../controllers/controlerCompany')


const router = Router();
router.get( '/getCompanys', getCompanys );
router.delete('/borrarLista/:id', borrarCompany);
router.post( '/',   crearCompany );

module.exports= router;
