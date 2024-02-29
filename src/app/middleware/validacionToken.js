const jwt = require('jsonwebtoken');
const { usuario } = require('../models/usuario');

// Middleware de Autenticación
const autenticar = async (req, res, next) => {
  // Obtener el token del encabezado de la solicitud
  //const bearerToken = req.headers['authorization'];
  console.log(req.cookies.jwt);
  const token = req.cookies.jwt;
  // Verificar si no hay token
  if (!token) {
    res.status(500).render("error" , { error: "401", mensaje: "Error al autenticar : "+ error });
   //return res.locals.errorMessage = 'Error interno del servidor';
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, 'SegmentationFault'); // Reemplaza 'tu_secreto' con tu clave secreta

     // Añadir el usuario desde el token a la solicitud
    const LoginUsuario = await usuario.findOne({ where: { id: decoded.id } });
    req.usuarioLogeado = LoginUsuario

    //console.log("VENGO DEL MIDLLEE",req.usuarioLogeado,decoded);
    next();
  } catch (error) {
    res.status(500).render("error" , { error: "401", mensaje: "Error al autenticar : "+ error });
  }
};

// Middleware de Autorización
const autorizar = (rolesPermitidos) => {
  return (req, res, next) => {
    // Verificar si el usuario tiene el rol necesario
    if (!rolesPermitidos.includes(req.usuarioLogeado.rol)) {
      res.status(500).render("error", { error: "No autorizado", mensaje: "No posee los permisos necesarios ( " + rolesPermitidos.join(", ") + "), su rol: "+ req.usuarioLogeado.rol });
    }
    
    next();
  };
};

module.exports = { autenticar, autorizar };
