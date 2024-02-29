const router = require("express").Router();
const ControllerCentroDeVacunacion = require("../controllers/ControllerCentroDeVacunacion");
const { autenticar, autorizar } = require("../middleware/validacionToken");

// aca listo los endpoints
router.get("/CentrosDeVacunacion",autenticar, ControllerCentroDeVacunacion.CargarVistaCentroDeVacunacion);

router.post(
	"/RegistrarCentroDeVacunacion",
	autenticar,
	autorizar(["admin", "provincia","Centrodevacunacion"]),
	ControllerCentroDeVacunacion.RegistrarCentrosDeVacunacion
);

router.put(
	"/EditarCentroDeVacunacion/:id",
	autenticar,
	autorizar(["admin", "provincia","Centrodevacunacion"]),
	ControllerCentroDeVacunacion.EditarCentroDeVacunacion
);

module.exports = router;
