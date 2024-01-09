const router = require("express").Router();
const controllersIndex = require("../controllers/controllerHome");
const { autenticar, autorizar } = require("../middleware/validacionToken");

// aca listo los endpoints 
router.get("/Home", autenticar, controllersIndex.CargarVistaHome);

  
module.exports = router;