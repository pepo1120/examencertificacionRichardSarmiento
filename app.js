require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();
// si se pone alado de / es para cambiar la ruta