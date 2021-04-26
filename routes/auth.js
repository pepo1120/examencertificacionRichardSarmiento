const { Router } = require('express');
const { login } = require('../controllers/auth');
const { validadUser } = require('../middlewares/validad-roles');

const router = Router();
router.post('/login', login);
router.post('/login/rol', validadUser);

module.exports = router;