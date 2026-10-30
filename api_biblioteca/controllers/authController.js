// controllers/authController.js
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registrar = async (req, res, next) => {
try {
    const { nombre, correo, clave } = req.body;
    const hash = await bcrypt.hash(clave, 10);

    const [resultado] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, clave) VALUES (?, ?, ?)',
    [nombre, correo, hash]
    );

    res.status(201).json({ id: resultado.insertId, mensaje: 'Usuario registrado' });
} catch (error) {
    next(error);
}
};

const login = async (req, res, next) => {
try {
    const { correo, clave } = req.body;

    const [filas] = await pool.query(
      'SELECT * FROM usuarios WHERE correo = ?',
    [correo]
    );

    // Mismo mensaje si no existe el correo o si la clave falla:
    // así no revelas cuál de los dos estaba mal
    const usuario = filas[0];
    const claveValida = usuario && await bcrypt.compare(clave, usuario.clave);

    if (!claveValida) {
    return res.status(401).json({ mensaje: 'Correo o clave incorrectos' });
    }

    const token = jwt.sign(
    { id: usuario.id, correo: usuario.correo },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
    );

    res.json({ token });
} catch (error) {
    next(error);
}
};

module.exports = { registrar, login };