var express = require("express");
var router = express.Router();
const connect = require("./db_pool_connect");

//Pagina Base
router.get("/", function (req, res, next) {
  res.render("registro_trabajador");
  //res.send('Esta pagina está funcionando');
});

//Registrar Trabajador
router.post("/", function (req, res, next) {
  var fono = req.body.fono_trabajador;
  var cedula = req.body.cedula_trabajador;
  var nombre = req.body.nombre_trabajador;
  var apellido = req.body.apellido_trabajador;
  var email = req.body.email_trabajador;
  var direccion = req.body.direccion_trabajador;
  var labor = parseInt(req.body.labor);
  var foto_cedula = req.body.foto_cedula_trabajador;
  var foto_perfil = req.body.foto_perfil_trabajador;

  connect(function (err, client, done) {
    if (err) {
      return console.error("error fetching client from pool", err);
    }

    //use the client for executing the query
    client.query(`INSERT INTO trabajador(t_telefono, t_cedula, t_nombre, t_apellido, t_email, t_direccion, t_foto_cedula, t_foto_perfil) 
    VALUES('${fono}','${cedula}','${nombre}','${apellido}','${email}','${direccion}','${foto_cedula}','${foto_perfil}');`,
      function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);
        if (err) {
          res.render("registro_trabajador", {
          error: "Algo falló al registrarse, pruebe nuevamente",
        });
          return console.error("error running query", err);
        }

        client.query(`INSERT INTO servicio(telefono_trabajador, id_labor) VALUES('${fono}', ${labor});`);

        //res.send(JSON.stringify(result));
        //res.send(typeof labor);
        res.render('index_trabajador', { title: 'MandeApp', usuario: nombre });
      }
    );
  });
});

module.exports = router;
