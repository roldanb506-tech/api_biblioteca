
const express = require('express');
const router = express.Router();

const autoresController = require('../controllers/autoresController');
const {
    validarAutor,
    validarId
} = require('../middleware/validaciones');

// Obtener todos los autores
router.get('/', autoresController.obtenerAutores);

// Obtener autores por nacionalidad
router.get('/nacionalidad/:nacionalidad', autoresController.obtenerAutoresPorNacionalidad);

// Crear un autor
router.post('/', validarAutor, autoresController.crearAutor);

// Actualizar un autor
router.put('/:id', validarId, validarAutor, autoresController.actualizarAutor);

// Eliminar un autor
router.delete('/:id', validarId, autoresController.eliminarAutor);

module.exports = router;
