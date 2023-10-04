'use strict'

// REQUIRES
var express = require('express');
var bodyParser = require('body-parser');

// CARGAR ARCHIVO DE RUTAS
var producto_routes = require('./routes/producto');
var cliente_routes = require('./routes/cliente');
var categoria_routes = require('./routes/categoria');
// var producto_routes = require('./routes/

// EJECUTAR LA DEPENDENCIA EXPRESS
var app = express();


// DECODIFICACION DE ENVIOS FORM
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// CONFIGURAR CABECERAS Y CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// REESCRIBIR LAS RUTAS
app.use("/api",producto_routes);
app.use("/api",cliente_routes);
app.use("/api",categoria_routes);
//app.use("/api",product

// EXPORTAR MODULO
module.exports = app;