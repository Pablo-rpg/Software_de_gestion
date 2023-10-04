const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb+srv://pablochambi:pablochambi@cluster0.ugeco.mongodb.net/test");

client.connect().then(
    (response) => {
        console.log('La conexion a la bd es correcta - url:'+response.url);
    },
    (error) => {
        console.error('error:'+error);
    }
);

module.exports = client;