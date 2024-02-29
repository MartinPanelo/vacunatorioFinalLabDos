const router = require("express").Router();
const controllerRegistroVacunacion = require("../controllers/ControllerRegistroVacunacion");
const { autenticar, autorizar } = require("../middleware/validacionToken");

// aca listo los endpoints 


router.post("/AplicarVacuna", autenticar,autorizar(["admin","Centrodevacunacion"]), controllerRegistroVacunacion.AplicarVacuna);

router.get("/informePersonasVacunadas", autenticar, controllerRegistroVacunacion.InformePersonasVacunadas);

module.exports = router;