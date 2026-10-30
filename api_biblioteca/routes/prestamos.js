const express = require('express');
const router = express.Router();
const { devolverLibro } = require('../controllers/prestamosController');

router.put('/devolver/:id', devolverLibro);

module.exports = router;