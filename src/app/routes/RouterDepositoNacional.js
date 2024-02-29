const router = require("express").Router();
const ControllerDepositoNacional = require("../controllers/ControllerDepositoNacional");
const { autenticar, autorizar } = require("../middleware/validacionToken");

// aca listo los endpoints 
router.get("/DepositosNacionales", autenticar, ControllerDepositoNacional.CargarVistaDeposito);

router.post("/RegistrarDepositoNacional", autenticar,autorizar(["admin", "nacion"]), ControllerDepositoNacional.RegistrarDepositoNacional);

router.put("/EditarDepositoNacional/:id", autenticar,autorizar(["admin", "nacion"]), ControllerDepositoNacional.EditarDepositoNacional);

module.exports = router;
