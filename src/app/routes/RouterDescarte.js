const router = require("express").Router();
const controllerDescarte = require("../controllers/ControllerDescarte");
const { autenticar, autorizar } = require("../middleware/validacionToken");

// aca listo los endpoints 

router.post("/DescartarLote", autenticar, controllerDescarte.DescartarLote);

router.get("/InformeVacunasDescartadasLoteProveedor", autenticar, controllerDescarte.VacunasDescartadasLoteProveedor);

router.get("/InformeVacunasDescartadasLoteProvincial", autenticar, controllerDescarte.VacunasDescartadasLoteProvincial);

router.get("/InformeVacunasDescartadasLoteCentroDeVacunacion", autenticar, controllerDescarte.VacunasDescartadasLoteCentroDeVacunacion);


module.exports = router;