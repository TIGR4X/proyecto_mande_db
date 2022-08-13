var express = require('express');
var router = express.Router();
const connect = require('./db_pool_connect');

//Pagina Base
router.get('/', function(req, res, next) {
  res.render('login_cliente');
});

//Validar Inicio Sesión
router.post('/', function (req, res, next) {
  var correo = req.body.email_cliente;
  var fono = req.body.fono_cliente;
  
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT c_nombre, c_apellido FROM cliente WHERE c_email='${correo}' AND c_telefono = '${fono}';`,
      function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);

        if (err) {
          return console.error('error running query', err);
        }

        if (result.rowCount == 0){
          res.render('login_cliente', { error: 'Datos incorrectos. Intente nuevamente.' });
        }else{  
          //res.send(JSON.stringify(result.rows));
          res.render("index_trabajador", { title: 'MNDAPP'});
        }
      });
  });

})


module.exports = router;