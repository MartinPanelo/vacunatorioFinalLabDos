const { loteprovincial } = require("../models/loteProvincial");
const { loteproveedor } = require("../models/loteProveedor");
const { depositoprovincial } = require("../models/depositoProvincial");

const { vacuna } = require("../models/vacuna");
const { lotecentrodevacunacion } = require("../models/loteCentroDeVacunacion");
const { centrodevacunacion } = require("../models/centroDeVacunacion");
const { descarte } = require("../models/descarte");

const { laboratorio } = require("../models/laboratorio");
const { ciudad } = require("../models/ciudad");
const { provincia } = require("../models/provincia");

const { DescartarLote } = require("./ControllerDescarte");

const controllerLoteProvincial = {
	CargarVistaGestionLotes: async (req, res) => {
		const LotesProvinciales = await loteprovincial.findAll({
			include: [
				{ model: loteproveedor, include: [{ model: vacuna }] }, // INNER JOIN con LoteProveedor
				{
					model: depositoprovincial,
					required: true,
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
				}, // INNER JOIN con DepositoProvincial
			],
		});

		await totalDistribuido(LotesProvinciales);

		const LotesProvincialesDisponibles = LotesProvinciales.filter((lote) => lote.total > 0);

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
		});

		const lotesProveedores = await loteproveedor.findAll({
			include: [
				{
					model: vacuna,
					include: [
						{
							model: laboratorio,
						},
					],
				},
			],
		});

		res.render("GestionLoteProvincial", {
			usuarioLogeado: req.usuarioLogeado.correo,
			LotesProvinciales: LotesProvincialesDisponibles,
			centrosDeVacunacion: centrosDeVacunacion,
			depositosProvinciales: depositosProvinciales,
			lotesProveedores: lotesProveedores,
		});
	},

	NuevoLoteProvincial: async (req, res) => {
		const { depositoprovincialid, cantidadvacunas, idLoteProveedor } = req.body;

		let mensajeToast = "";

		//creo el loteProvincial

		const loteProvincialCreado = await loteprovincial.create({
			idDepositoProvincial: depositoprovincialid,
			idLoteProveedor: idLoteProveedor,
			cantidadDeVacunas: cantidadvacunas,
			fechaDeAdquisicion: null,
		});

		res.redirect("/GestionLotesProvincial");

		//creo un lote - loteprovincial
		//datos de lote: cantidad de vacunas
		//datos de loteprovincial: idLote(despues de crear el lote lo tengo)  idDeposiProvincial, idLoteProveedor
	},

	EditarLoteProvincial: async (req, res) => {
		const {loteprovincial: loteprovincialRB, cantidad, fechaadquisicion, deposito, loteproveedor, lotepercance, motivodescarte , formadescarte } = req.body;

		console.log(loteprovincialRB,cantidad, fechaadquisicion, deposito, loteproveedor, lotepercance, motivodescarte , formadescarte);

		const loteProvincialEditado = await loteprovincial.findByPk(req.params.id, {});

		if (loteProvincialEditado) {
			loteProvincialEditado.cantidadDeVacunas = parseInt(cantidad);
			loteProvincialEditado.fechaDeAdquisicion = new Date(fechaadquisicion);
			loteProvincialEditado.idDepositoProvincial = deposito;
			loteProvincialEditado.idLoteProveedor = loteproveedor;
		}
		await loteProvincialEditado.save();

		if(lotepercance == "on"){

			req.body.TipoDeLote = "LoteProvincial";
			req.body.LoteADescartarId = loteprovincialRB;
			req.body.formadescarte = formadescarte;
			req.body.motivodescarte = motivodescarte;
			req.body.cantidadadescartar = cantidad;
			req.body.lotepercance = lotepercance;


			await DescartarLote(req, res);
			
		}
	

		

		res.redirect("/GestionLotesProvincial");
	},
};

async function totalDistribuido(lotesProvinciales) {
	const lotesCentrosuma = await lotecentrodevacunacion.findAll({});
	const lotesdescartados = await descarte.findAll({});

	lotesProvinciales.forEach((loteProvincial) => {
		let Total = 0;
		let descarte = 0;

		Total = loteProvincial.cantidadDeVacunas;

		lotesCentrosuma.forEach((loteCentro) => {

		//	console.log(loteCentro.idLoteProvincial, loteProvincial.id, loteCentro.cantidadDeVacunas);


			if (loteCentro.idLoteProvincial == loteProvincial.id) {
				Total = Total - loteCentro.cantidadDeVacunas;
			}
		});

		//le resto lo que fue descartado
		lotesdescartados.forEach((loteDescarte) => {
			
			if (loteDescarte.idLote == loteProvincial.id && loteDescarte.TipoDeLote == "LoteProvincial") {

				Total = Total - loteDescarte.cantidad;
				descarte = descarte + loteDescarte.cantidad;
			}
		});

		// Agregar la propiedad compraTotal a loteproveedor
		//console.log("Total P:", Total);
		loteProvincial.descarteTotal = descarte;
		loteProvincial.total = Total;
	});
}
module.exports = controllerLoteProvincial;
