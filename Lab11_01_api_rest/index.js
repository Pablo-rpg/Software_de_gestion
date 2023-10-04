'use strict'

// REQUIRES
var mongoose = require('mongoose'); // USANDO LA DEPENDENCIA MONGOOSE
var app = require('./app'); // IMPORTAMOS EL ARCHIVO APP

// PUERTO DEL SERVIDOR
var port = process.env.PORT || 3999;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://pablochambi:pablochambi@cluster0.ugeco.mongodb.net/test', { useNewUrlParser: true })
    .then(
        (respuesta) => {
            console.log('LA CONEXION A LA BD ES CORRECTA...');

            app.listen(port, () => {
                console.log('EL SERVIDOR http://localhost:' + port + " esta funcionando");
            }
            );

        }
    )
    .catch(
        (error) => {
            console.log(error);
        }
    );