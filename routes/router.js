const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacanteController = require('../controllers/vacanteController');

module.exports = () => {
    /*
    router.get('/', (req, res) => {
        res.send('Sigue Funcionando');
    });*/
    router.get('/', homeController.mostrarTrabajos);

    // Crear vacante
    router.get('/vacantes/nueva', vacanteController.formularioNuevaVacante);

    return router;
}