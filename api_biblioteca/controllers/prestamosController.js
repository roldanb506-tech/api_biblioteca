const pool = require('../config/db');

const devolverLibro = async (req, res, next) => {
const connection = await pool.getConnection();
try {
    await connection.beginTransaction();

    const [prestamos] = await connection.query(
      'SELECT * FROM prestamos WHERE id_prestamo = ? FOR UPDATE',
    [req.params.id]
    );

    if (prestamos.length === 0) {
    await connection.rollback();
    return res.status(404).json({ error: 'Préstamo no encontrado' });
    }

    const prestamo = prestamos[0];
    if (prestamo.estado === 'devuelto') {
    await connection.rollback();
    return res.status(400).json({ error: 'El préstamo ya fue devuelto' });
    }

    await connection.query(
    'UPDATE prestamos SET estado = ?, fecha_devolucion = CURDATE() WHERE id_prestamo = ?',
    ['devuelto', req.params.id]
    );

    await connection.query(
    'UPDATE libros SET disponible = 1 WHERE id_libro = ?',
    [prestamo.libro_id]
    );

    await connection.commit();
    res.json({ mensaje: 'Libro devuelto correctamente' });
} catch (error) {
    await connection.rollback();
    next(error);
} finally {
    connection.release();
}
};

module.exports = { devolverLibro };