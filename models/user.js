const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true,
    },
    password: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    rol: {
        type: String,
        default: "User_rol",
        required: [true, "Es requerido un rol"],
        enum: ["Admin_rol", "User_rol"],
    },
});

module.exports = model('Usuario', usuarioSchema);