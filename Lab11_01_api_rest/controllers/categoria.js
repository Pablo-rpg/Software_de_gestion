'use strict'

var client = require("../database/db");
var db = client.db("pablochambi");

var controller = {
    list: function (req, res) {
        console.log("-------------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");

        db.collection("categorias").find().toArray().then(
            (dataCategorias) => {
                return res.status(200).send({
                    status: "success",
                    categorias: dataCategorias
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
        db.collection("categorias").find({ idCategoria: parseInt(req.params.id) }).toArray().then(
            (dataCategorias) => {
                return res.status(200).send({
                    status: "success",
                    categoria: dataCategorias[0]
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
        if (req.body.idCategoria == 0) {// NUEVO
            db.collection("categorias").countDocuments().then(
                countCategorias => {
                    var categ = {}
                    categ.idCategoria = countCategorias + 1;
                    categ.nomCategoria = req.body.nomCategoria;
                    categ.estado = req.body.estado;
                    db.collection("categorias").insertOne(categ).then(
                        (result) => {
                            return res.status(200).send({
                                status: "success",
                                categ: result
                            });
                        },
                        (error) => {
                            return res.status(404).send({
                                message: "Error al crear la categoria:" + error
                            });
                        }
                    );
                }
            );
        } else {// EDITAR
            var categ = {}
            categ.idCategoria = parseInt(req.body.idCategoria);
            categ.nomCategoria = req.body.nomCategoria;
            categ.estado = req.body.estado;
            console.log(categ);
            db.collection("categorias").updateOne({ idCategoria: { $eq:  parseInt(req.body.idCategoria)  } },
                                                 { $set: categ }
                                                ).then(
                    (result) => {
                        return res.status(200).send({
                            status: "success",
                            categoria: result
                        });
                    },
                    (error) => {
                        return res.status(404).send({
                            message: "Error al editar la categoria:" + error
                        });
                    }

                );
        }
    }
}

module.exports = controller;