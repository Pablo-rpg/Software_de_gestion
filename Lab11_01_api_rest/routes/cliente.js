'use strict'

var express = require('express');
var ClienteController = require('../controllers/cliente');

var router = express.Router();

// RUTAS PARA CATEGORIAS
router.get('/clientes',ClienteController.list);
router.get('/clientes/:id', ClienteController.find);
router.post('/clientes/save', ClienteController.save);

module.exports = router;