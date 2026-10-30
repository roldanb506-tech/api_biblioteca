// middleware/autenticar.js
const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
const encabezado = req.headers.authorization;

if (!encabezado || !encabezado.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Acceso denegado: falta el token' });
}

const token = encabezado.split(' ')[1];

try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
} catch (error) {
    res.status(403).json({ mensaje: 'Token inválido o expirado' });
}
};

module.exports = autenticar;