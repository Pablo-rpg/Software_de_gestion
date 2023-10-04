'use strict'

var client = require("../database/db");
var db = client.db("pablochambi");

var controller = {
    list: function (req, res) {
        console.log("-------------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");

        db.collection("productos").aggregate([
            {
                $lookup: {
                    from: "categorias",
                    localField: "idCategoria",
                    foreignField: "idCategoria",
                    as: "categoria"
                }
            }
        ]).toArray().then(
            (dataProductos) => {
                return res.status(200).send({
                    status: "success",
                    productos: dataProductos
                });
            },
            (error) => {
                return res.status(500).send({
                    status: "error",
                    error: error
                })
            }
        );
    },
    find: function (req, res) {
        console.log("-------------------");
        console.log("ENTRANDO A LA FUNCION FIND");
        console.log("id:" + req.params.id);
        db.collection("productos").find({ idProducto: parseInt(req.params.id) }).toArray().then(
            (dataProducto) => {
                return res.status(200).send({
                    status: "success",
                    producto: dataProducto[0]
                });
            },
            (error) => {
                return res.status(500).send({
                    status: "error",
                    error: error
                })
            }
        );
    },
    save: function (req, res) {
        console.log("--------------");
        console.log("ENTRANDO A LA FUNCION SAVE");
        console.log(req.body);
        if (req.body.idProducto == 0) {// NUEVO
            db.collection("productos").countDocuments().then(
                countProductos => {
                    var prod = {}
                    prod.idProducto = countProductos + 1;
                    prod.descripcion = req.body.descripcion;
                    prod.precio = req.body.precio;
                    prod.unidades = req.body.unidades;
                    prod.idCategoria = parseInt(req.body.idCategoria);
                    db.collection("productos").insertOne(prod).then(
                        (result) => {
                            return res.status(200).send({
                                status: "success",
                                producto: result
                            });
                        },
                        (error) => {
                            return res.status(404).send({
                                message: "Error al crear el producto:" + error
                            });
                        }
                    );  
                }
            );
        } else {// EDITAR
            var prod = {}
            prod.idProducto = parseInt(req.body.idProducto);
            prod.descripcion = req.body.descripcion;
            prod.precio = req.body.precio;
            prod.unidades = req.body.unidades;
            prod.idCategoria = parseInt(req.body.idCategoria);
            console.log(prod);
            db.collection("productos").updateOne({ idProducto: { $eq:  parseInt(req.body.idProducto)  } },
                                                 { $set: prod }
                                                ).then(
                    (result) => {
                        return res.status(200).send({
                            status: "success",
                            producto: result
                        });
                    },
                    (error) => {
                        return res.status(404).send({
                            message: "Error al editar el producto:" + error
                        });
                    }

                );
        }
    },
    reporteProductosPorCategoria: function(req, res){
        db.collection("productos").aggregate([
            {
                $lookup: {
                    from: "categorias",
                    localField:"idCategoria",
                    foreignField:"idCategoria",
                    as: "categoria"
                }
            },
            {
                $group: {
                   _id:"$idCategoria",
                   count: { $sum: 1},
                   categoria: { $first: "$categoria.nomCategoria" }         
                }
            }
        ]).toArray().then(
            (dataProductos) => {
                return res.status(200).send({
                    status: "success",
                    productos: dataProductos
                });
            },
            (error) => {
                return res.status(500).send({
                    status: "error",
                    error: error
                });
            }
        );
    }
    
}

module.exports = controller;