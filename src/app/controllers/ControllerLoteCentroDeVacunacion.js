const { loteprovincial } = require("../models/loteProvincial");
const { loteproveedor } = require("../models/loteProveedor");
const { lotecentrodevacunacion } = require("../models/loteCentroDeVacunacion");

const { vacuna } = require("../models/vacuna");
const { centrodevacunacion } = require("../models/centroDeVacunacion");
const { depositoprovincial } = require("../models/depositoProvincial");
const { enfermero } = require("../models/enfermero");
const { descarte } = require("../models/descarte");
const { registrovacunacion } = require("../models/registroVacunacion");

const { ciudad } = require("../models/ciudad");
const { provincia } = require("../models/provincia");

const { Op } = require("sequelize");
const { sequelize } = require("../conexion");
const { persona } = require("../models/persona");

const ControllerLoteCentroDeVacunacion = {
	CargarVistaGestionLotes: async (req, res) => {
		const LotesCentrosDeVacunacion = await lotecentrodevacunacion.findAll({
			include: [
				{
					model: loteprovincial,
					required: true,
					include: [{ model: loteproveedor, required: true, include: [{ model: vacuna, required: true }] }],
				},
				{
					model: centrodevacunacion,
					include: [
						{
							model: ciudad,
							include: [
								{
									model: provincia,
									as: "provincia",
								},
							],
						},
					],
				},
			],
		});
		const Vacunas = await vacuna.findAll();
		const Ubicaciones = await ciudad.findAll({
			include: [
				{
					model: provincia,
					as: "provincia",
				},
			],
		});

		const centrosDeVacunacion = await centrodevacunacion.findAll({
			include: [
				{
					model: ciudad,
					include: [
						{
							model: provincia,
							as: "provincia",
						},
					],
				},
			],
		})

		const lotesProvinciales = await loteprovincial.findAll({
			include: [
				{
					model: loteproveedor,
					required: true,
					include: [{ model: vacuna, required: true }],
				},
				{
					model: depositoprovincial,
				}
			],
		})

		const Enfermeros = await enfermero.findAll({
			include: persona,
		});
		await TotalDistribuidoP(LotesCentrosDeVacunacion);

		const LotesCentrosDeVacunacionDisponibles = LotesCentrosDeVacunacion.filter((lote) => lote.totalDisponible > 0);

		res.render("GestionLoteCentroDeVacunacion", {
			usuarioLogeado: req.usuarioLogeado.correo,
			LotesCentrosDeVacunacion: LotesCentrosDeVacunacionDisponibles,
			Vacunas: Vacunas,
			Ubicaciones: Ubicaciones,
			Enfermeros: Enfermeros,
			centrosDeVacunacion: centrosDeVacunacion,
			lotesProvinciales: lotesProvinciales
		});
	},

	NuevoLoteCentroDeVacunacion: async (req, res) => {
		const { loteprovincial, centrodevacunacion, cantidadvacunas} = req.body;
		console.log(loteprovincial, centrodevacunacion, cantidadvacunas);

		

		//let mensajeToast = "";

		//creo el loteCentroDeVacunacion

		await lotecentrodevacunacion.create({
			idLoteProvincial: loteprovincial,
			idCentroDeVacunacion: centrodevacunacion,
			cantidadDeVacunas: cantidadvacunas ,
			fechaDeAdquisicion: null,
		});

		res.redirect("/GestionLotesCentroDeVacunacion");
	},

	ReasignarLoteCentroDeVacunacion: async (req, res) => {
		const {cantidadvacunas, depositoreasignado, idloteprovincial,idlotecentrosalida} = req.body;
		console.log(cantidadvacunas, depositoreasignado ,idloteprovincial,idlotecentrosalida);


		//le resto la cantidad de vacunas al lote emisor 

		const centroDeVacunacionEmisor = await lotecentrodevacunacion.findByPk(idlotecentrosalida);

		await centroDeVacunacionEmisor.decrement("cantidadDeVacunas",{ by: parseInt(cantidadvacunas)});

		await lotecentrodevacunacion.create({
			idLoteProvincial: idloteprovincial,
			idCentroDeVacunacion:depositoreasignado,
			cantidadDeVacunas: cantidadvacunas,
			fechaDeAdquisicion: null,
		});

		res.redirect("/GestionLotesCentroDeVacunacion");
	},




	LotesCentrosDeVacunacionFiltro: async (req, res) => {
		const { vacunafiltro, provinciafiltro } = req.body;

		console.log(vacunafiltro, provinciafiltro);

		const LotesCentrosDeVacunacion = await lotecentrodevacunacion.findAll({
			include: [
				/* { model: lote, required: true, where: { fechaDeAdquisicion: { [Op.not]: null } } }, */
				{
					model: loteprovincial,
					required: true,
					include: [
						{
							model: loteproveedor,
							required: true,
							include: [{ model: vacuna, required: true, where: vacunafiltro ? { tipoDeVacuna: vacunafiltro } : {} }],
						},
					],
				},
				{
					model: centrodevacunacion,
					required: true,
					include: [
						{
							model: ciudad,
							required: true,
							include: [
								{
									model: provincia,
									as: "provincia",
									where: provinciafiltro ? { nombre: provinciafiltro } : {},
								},
							],
							/* required: true,
							where: provinciafiltro ? { provincia: provinciafiltro } : {}, */
						},
					],
				},
			],
			where: { fechaDeAdquisicion: { [Op.not]: null } },
		});

		const Vacunas = await vacuna.findAll();
		const Ubicaciones = await ciudad.findAll({
			include: [
				{
					model: provincia,
					as: "provincia",
				},
			],
		});
		const Enfermeros = await enfermero.findAll({
			include: persona,
		});

		const depositosProvinciales = await depositoprovincial.findAll({
			include: [
				{
					model: ciudad,
					include: [
						{
							model: provincia,
							as: "provincia",
						},
					],
				},
			],
		})

		const lotesProvinciales = await loteprovincial.findAll({
			include: [
				{
					model: loteproveedor,
					required: true,
					include: [{ model: vacuna, required: true }],
				},
				{
					model: depositoprovincial,
				}
			],
		})
		const centrosDeVacunacion = await centrodevacunacion.findAll({
			include: [
				{
					model: ciudad,
					include: [
						{
							model: provincia,
							as: "provincia",
						},
					],
				},
			],
		})

		await TotalDistribuidoP(LotesCentrosDeVacunacion);

		const LotesCentrosDeVacunacionDisponibles = LotesCentrosDeVacunacion.filter((lote) => lote.totalDisponible > 0);

		res.render("GestionLoteCentroDeVacunacion", {
			usuarioLogeado: req.usuarioLogeado.correo,
			LotesCentrosDeVacunacion: LotesCentrosDeVacunacionDisponibles,
			Vacunas: Vacunas,
			Ubicaciones: Ubicaciones,
			Enfermeros: Enfermeros,
			depositosProvinciales: depositosProvinciales,
			centrosDeVacunacion: centrosDeVacunacion,
			lotesProvinciales: lotesProvinciales
		});
		
	},

	EditarCentroDeVacunacion: async (req, res) => {
		 const { deposito, loteprovincial, cantidad, fechaadquisicion } = req.body;

		console.log( deposito, loteprovincial, cantidad, fechaadquisicion);

		const loteCentroDevacunacionEditado = await lotecentrodevacunacion.findByPk(req.params.id, {});

		if (loteCentroDevacunacionEditado) {
			loteCentroDevacunacionEditado.idCentroDeVacunacion = parseInt(deposito);
			loteCentroDevacunacionEditado.idLoteProvincial = parseInt(loteprovincial)
			loteCentroDevacunacionEditado.cantidadDeVacunas = cantidad;
			loteCentroDevacunacionEditado.fechaDeAdquisicion = new Date(fechaadquisicion);;
		}
		await loteCentroDevacunacionEditado.save();

		res.redirect("/GestionLotesCentroDeVacunacion"); 
	}


};

