// middleware/validaciones.js
const { body, param, validationResult } = require('express-validator');

// Revisa si hubo errores y responde 400
const verificarErrores = (req, res, next) => {
const errores = validationResult(req);
if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
}
next();
};

const validarLibro = [
body('titulo_libro').trim().notEmpty().withMessage('El título es obligatorio'),
body('autor_id').isInt({ min: 1 }).withMessage('El autor debe ser un número válido'),
body('ano_publicacion')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('El año no es válido'),
verificarErrores
];

const validarAutor = [
body('nombre_autor').trim().notEmpty().withMessage('El nombre es obligatorio'),
body('nacionalidad').trim().notEmpty().withMessage('La nacionalidad es obligatoria'),
verificarErrores
];

const validarId = [
param('id').isInt({ min: 1 }).withMessage('El id debe ser un número válido'),
verificarErrores
];

const validarRegistro = [
body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
body('correo').isEmail().withMessage('El correo no es válido'),
body('clave').isLength({ min: 6 }).withMessage('La clave debe tener mínimo 6 caracteres'),
verificarErrores
];

const validarLogin = [
body('correo').isEmail().withMessage('El correo no es válido'),
body('clave').notEmpty().withMessage('La clave es obligatoria'),
verificarErrores
];

module.exports = { validarLibro, validarAutor, validarId, validarRegistro, validarLogin };