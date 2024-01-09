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
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
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
    res.status(401).json({ msg: 'Token no válido' });
  }
};

// Middleware de Autorización
const autorizar = (rolesPermitidos) => {
  return (req, res, next) => {
    // Verificar si el usuario tiene el rol necesario
    if (!rolesPermitidos.includes(req.usuarioLogeado.rol)) {
      return res.status(403).json({ msg: 'No tienes permisos para realizar esta acción' });
    }

    next();
  };
};

module.exports = { autenticar, autorizar };
