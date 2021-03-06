
const { Router } = require('express');

const {
    getListas,
    borrarLista,
    crearLista,
    buscarLista
} = require('../controllers/controlerLista')


const router = Router();
router.post( '/getListas', getListas );
router.post( '/buscarLista', buscarLista );
router.delete('/borrarLista/:id', borrarLista);
router.post( '/',   crearLista );

module.exports= router;
