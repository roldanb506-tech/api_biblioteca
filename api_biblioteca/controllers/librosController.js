
const pool = require('../config/db');

// Obtener todos los libros
const obtenerLibros = async (req, res, next) => {
    try {
        const [rows] = await pool.query(
            `SELECT l.id_libro, l.titulo_libro,
                    l.ano_publicacion, l.disponible,
                    a.nombre_autor
            FROM libros l
            LEFT JOIN autores a ON l.autor_id = a.id_autor`
        );

        res.json(rows);
    } catch (error) {
        next(error);
    }
};

// Obtener un libro por ID
const obtenerLibroPorId = async (req, res, next) => {
    try {
        const [rows] = await pool.query(
            `SELECT l.id_libro, l.titulo_libro,
                    l.ano_publicacion, l.disponible,
                    a.nombre_autor
            FROM libros l
            LEFT JOIN autores a ON l.autor_id = a.id_autor
            WHERE l.id_libro = ?`,
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Libro no encontrado'
            });
        }

        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
};

// Crear un libro
const crear = async (req, res, next) => {
    try {
        const {
            titulo_libro,
            ano_publicacion,
            disponible,
            autor_id
        } = req.body;

        const [resultado] = await pool.query(
            `INSERT INTO libros
            (titulo_libro, ano_publicacion, disponible, autor_id)
            VALUES (?, ?, ?, ?)`,
            [
                titulo_libro,
                ano_publicacion,
                disponible,
                autor_id
            ]
        );

        res.status(201).json({
            mensaje: 'Libro creado correctamente',
            id_libro: resultado.insertId
        });
    } catch (error) {
        next(error);
    }
};

// Actualizar un libro
const actualizar = async (req, res, next) => {
    try {
        const {
            titulo_libro,
            ano_publicacion,
            disponible,
            autor_id
        } = req.body;

        const [resultado] = await pool.query(
            `UPDATE libros
            SET titulo_libro = ?,
                ano_publicacion = ?,
                disponible = ?,
                autor_id = ?
            WHERE id_libro = ?`,
            [
                titulo_libro,
                ano_publicacion,
                disponible,
                autor_id,
                req.params.id
            ]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Libro no encontrado'
            });
        }

        res.json({
            mensaje: 'Libro actualizado correctamente'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerLibros,
    obtenerLibroPorId,
    crear,
    actualizar
};
