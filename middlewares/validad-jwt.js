const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const hola = '';

const validadKWT = (req = request, res = response, next) => {
    const token = req.header('x-token');
    console.log(token);
    if (!token) {
        return res.status(401).json({
            msg: 'no hay token en la petiicon',
        })
    }

    try {
        jwt.verify(token, 'Est3MiS3Cr374c14v31120KEY');
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido',
        })
    }
}


module.exports = {

    validadKWT,
}