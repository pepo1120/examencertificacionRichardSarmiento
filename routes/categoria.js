const { Router } = require('express');
const { validadKWT } = require('../middlewares/validad-jwt');

const {
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete,
    categoriaXID,
} = require('../controllers/categoria');

const router = Router();
//rutas de los metodos get post put y delete junto a la validacion por token
router.get('/', validadKWT, categoriaGet, );
router.post('/', validadKWT, categoriaPost);
router.put('/', validadKWT, categoriaPut);
router.delete('/', validadKWT, categoriaDelete);
router.get('/:id', categoriaXID);


module.exports = router;