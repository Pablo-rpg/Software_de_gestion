'use strict'

var client = require("../database/db");
var db = client.db("pablochambi");

var controller = {
    list: function (req, res) {
        console.log("-------------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");

        db.collection("clientes").find().toArray().then(
            (dataClientes) => {
                return res.status(200).send({
                    status: "success",
                    clientes: dataClientes
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
        db.collection("clientes").find({ idCliente: parseInt(req.params.id) }).toArray().then(
            (dataCliente) => {
                return res.status(200).send({
                    status: "success",
                    cliente: dataCliente[0]
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
        if (req.body.idCliente == 0) {// NUEVO
            db.collection("clientes").countDocuments().then(
                countClientes => {
                    var cat = {}
                    cat.idCliente = countClientes + 1;
                    cat.nomCliente = req.body.nomCliente;
                    cat.email = req.body.email;
                    cat.direccion = req.body.direccion;
                    cat.telefono = req.body.telefono;
                    cat.estado = req.body.estado;
                    db.collection("clientes").insertOne(cat).then(
                        (result) => {
                            return res.status(200).send({
                                status: "success",
                                cliente: result
                            });
                        },
                        (error) => {
                            return res.status(404).send({
                                message: "Error al crear la cliente:" + error
                            });
                        }
                    );
                }
            );
        } else {// EDITAR
            var cat = {}
            cat.idCliente = parseInt(req.body.idCliente);
            cat.nomCliente = req.body.nomCliente;
            cat.email = req.body.email;
            cat.direccion = req.body.direccion;
            cat.telefono = req.body.telefono;
            cat.estado = req.body.estado;
            console.log(cat);
            db.collection("clientes").updateOne({ idCliente: { $eq:  parseInt(req.body.idCliente)  } },
                                                  { $set: cat }
                                                ).then(
                    (result) => {
                        return res.status(200).send({
                            status: "success",
                            cliente: result
                        });
                    },
                    (error) => {
                        return res.status(404).send({
                            message: "Error al editar la cliente:" + error
                        });
                    }

                );
        }
    }
}

module.exports = controller;