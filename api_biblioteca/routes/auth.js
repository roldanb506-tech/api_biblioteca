// routes/auth.js
const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/authController');
const { validarRegistro, validarLogin } = require('../middleware/validaciones');

router.post('/registro', validarRegistro, registrar);
router.post('/login', validarLogin, login);

module.exports = router;