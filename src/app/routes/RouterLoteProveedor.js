const router = require("express").Router();
const controllerLoteProveedor = require("../controllers/ControllerLoteProveedor");
const { autenticar, autorizar } = require("../middleware/validacionToken");

// aca listo los endpoints 

router.get("/GestionLotesProveedor", autenticar, controllerLoteProveedor.CargarVistaGestionLotes);

router.get("/LotesProveedoresFiltro", autenticar,autorizar(["admin","nacion"]), controllerLoteProveedor.CargarVistaGestionLotesFiltro);

router.post("/ComprarLoteProveedor", autenticar,autorizar(["admin","nacion"]), controllerLoteProveedor.CrearLoteProveedor);

router.put("/EditarLoteProveedor/:id", autenticar,autorizar(["admin","nacion"]), controllerLoteProveedor.EditarLoteProveedor);

router.get("/InformeLoteProveedor", autenticar,autorizar(["admin","nacion"]), controllerLoteProveedor.InformeLoteProveedor);

/* 
router.post("/RegistrarDepositoNacional", autenticar, ControllerDepositoNacional.RegistrarDepositoNacional);

router.put("/EditarDepositoNacional/:id", autenticar, ControllerDepositoNacional.EditarDepositoNacional);
 */

module.exports = router;