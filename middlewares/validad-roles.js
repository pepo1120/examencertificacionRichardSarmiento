const e = require('express');
const { response, request } = require('express');
const Usuario = require('../models/user');

//metodo de validacion
const validadUser = async(req = request, res = response) => {
    //verificacion mediante la busqueda del correo
    const { correo } = req.body;
    const usuario = await Usuario.findOne({ correo });
    //si el usuario no se encuentra en la tabla emite un error
    if (!usuario) {
        return res.status(401).json({
            msg: 'noexiste el usuairo',
        })
    }
    //control de errores
    try {
        //comparacion de administrador
        if (usuario.rol == "Admin_rol") {
            return res.status(200).json({
                    msg: "ADmin",
                    usuario
                })
                //en caso de no ser admin es cliente
        } else {
            res.status(200).json({
                msg: "Cliente",
                usuario
            })
        }
        //captura de errores
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido',
        })
    }
}

//exportacion del modulo
module.exports = {
    validadUser,
}