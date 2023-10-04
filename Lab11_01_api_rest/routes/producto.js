'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');

var router = express.Router();

// RUTAS PARA PRODUCTOS
router.get('/productos',ProductoController.list);
router.get('/productos/:id', ProductoController.find);
router.post('/productos/save', ProductoController.save);
router.get('/reporte/productosPorCategoria', ProductoController.reporteProductosPorCategoria);

module.exports = router;