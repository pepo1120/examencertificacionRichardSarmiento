const jwt = require('jsonwebtoken');
const generarToken = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, 'Est3MiS3Cr374c14v31120KEY', {
            expiresIn: '64h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar el token');
            } else {
                resolve(token);
            }
        })
    });

}

module.exports = {
    generarToken,
}