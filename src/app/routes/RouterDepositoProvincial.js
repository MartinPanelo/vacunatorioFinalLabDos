const router = require("express").Router();
const ControllerDepositoProvincial = require("../controllers/ControllerDepositoProvincial");
const { autenticar, autorizar } = require("../middleware/validacionToken");

// aca listo los endpoints 
router.get("/DepositosProvinciales", autenticar, ControllerDepositoProvincial.CargarVistaDeposito);

router.post("/RegistrarDepositoProvincial", autenticar,autorizar(["admin", "provincia"]), ControllerDepositoProvincial.RegistrarDepositoProvincial);

router.put("/EditarDepositoProvincial/:id", autenticar,autorizar(["admin", "provincia"]), ControllerDepositoProvincial.EditarDepositoProvincial);


module.exports = router;