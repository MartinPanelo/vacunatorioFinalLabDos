
const { loteproveedor } = require("../models/loteProveedor");
const { loteprovincial } = require("../models/loteProvincial");
const { lotecentrodevacunacion } = require("../models/loteCentroDeVacunacion");
const { depositonacional } = require("../models/depositoNacional");
const { depositoprovincial } = require("../models/depositoProvincial");
const { vacuna } = require("../models/vacuna");
const { laboratorio } = require("../models/laboratorio");
const { descarte } = require("../models/descarte");

const { registrovacunacion } = require("../models/registroVacunacion");
const { sequelize } = require("../conexion");
const { Op } = require("sequelize");

const { ciudad } = require("../models/ciudad");
const { provincia } = require("../models/provincia");

const controllerLoteProveedor = {
	CargarVistaGestionLotes: async (req, res) => {
		const lotesProveedores = await loteproveedor.findAll({
			include: [
				{
					model: depositonacional,
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

		await TotalDistribuido(lotesProveedores);

		const lotesProveedoresDisponibles = lotesProveedores.filter((lote) => lote.totalDisponible > 0);

		const vacunas = await vacuna.findAll({
			include: [
				{
					model: laboratorio,
				},
			],
		});
		const depositoNacionales = await depositonacional.findAll({
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
		const depositoProvinciales = await depositoprovincial.findAll({
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
		const loteprovinciales = await loteprovincial.findAll({
			include: [
				{
					model: depositoprovincial,
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
				{
					model: loteproveedor,
				},
			],
		});

		res.render("GestionLoteProveedor", {
			usuarioLogeado: req.usuarioLogeado.correo,
			vacunas: vacunas,
			depositoNacionales: depositoNacionales,
			lotesProveedores: lotesProveedoresDisponibles,
			depositoProvinciales: depositoProvinciales,
			loteProvinciales: loteprovinciales,
		});
	},

	CargarVistaGestionLotesFiltro: async (req, res) => {
		const { laboratorioid, fechadesde, fechahasta } = req.body;

		

		const lotesProveedores = await loteproveedor.findAll({
			where: {
				fechaDeCompra: {
					[Op.between]: [fechadesde, fechahasta],
				},
			},
			include: [
				{
					model: depositonacional,
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
				{
					model: vacuna,
					required: true,
					include: [
						{
							model: laboratorio,
							where: {
								nombre: laboratorioid,
							},
						},
					],
				},
			],
		});

		await TotalDistribuido(lotesProveedores);

		const lotesProveedoresDisponibles = lotesProveedores.filter((lote) => lote.totalDisponible > 0);

		const vacunas = await vacuna.findAll({
			include: [
				{
					model: laboratorio,
				},
			],
		});
		const depositoNacionales = await depositonacional.findAll({
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
		const depositoProvinciales = await depositoprovincial.findAll({
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
		const loteprovinciales = await loteprovincial.findAll({
			include: [
				{
					model: depositoprovincial,
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
				{
					model: loteproveedor,
				},
			],
		});

		res.render("GestionLoteProveedor", {
			usuarioLogeado: req.usuarioLogeado.correo,
			vacunas: vacunas,
			depositoNacionales: depositoNacionales,
			lotesProveedores: lotesProveedoresDisponibles,
			depositoProvinciales: depositoProvinciales,
			loteProvinciales: loteprovinciales,
		});
	},

	CrearLoteProveedor: async (req, res) => {
		let lotesProveedores = [];


		try{
			const { idVacuna, cantidad, idDeposito, fechaDeFabricacion, fechaDeVencimiento } = req.body;

			console.log(idVacuna, cantidad, idDeposito, fechaDeFabricacion, fechaDeVencimiento);
			// controlo el formulario
			//...
	
			//creo el loteProveedor
		    lotesProveedores = await loteproveedor.create({
				idDepositoNacional: idDeposito,
				idVacuna: idVacuna,
				fechaDeFabricacion: fechaDeFabricacion,
				fechaDeVencimiento: fechaDeVencimiento,
				fechaDeCompra: new Date(),
				cantidadDeVacunas: cantidad,
				fechaDeAdquisicion: null,
			});

			res.redirect("/GestionLotesProveedor");

			

		}catch(error){
			res.status(500).render("error" , { error: "500", mensaje: "Error al crear el lote : "+ error });
		}
		
	
	},

	EditarLoteProveedor: async (req, res) => {
		try {
			const {
				laboratorio,
				vacunaid,
				cantidad,
				provinciadeposito,
				ciudad,
				depositonacionalnombre,
				fechafabricacion,
				fechavencimiento,
				fechacompra,
				fechaadquisicion,
			} = req.body;

			const loteEditado = await loteproveedor.findByPk(req.params.id, {
				include: [
					{
						model: vacuna,
					},
					{
						model: depositonacional,
					},
				],
			});

			if (loteEditado) {
				console.log("loteEditado");
				loteEditado.idDepositoNacional = depositonacionalnombre;
				loteEditado.idVacuna = vacunaid;
				loteEditado.cantidadDeVacunas = parseInt(cantidad);
				loteEditado.fechaDeFabricacion = fechafabricacion;
				loteEditado.fechaDeVencimiento = fechavencimiento;
				loteEditado.fechaDeCompra = fechacompra;
				if (fechaadquisicion) {
					loteEditado.fechaDeAdquisicion = new Date(fechaadquisicion);
				} else {
					loteEditado.fechaDeAdquisicion = null;
				}

				await loteEditado.save();
				res.redirect("/GestionLotesProveedor");
			} else {
				throw new Error("Lote no encontrado");
			}

			//  console.log(loteEditado);
		} catch (error) {
			console.log(error);
			res.redirect("/GestionLotesProveedor");
		}
	},

	InformeLoteProveedor: async (req, res) => {
		const { lotesVencidos } = req.body;

		const lotesProveedoresTotal = await loteproveedor.findAll({
			include: [
				{
					model: depositonacional,
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

		const lotesprovinciales = await loteprovincial.findAll({});
		const lotesCentroDeVacunacion = await lotecentrodevacunacion.findAll({});

		await TotalDistribuido(lotesProveedoresTotal);
		await totalDistribuidoP(lotesprovinciales);
		await totalDistribuidoC(lotesCentroDeVacunacion);

		lotesProveedoresTotal.forEach((lote) => {
			let cantidadProvincia = 0;
			let cantidadCentroDeVacunacion = 0;
			let cantidadEndistribucion = 0;
			lote.totalAplicadas = 0;
			lote.descarteLoteProveedor = lote.descarteTotal;
			lote.descarteLoteProvincial = 0;
			lote.descarteLoteCentroDeVacunacion = 0;
			lote.totalVencido = 0;
			if (lote.fechaDeAdquisicion !== null) {
				lotesprovinciales.forEach((loteProvincia) => {
					if (loteProvincia.idLoteProveedor == lote.id) {
						lote.descarteTotal = lote.descarteTotal + loteProvincia.descarteTotal;
						lote.descarteLoteProvincial = lote.descarteLoteProvincial + loteProvincia.descarteTotal;
						if (loteProvincia.fechaDeAdquisicion !== null) {
							cantidadProvincia = cantidadProvincia + loteProvincia.totalComprado;
							lotesCentroDeVacunacion.forEach((loteCentro) => {
								if (loteCentro.idLoteProvincial == loteProvincia.id) {
									lote.descarteTotal = lote.descarteTotal + loteCentro.descarteTotal;
									lote.descarteLoteCentroDeVacunacion = lote.descarteLoteCentroDeVacunacion + loteCentro.descarteTotal;
									if (loteCentro.fechaDeAdquisicion !== null) {
										cantidadCentroDeVacunacion = cantidadCentroDeVacunacion + loteCentro.totalDisponible;
									} else {
										cantidadEndistribucion = cantidadEndistribucion + loteCentro.totalDisponible;
									}

									lote.totalAplicadas = loteCentro.totalAplicadas;
								}
							});
						} else {
							cantidadEndistribucion = cantidadEndistribucion + loteProvincia.totalComprado;
						}
					}
				});
			} else {
				cantidadEndistribucion = lote.cantidadDeVacunas;
			}

			lote.cantidadEndistribucion = cantidadEndistribucion;
			lote.cantidadCentroDeVacunacion = cantidadCentroDeVacunacion;
			lote.cantidadProvincia = cantidadProvincia;
			if (new Date(lote.fechaDeVencimiento) <= new Date()) {
				lote.totalVencido = lote.cantidadProvincia + lote.cantidadCentroDeVacunacion + lote.totalDisponible;
			}
		});

		const resultado =
			lotesVencidos === "on" ? lotesProveedoresTotal.filter((lote) => lote.totalVencido > 0) : lotesProveedoresTotal;

		res.render("InformeLoteProveedor", {
			usuarioLogeado: req.usuarioLogeado.correo,
			lotesProveedoresTotal: resultado,
		});
	},
};

async function TotalDistribuido(lotesProveedores) {
	//--------------------------------------
	const lotesProvinciasuma = await loteprovincial.findAll({});

	const lotesdescartados = await descarte.findAll({});

	lotesProveedores.forEach((loteproveedor) => {
		let Total = 0;
		let descarte = 0;

		Total = loteproveedor.cantidadDeVacunas;
		//le resto lo que fue distribuido a las provincias
		lotesProvinciasuma.forEach((loteProvincia) => {
			if (loteProvincia.idLoteProveedor == loteproveedor.id) {
				Total = Total - loteProvincia.cantidadDeVacunas;
			}
		});

		//le resto lo que fue descartado
		lotesdescartados.forEach((loteDescarte) => {
			if (loteDescarte.idLote == loteproveedor.id && loteDescarte.TipoDeLote == "LoteProveedor") {
				//console.log("lote:", loteDescarte.cantidad);
				Total = Total - loteDescarte.cantidad;
				descarte = descarte + loteDescarte.cantidad;
			}
		});
		loteproveedor.descarteTotal = descarte;
		loteproveedor.totalDisponible = Total;

		//console.log("Total:",loteproveedor.totalDisponible);
	});
}

async function totalDistribuidoP(lotesProvinciales) {
	const lotesCentrosuma = await lotecentrodevacunacion.findAll({});
	const lotesdescartados = await descarte.findAll({});

	lotesProvinciales.forEach((loteProvincial) => {
		let Total = 0;
		let descarte = 0;

		Total = loteProvincial.cantidadDeVacunas;

		lotesCentrosuma.forEach((loteCentro) => {
			if (loteCentro.idLoteProvincial == loteProvincial.id) {
				Total = Total - loteCentro.cantidadDeVacunas;
			}
		});

		//le resto lo que fue descartado
		lotesdescartados.forEach((loteDescarte) => {
			if (loteDescarte.idLote == loteProvincial.id  && loteDescarte.TipoDeLote == "LoteProvincial") {
				Total = Total - loteDescarte.cantidad;
				descarte = descarte + loteDescarte.cantidad;
			}
		});

		// Agregar la propiedad compraTotal a loteproveedor
		//console.log("Total P:", Total);
		loteProvincial.descarteTotal = descarte;
		loteProvincial.totalComprado = Total;
	});
}

async function totalDistribuidoC(lotesCentrosDeVacunacion) {
	const lotesdescartados = await descarte.findAll({

	});
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
			if (loteDescarte.idLote == loteCentrosDeVacunacion.idLote  && loteDescarte.TipoDeLote == "LoteCentroDeVacunacion") {
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

module.exports = controllerLoteProveedor;
