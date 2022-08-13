-- Database: mande_db

-- DROP DATABASE mande_db;

CREATE DATABASE mande_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c mande_db

CREATE TABLE labor(
	l_id SERIAL PRIMARY KEY,
	l_tipo_labor VARCHAR(50) UNIQUE
);

CREATE TABLE cliente(
	c_telefono VARCHAR(15) PRIMARY KEY,
  	c_cedula VARCHAR(15),
	c_nombre VARCHAR(50),
  	c_apellido VARCHAR (50),
    c_email VARCHAR(60),
    c_direccion VARCHAR(120),
    c_recibo_evidencia BYTEA DEFAULT NULL,
    c_medio_pago VARCHAR(60) DEFAULT 'Efectivo'

);

CREATE TABLE trabajador(
 	t_telefono VARCHAR(15) PRIMARY KEY,
	t_cedula VARCHAR(15),
	t_nombre VARCHAR(50),
	t_apellido VARCHAR(50),
 	t_email VARCHAR(60),
  t_direccion VARCHAR(120),
	t_estrellas_prom FLOAT DEFAULT 0.0,
	t_disponibilidad BOOLEAN DEFAULT(false),
	t_foto_cedula BYTEA DEFAULT NULL,
	t_foto_perfil BYTEA DEFAULT NULL
);

--Vincula las peticiones de un cliente con el trabajador que realiza el mismo
CREATE TABLE solicitud(
    s_id SERIAL PRIMARY KEY,
    telefono_cliente VARCHAR(15),
    telefono_trabajador VARCHAR(15),
    id_labor INTEGER,
    fecha_servicio DATE,
    costo_servicio FLOAT,
    calificacion_servicio INTEGER,
  
  CONSTRAINT fk_solicitud_cliente
  	FOREIGN KEY(telefono_cliente)
  		REFERENCES cliente(c_telefono)
  		ON DELETE SET NULL,
  
  CONSTRAINT fk_solicitud_trabajador
  	FOREIGN KEY(telefono_trabajador)
  		REFERENCES trabajador(t_telefono)
  		ON DELETE SET NULL,
  
  CONSTRAINT fk_solicitud_labor
  	FOREIGN KEY(id_labor)
  		REFERENCES labor(l_id)
  		ON DELETE SET NULL
);

--Vincula una o más labores predefinidas a elección del trabajador
CREATE TABLE servicio(
    telefono_trabajador VARCHAR(15),
    id_labor INTEGER,
    precio_servicio FLOAT DEFAULT 10000,
    descripcion_servicio VARCHAR(50) DEFAULT 'N/A',
  
    PRIMARY KEY (telefono_trabajador,id_labor),
  	
    CONSTRAINT fk_servicio_trabajador
      FOREIGN KEY(telefono_trabajador)
          REFERENCES trabajador(t_telefono)
          ON DELETE SET NULL,
  
    CONSTRAINT fk_servicio_labor
      FOREIGN KEY(id_labor)
          REFERENCES labor(l_id)
          ON DELETE SET NULL
);