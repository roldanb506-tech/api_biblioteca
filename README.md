# API Biblioteca

API REST para la gestión de una biblioteca: libros, autores y préstamos. Desarrollada con **Node.js**, **Express** y **MySQL**, siguiendo una arquitectura por capas (rutas → controladores → base de datos).

## Tecnologías

- Node.js
- Express 4
- MySQL (mysql2 con pool de conexiones y promesas)
- dotenv

## Estructura del proyecto

```
api_biblioteca/
├── config/
│   └── db.js                      # Pool de conexión a MySQL
├── routes/
│   ├── libros.js                  # Rutas de /api/libro
│   ├── autores.js                 # Rutas de /api/autores
│   └── prestamos.js               # Rutas de /api/prestamos
├── controllers/
│   ├── librosController.js        # Lógica de libros
│   ├── autoresController.js       # Lógica de autores
│   └── prestamosController.js     # Lógica de préstamos
├── .env                           # Variables de entorno
├── app.js                         # Punto de entrada de la aplicación
└── package.json
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- MySQL en ejecución
- Base de datos `biblioteca` creada con las tablas descritas más abajo

## Instalación

1. Clona o descarga el proyecto y entra a la carpeta:

   ```bash
   cd api_biblioteca
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea el archivo `.env` en la raíz del proyecto:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=biblioteca
   DB_PORT=3307
   ```

   > Ajusta `DB_PORT` y `DB_PASSWORD` según tu instalación de MySQL.

4. Inicia el servidor:

   ```bash
   npm start
   ```

   O en modo desarrollo (reinicia al guardar cambios):

   ```bash
   npm run dev
   ```

El servidor quedará disponible en `http://localhost:3000`.

## Base de datos

| Tabla       | Campos                                                                 |
|-------------|------------------------------------------------------------------------|
| `autores`   | `id_autor`, `nombre_autor`, `nacionalidad`                             |
| `libros`    | `id_libro`, `titulo_libro`, `ano_publicacion`, `autor_id`, `disponible` |
| `prestamos` | `id_prestamo`, `libro_id`, `estado`, `fecha_devolucion`                |

Relaciones:

- `libros.autor_id` → `autores.id_autor`
- `prestamos.libro_id` → `libros.id_libro`

## Endpoints

### Libros — `/api/libro`

| Método | Ruta              | Descripción                            |
|--------|-------------------|----------------------------------------|
| GET    | `/api/libro`      | Lista todos los libros con su autor    |
| GET    | `/api/libro/:id`  | Obtiene un libro por su ID             |

### Autores — `/api/autores`

| Método | Ruta                                    | Descripción                          |
|--------|-----------------------------------------|--------------------------------------|
| GET    | `/api/autores`                          | Lista todos los autores              |
| GET    | `/api/autores/nacionalidad/:nacionalidad` | Filtra autores por nacionalidad    |
| POST   | `/api/autores`                          | Crea un autor                        |
| PUT    | `/api/autores/:id`                      | Actualiza un autor                   |
| DELETE | `/api/autores/:id`                      | Elimina un autor                     |

**Cuerpo para POST y PUT:**

```json
{
  "nombre_autor": "Gabriel García Márquez",
  "nacionalidad": "Colombiana"
}
```

### Préstamos — `/api/prestamos`

| Método | Ruta                            | Descripción                                                        |
|--------|---------------------------------|--------------------------------------------------------------------|
| PUT    | `/api/prestamos/devolver/:id`   | Registra la devolución de un libro y lo marca como disponible      |

La devolución se ejecuta dentro de una **transacción**: se actualiza el préstamo (estado y fecha de devolución) y el libro (`disponible = 1`). Si algo falla, se revierte todo con `rollback`.

## Ejemplos de uso

```bash
# Listar libros
curl http://localhost:3000/api/libro

# Crear un autor
curl -X POST http://localhost:3000/api/autores \
  -H "Content-Type: application/json" \
  -d '{"nombre_autor":"Gabriel García Márquez","nacionalidad":"Colombiana"}'

# Buscar autores por nacionalidad
curl http://localhost:3000/api/autores/nacionalidad/Colombiana

# Devolver un préstamo
curl -X PUT http://localhost:3000/api/prestamos/devolver/1
```

## Códigos de respuesta

| Código | Significado                                  |
|--------|----------------------------------------------|
| 200    | Operación exitosa                            |
| 201    | Recurso creado                               |
| 400    | Datos inválidos o faltantes                  |
| 404    | Recurso o ruta no encontrada                 |
| 500    | Error interno del servidor                   |

## Scripts disponibles

| Comando       | Descripción                                   |
|---------------|-----------------------------------------------|
| `npm start`   | Inicia el servidor con Node                   |
| `npm run dev` | Inicia el servidor reiniciando ante cambios   |

## Autor: Brayan Diaz Roldan

Proyecto académico de desarrollo de software."# api_biblioteca" 
