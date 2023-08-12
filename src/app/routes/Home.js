const router = require("express").Router();
const controllersIndex = require("../controllers/controllerHome");

// aca listo los endpoints 
router.get("/Home", controllersIndex.CargarVistaHome);

module.exports = router;