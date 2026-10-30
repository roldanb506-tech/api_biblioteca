
const express = require('express');
const router = express.Router();

const librosController = require('../controllers/librosController');
const {
    validarLibro,
    validarId
} = require('../middleware/validaciones');

router.get('/', librosController.obtenerLibros);

router.get('/:id', validarId, librosController.obtenerLibroPorId);

router.post('/', validarLibro, librosController.crear);

router.put('/:id', validarId, validarLibro, librosController.actualizar);

module.exports = router;
