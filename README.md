# Descripción del Proyecto
Plataforma para encontrar quien haga las cosas por ti por servicios

# Codigo de Despliegue de Contenedores

## Contenedor para la Base de Datos

### 1. Definimos el USER_NAME
Poner un nombre de usuario en una variable de entorno. 

`USER_NAME=x`

### 2. Crear la imagen de docker con el esquema y los datos pre-guardados
```
cd database_postgres
docker build -t ${USER_NAME}/mande_db .
```

### 3. Poner a correr el servidor de bases de datos
```
docker run --name mande_db -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d ${USER_NAME}/mande_db
```
# Contenedor para el Backend
## Instalar las dependencias
Debes estar en la carpeta raìz del proyecto. 


## Contenedor para el Backend
### 1. Crear la imagen en el sistema en la carpeta raiz del proyecto.
 ```
 cd backend_express
 ```
`docker build -t ${USER_NAME}/mande_backend .`

### 2. Instalar las dependencias con npm

`docker run -it --rm -v $(pwd):/usr/src/app ${USER_NAME}/mande_backend /bin/bash`

En la terminal del contenerdor ejecutar
```
npm install
...
exit
```

### 3. Crear un contenedor con la imagen y conectarla con el servidor de bases de datos

`docker run -it --rm -p 3000:3000 -v $(pwd):/usr/src/app --link mande_db:postgres --name mande_app ${USER_NAME}/mande_backend`

# Testeo de Aplicativo
Visite las direcciones

`localhost:3000/` -> Índice app <br>
`localhost:3000/login_trabajador` -> Login para el Rol Trabajador  <br>
`localhost:3000/login_cliente` -> Login para el Rol Cliente <br>
`localhost:3000/registro_trabajador` -> Registro para el Rol Trabajador <br>
`localhost:3000/registro_cliente` -> Registro para el Rol Cliente <br>
