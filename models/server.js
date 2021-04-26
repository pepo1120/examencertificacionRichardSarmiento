const express = require('express');
const cors = require('cors');
const { dbConectar } = require('./../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/usuarios';
        this.authPath = '/auth';
        this.categoriaPath = '/categoria';
        this.productoPath = '/producto';
        //conexion a mongo
        this.dbConexion();
        //this.models();
        //middlewares
        this.middlewares();
        //rutas
        this.routes();
    }

    async dbConexion() {
        await dbConectar();
    }
    middlewares() {
        //servir carpeta publica
        //
        //status para enviar un codigo especifico
        //PATCH=DELETE
        //cors
        //this.app.use(cors());
        //permitir que el body obtenga desde json
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuarioPath, require('../routes/user'));
        this.app.use(this.categoriaPath, require('../routes/categoria'));
        this.app.use(this.productoPath, require('../routes/producto'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;