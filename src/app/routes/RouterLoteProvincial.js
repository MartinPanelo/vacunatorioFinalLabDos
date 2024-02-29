const router = require("express").Router();
const controllerLoteProvincial = require("../controllers/ControllerLoteProvincial");
const { autenticar, autorizar } = require("../middleware/validacionToken");


router.get("/GestionLotesProvincial", autenticar, controllerLoteProvincial.CargarVistaGestionLotes);

router.post("/NuevoLoteProvincial", autenticar,autorizar(["admin","provincia"]), controllerLoteProvincial.NuevoLoteProvincial);

router.put("/EditarLoteProvincial/:id", autenticar,autorizar(["admin","provincia"]), controllerLoteProvincial.EditarLoteProvincial);



module.exports = router;