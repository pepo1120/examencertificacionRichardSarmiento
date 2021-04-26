const { Router } = require('express');
const { check } = require('express-validator');
const { validadUser } = require('../middlewares/validad-roles');
const { validadKWT } = require('../middlewares/validad-jwt');

const {
    productoGet,
    productoPost,
    productoPut,
    productoDelete,
    productoGetByID
} = require('../controllers/producto');

const router = Router();
//rutas  y envio de parametro de id y verificacion del token
router.get('/', productoGet);
router.post('/', validadKWT, productoPost);
router.put('/:id', validadKWT, productoPut);
router.delete('/:id', validadKWT, validadUser, productoDelete);
router.get('/:id', productoGetByID);


module.exports = router;