'use strict'

var express = require('express');
var CategoriaController = require('../controllers/categoria');

var router = express.Router();

// RUTAS PARA PRODUCTOS
router.get('/categorias',CategoriaController.list);
router.get('/categorias/:id', CategoriaController.find);
router.post('/categorias/save', CategoriaController.save);

module.exports = router;