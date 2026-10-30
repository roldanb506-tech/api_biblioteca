
require('dotenv').config();

const express = require('express');
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const autenticar = require('./api_biblioteca/middleware/autenticar');
const manejadorErrores = require('./api_biblioteca/middleware/errorHandler');

const librosRoutes = require('./api_biblioteca/routes/libros');
const autoresRoutes = require('./api_biblioteca/routes/autores');
const prestamosRoutes = require('./api_biblioteca/routes/prestamos');
const authRoutes = require('./api_biblioteca/routes/auth');

const documentacion = YAML.load(
    path.join(__dirname, 'swagger.yaml')
);

// Crear la aplicación
const app = express();

// Middleware para recibir JSON
app.use(express.json());

// Documentación Swagger
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(documentacion)
);

// Rutas públicas
app.use('/api/libros', librosRoutes);
app.use('/api/autores', autoresRoutes);
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.use('/api/prestamos', autenticar, prestamosRoutes);

// Ruta para direcciones inexistentes
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada'
    });
});

// Manejador de errores al final
app.use(manejadorErrores);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API escuchando en el puerto ${PORT}`));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación Swagger: http://localhost:${PORT}/api-docs`);
});
