const router = require("express").Router();
const controllerCuenta = require("../controllers/ControllerCuenta");
const { autenticar, autorizar } = require("../middleware/validacionToken");

// aca listo los endpoints 
router.get("/Login"/* , autenticar */, controllerCuenta.CargarVistaLogin);

router.post("/LogearUsuario"/* , autenticar */, controllerCuenta.LogearUsuario);

router.get("/Registro"/* , autenticar */, controllerCuenta.CargarVistaRegistro);

router.post("/RegistrarUsuario"/* , autenticar */, controllerCuenta.RegistrarUsuario);

router.get("/gestionCuentas", autenticar, controllerCuenta.CargarVistaGestionCuentas);

router.get("/CerrarSesion", controllerCuenta.CerrarSesion);

router.post("/CambiarRol", autenticar, autorizar(["admin"]), controllerCuenta.CambiarRol);




  
module.exports = router;