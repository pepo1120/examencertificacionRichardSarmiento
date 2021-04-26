const { response, request } = require('express');
const Categoria = require('./../models/categoria');
const { validationResult } = require('express-validator');


// obtencion de los datos mediante el metodo get para postman
const categoriaGet = async(req = request, res = response) => {
    //asignacion a la variable de los datos de la tabla
    const categorias = await Categoria.find();
    //envio de la respuesta
    res.json({
        msg: 'API - GET -CATEGORIA',
        categorias,
    });
}

//creacion de datos categoria
const categoriaPost = async(req = request, res = response) => {
    //verificacion de error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors,
        });
    }
    //constructor y guardado en la bdd
    const { nombre, estado, usuario } = req.body;
    const categoria = new Categoria({ nombre, estado, usuario });
    categoria.save();
    //envio de la respuseta
    res.json({
        msg: 'API - POST-CATEGORIA',
        categoria,
    })
}

//modificacion de datos en la tabla categoria
const categoriaPut = async(req = request, res = response) => {
    const id = req.params.id;
    let { nombre, ...resto } = req.body;
    //busqueda y cambio de dato en la tabla categoria
    const categoria = await Categoria.findByIdAndUpdate(id, resto);
    //envio de la respuesta
    res.json({
        msg: 'API - PUT -CATEGORIA',
        id,
        categoria,
    });
}

//eliminar o inactivar algun elemento de la tabla categoria
const categoriaDelete = async(req = request, res = response) => {
    const id = req.params.id;
    //eliminacion y busqueda del respectivo dato envioado por id
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
    //envio de respuesta
    res.json({
        msg: 'API - DELETE-CATEGORIA',
        categoria,
    });
}

//obtencion de un dato mediante su id
const categoriaXID = async(req = request, res = response) => {
    const id = req.params.id;
    const categorias = await Categoria.findById(id);
    res.json({
        msg: 'API - GET -CATEGORIA',
        categorias,
    });
}

//exportacion de los metodos
module.exports = {
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete,
    categoriaXID
}