async function TotalDistribuidoP(lotesCentrosDeVacunacion) {
	const lotesdescartados = await descarte.findAll({});
	const total = await registrovacunacion.findAll({
		attributes: ["idLoteCentroDeVacunacion", [sequelize.fn("COUNT", sequelize.col("*")), "totalAplicadas"]],
		group: ["idLoteCentroDeVacunacion"],
	});
	//console.log("total:", total);

	lotesCentrosDeVacunacion.forEach((loteCentrosDeVacunacion) => {
		let Total = 0;
		let descarte = 0;
		let aplicadas = 0;
		Total = loteCentrosDeVacunacion.cantidadDeVacunas;

		// restarle aplicadas

		total.forEach((Aplicacion) => {
			//console.log(Aplicacion.idLoteCentroDeVacunacion , loteCentrosDeVacunacion.id,Aplicacion.dataValues.totalAplicadas)
			if (Aplicacion.idLoteCentroDeVacunacion == loteCentrosDeVacunacion.id) {
				Total = Total - Aplicacion.dataValues.totalAplicadas;
				aplicadas = Aplicacion.dataValues.totalAplicadas;
			}
		});

		//le resto lo que fue descartado
		lotesdescartados.forEach((loteDescarte) => {
			if (loteDescarte.idLote == loteCentrosDeVacunacion.id && loteDescarte.TipoDeLote == "LoteCentroDeVacunacion") {
				Total = Total - loteDescarte.cantidad;
				descarte = descarte + loteDescarte.cantidad;
			}
		});

		// Agregar la propiedad compraTotal a loteproveedor
		//console.log("Total P:", Total);
		loteCentrosDeVacunacion.descarteTotal = descarte;
		loteCentrosDeVacunacion.totalDisponible = Total;
		loteCentrosDeVacunacion.totalAplicadas = aplicadas;
		//console.log("Total:", loteCentrosDeVacunacion.descarteTotal);
	});
}

module.exports = ControllerLoteCentroDeVacunacion;
