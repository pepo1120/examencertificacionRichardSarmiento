const { response, request } = require('express');
const Producto = require('./../models/producto');
const Usuariomas = require('../models/user');
const { validationResult } = require('express-validator');

const productoGet = async(req = request, res = response) => {
    const producto = await Producto.find();
    res.json({
        msg: 'API - GET -PRODUCTO',
        producto,
    });


}

const productoPost = async(req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors,
        });
    }
    const { correo } = req.body;
    const userrol = await Usuariomas.findOne({ correo });
    try {
        if (userrol.rol == "Admin_rol") {
            const { nombre, estado, usuario, precio, categoria, descripcion, disponible, correo } = req.body;
            const producto = new Producto({ nombre, estado, usuario, precio, categoria, descripcion, disponible, correo });
            producto;
            const existeProducto = await Producto.findOne({ nombre });
            if (existeProducto) {
                return res.status(400).json({
                    msg: 'Producto ya existe en la base de datos',
                });
            }
            producto.save();
            res.json({
                msg: 'API - POST-PRODUCTO',
                existeProducto,
                producto,

            })
        } else {
            return res.status(400).json({
                msg: 'Usuario no tiene acceso',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'usuario acceso denegado',
        })
    }
}


const productoPut = async(req = request, res = response) => {
    const id = req.params.id;
    let { nombre, ...resto } = req.body;
    const producto = await Producto.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'API - PUT -PRODUCTO',
        id,
        producto,
    });
}

const productoDelete = async(req = request, res = response) => {
    const id = req.params.id;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false });
    res.json({
        msg: 'API - DELETE-PRODUCTO',
        producto,
    });
}

const productoGetByID = async(req = request, res = response) => {
    const id = req.params.id;
    const producto = await Producto.findById(id);
    res.json({
        msg: 'API - GET -PRODUCTO',
        producto,
    });


}
module.exports = {
    productoGet,
    productoPost,
    productoPut,
    productoDelete,
    productoGetByID,
}