const pool = require('../config/db');

const obtenerAutores = async (req, res, next) => {
try {
    const [rows] = await pool.query('SELECT * FROM autores');
    res.json(rows);
} catch (error) {
    next(error);
}
};

const obtenerAutoresPorNacionalidad = async (req, res, next) => {
try {
    const [rows] = await pool.query(
      'SELECT * FROM autores WHERE nacionalidad = ?',
    [req.params.nacionalidad]
    );
    res.json(rows);
} catch (error) {
    next(error);
}
};

const crearAutor = async (req, res, next) => {
const { nombre_autor, nacionalidad } = req.body;
if (!nombre_autor || !nacionalidad) {
    return res.status(400).json({ error: 'nombre_autor y nacionalidad son obligatorios' });
}
try {
    const [result] = await pool.query(
    'INSERT INTO autores (nombre_autor, nacionalidad) VALUES (?, ?)',
    [nombre_autor, nacionalidad]
    );
    res.status(201).json({ id_autor: result.insertId, nombre_autor, nacionalidad });
} catch (error) {
    next(error);
}
};

const actualizarAutor = async (req, res, next) => {
const { nombre_autor, nacionalidad } = req.body;
if (!nombre_autor || !nacionalidad) {
    return res.status(400).json({ error: 'nombre_autor y nacionalidad son obligatorios' });
}
try {
    const [result] = await pool.query(
    'UPDATE autores SET nombre_autor = ?, nacionalidad = ? WHERE id_autor = ?',
    [nombre_autor, nacionalidad, req.params.id]
    );
    if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json({ mensaje: 'Autor actualizado correctamente' });
} catch (error) {
    next(error);
}
};

const eliminarAutor = async (req, res, next) => {
try {
    const [result] = await pool.query(
    'DELETE FROM autores WHERE id_autor = ?',
    [req.params.id]
    );
    if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json({ mensaje: 'Autor eliminado correctamente' });
} catch (error) {
    next(error);
}
};

module.exports = {
obtenerAutores,
obtenerAutoresPorNacionalidad,
crearAutor,
actualizarAutor,
eliminarAutor
};