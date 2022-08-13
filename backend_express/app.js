const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const helloRouter = require('./routes/hello'); //Probar el Send
const crearRouter = require('./routes/crear'); //Probar el POST
const queryRouter = require('./routes/query'); //Probar Querys
//app.use('/usuario', usuarioRouter); //Probar el GET

const indexRouter = require('./routes/index'); //Pagina Principal
const login_clienteRouter = require('./routes/login_cliente'); //READ Cliente
const login_trabajadorRouter = require('./routes/login_trabajador'); //READ Trabajador
const registro_trabajadorRouter = require('./routes/registro_trabajador'); //CREATE Trabajador
const borrar_trabajadorRouter = require('./routes/borrar_trabajador'); //DELETE Trabajador

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Uso de Routers
app.use('/hello', helloRouter);
app.use('/crear', crearRouter);
app.use('/query', queryRouter);

app.use('/', indexRouter);
app.use('/login_cliente',login_clienteRouter);
app.use('/login_trabajador',login_trabajadorRouter);
app.use('/registro_trabajador',registro_trabajadorRouter);
app.use('/borrar_trabajador', borrar_trabajadorRouter);
//app.use('/registro_cliente',registro_tclienteRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
