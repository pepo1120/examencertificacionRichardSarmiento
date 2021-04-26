const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user');
const { generarToken } = require('../helpers/generar-JWT');

const login = async(req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        //verificar que el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecta(Usuario)'
            });
        }

        //verificar que el usuario este activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecta(Estado)'
            });
        }

        //verificar que la contrasela sea correcta
        const validadPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validadPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecta(Contraseña)'
            });
        }
        //crear token
        const token = await generarToken(usuario.id);

        //respuesta
        res.json({
            msg: 'login Exitoso',
            token,
            correo,
            password,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error,problemas en el servidor hable con el administrador'
        });
    }


}

module.exports = {
    login
}