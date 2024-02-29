const router = require("express").Router();
const controllerLoteCentroDeVacunacion = require("../controllers/ControllerLoteCentroDeVacunacion");
const { autenticar, autorizar } = require("../middleware/validacionToken");

// aca listo los endpoints 

router.get("/GestionLotesCentroDeVacunacion", autenticar, controllerLoteCentroDeVacunacion.CargarVistaGestionLotes);

router.post("/NuevoLoteCentroDeVacunacion", autenticar,autorizar(["admin","provincia","Centrodevacunacion"]), controllerLoteCentroDeVacunacion.NuevoLoteCentroDeVacunacion);

router.post("/ReasignarLoteCentroDeVacunacion", autenticar,autorizar(["admin","provincia"]), controllerLoteCentroDeVacunacion.ReasignarLoteCentroDeVacunacion);

router.get("/LotesCentrosDeVacunacionFiltro", autenticar, controllerLoteCentroDeVacunacion.LotesCentrosDeVacunacionFiltro);

router.put("/EditarLoteCentroDeVacunacion/:id",  autenticar,autorizar(["admin","provincia","Centrodevacunacion"]), controllerLoteCentroDeVacunacion.EditarCentroDeVacunacion)

module.exports = router;