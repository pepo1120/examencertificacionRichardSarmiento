const { Router } = require('express');
const { check } = require('express-validator');
const { validadKWT } = require('../middlewares/validad-jwt');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);

router.post(
    '/', [check('correo', 'El correo es requerido o no es valio').isEmail()],
    usuariosPost
);

router.put('/:id', usuariosPut);

router.delete('/:id', validadKWT, usuariosDelete);


module.exports = router;