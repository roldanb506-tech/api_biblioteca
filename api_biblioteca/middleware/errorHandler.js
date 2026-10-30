// middleware/errorHandler.js
const manejadorErrores = (err, req, res, next) => {
console.error(err.stack);

  // Registro duplicado en MySQL -> 409
if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ mensaje: 'El registro ya existe' });
}

  // Llave foránea inválida (por ejemplo, autor_id que no existe) -> 400
if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({ mensaje: 'La referencia indicada no existe' });
}

  // JSON mal formado en el body -> 400
if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ mensaje: 'El JSON enviado no es válido' });
}

if (err.name === 'ValidationError') {
    return res.status(400).json({ mensaje: 'Datos inválidos', detalles: err.errors });
}

res.status(err.statusCode || 500).json({
    mensaje: err.mensaje || 'Error interno del servidor'
});
};

module.exports = manejadorErrores;