\c mande_db

INSERT INTO cliente 
VALUES('3013571288', 'Primero', 'Tablo', '1111111111', 'correo1@gmail.com', 'CRA 91A #99A-99', NULL, 'Efectivo');
INSERT INTO cliente 
VALUES('3201234567', 'Segundo', 'Tablo', '2222222222', 'correo2@gmail.com', 'CRA 92A #99B-99', NULL, 'Efectivo'); 
INSERT INTO cliente 
VALUES('3301234567', 'Tercero', 'Tablo', '3333333333', 'correo3@gmail.com', 'CRA 93A #99C-99', NULL, 'Efectivo');

INSERT INTO trabajador 
VALUES ('3013571288', '4444444444', 'Cuarto', 'Tablo', 'correo4@gmail.com', 'CRA 94A #99D-99', 5.0, FALSE, NULL, NULL);
INSERT INTO trabajador
VALUES ('3401234567', '5555555555', 'Quinto', 'Tablo', 'correo5@gmail.com', 'CRA 95A #99E-99', 4.5, FALSE, NULL, NULL);
INSERT INTO trabajador
VALUES ('3501234567', '6666666666', 'Cuarto', 'Tablo', 'correo6@gmail.com', 'CRA 96A #99F-99', 4.0, FALSE, NULL, NULL);

INSERT INTO labor (l_tipo_labor) 
VALUES ('Limpieza');
INSERT INTO labor (l_tipo_labor) 
VALUES ('Profesor');
INSERT INTO labor (l_tipo_labor) 
VALUES ('Cuidado');