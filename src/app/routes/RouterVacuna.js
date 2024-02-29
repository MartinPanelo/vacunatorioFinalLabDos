const router = require("express").Router();
const controllerVacuna = require("../controllers/ControllerVacuna");
const { autenticar, autorizar } = require("../middleware/validacionToken");

// aca listo los endpoints 
router.get("/GestionVacunas", autenticar, controllerVacuna.CargarVistaGestionVacunas);

router.post("/RegistrarVacuna", autenticar,autorizar(["admin","nacion"]), controllerVacuna.RegistrarVacuna);

router.put("/EditarVacuna/:id", autenticar,autorizar(["admin","nacion"]), controllerVacuna.EditarVacuna);

//router.post("/AplicarVacuna", autenticar, controllerVacuna.AplicarVacuna);

module.exports = router;