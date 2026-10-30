
CREATE DATABASE IF NOT EXISTS biblioteca;

USE biblioteca;

CREATE TABLE autores (
    id_autor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_autor VARCHAR(155) NOT NULL,
    nacionalidad VARCHAR(255) NOT NULL
);

CREATE TABLE libros (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    titulo_libro VARCHAR(255) NOT NULL,
    ano_publicacion INT NOT NULL,
    autor_id INT,
    FOREIGN KEY (autor_id) REFERENCES autores(id_autor)
);

CREATE TABLE prestamos(
id_prestamo INT AUTO_INCREMENT PRIMARY KEY,
libro_id INT,
fecha_prestamo DATE,
fecha_devolucion DATE,
estado ENUM('activo','devuelto') DEFAULT 'activo',
FOREIGN KEY(libro_id) REFERENCES libros(id_libro)
);

INSERT INTO autores (nombre_autor, nacionalidad) VALUES
('Gabriel García Márquez', 'Colombiana'),
('J. K. Rowling', 'Británica'),
('George Orwell', 'Británica'),
('Miguel de Cervantes', 'Española'),
('Antoine de Saint-Exupéry', 'Francesa'),
('Julio Verne', 'Francesa'),
('Jane Austen', 'Británica'),
('Mario Vargas Llosa', 'Peruana'),
('Fiódor Dostoyevski', 'Rusa'),
('Isabel Allende', 'Chilena');

INSERT INTO libros (titulo_libro, ano_publicacion, autor_id) VALUES
('Cien años de soledad', 1967, 1),
('Harry Potter y la piedra filosofal', 1997, 2),
('1984', 1949, 3),
('Don Quijote de la Mancha', 1605, 4),
('El principito', 1943, 5),
('Viaje al centro de la Tierra', 1864, 6),
('Orgullo y prejuicio', 1813, 7),
('La ciudad y los perros', 1963, 8),
('Crimen y castigo', 1866, 9),
('La casa de los espíritus', 1982, 10);

ALTER TABLE libros
ADD disponible BOOLEAN DEFAULT TRUE;