const { Schema, model } = require('mongoose');

//creacion del modelo
const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: String,
        default: "goldus",
        required: [true, 'El usuario es obligatorio'],
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: String,
        default: "periferico",
        required: [true, 'la categoria es obligatorio'],
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true,
    },
});

ProductoSchema.methods.toJSON = function() {
    const { _v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Producto', ProductoSchema);