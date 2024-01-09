const { usuario } = require('../models/usuario');

const controllersIndex = {
    CargarVistaHome: async (req, res) => {
     //   res.render('index', { title: 'Express' });


        try {
            // Realizar la consulta a la base de datos
            const usuarios = await usuario.findAll();

            // Pasar los resultados a la vista
            //console.log('Usuarios:',typeof usuarios);
         //   console.log(req.usuarioLogeado);
            const usuarioLogeado = req.usuarioLogeado;
            res.render('index', { title: 'Express', usuarioLogeado:usuarioLogeado.correo});
        }catch (error) {
            console.error('Error al consultar la base de datos:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
   }



module.exports = controllersIndex;