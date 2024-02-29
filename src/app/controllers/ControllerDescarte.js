const { descarte } = require("../models/descarte");
const { loteproveedor } = require("../models/loteProveedor");
const { loteprovincial } = require("../models/loteProvincial");
const { lotecentrodevacunacion } = require("../models/loteCentroDeVacunacion");
const { usuario } = require("../models/usuario");
const { depositonacional } = require("../models/depositoNacional");
const { vacuna } = require("../models/vacuna");
const { laboratorio } = require("../models/laboratorio");
const { depositoprovincial } = require("../models/depositoProvincial");
const { centrodevacunacion } = require("../models/centroDeVacunacion");
const { registrovacunacion } = require("../models/registroVacunacion")

const { persona } = require("../models/persona")
const { enfermero } = require("../models/enfermero")

const { ciudad } = require("../models/ciudad");
const { provincia } = require("../models/provincia");

const { sequelize } = require("../conexion");
const { Op } = require("sequelize");

const controllerDescarte = {
	VacunasDescartadasLoteProveedor: async (req, res) => {
		//descarte nacional
		const lotesDescartados = await descarte.findAll({
			include: [
				{
					model: usuario,
					attributes: ["correo", "rol"],
				},
			],
		});
		const loteProveedores = await loteproveedor.findAll({
			include: [
				{
					model: depositonacional,
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
		const lotesProveedoresConDescarte = [];

		lotesDescartados.forEach((loteDescarte) => {
			loteProveedores.forEach((loteP) => {
				if (loteP.id == loteDescarte.idLote && loteDescarte.TipoDeLote == "LoteProveedor") {
					lotesProveedoresConDescarte.push({
						descarte: loteDescarte,
						deposito: loteP.depositonacional,
						id: loteP.id,
						vacuna: loteP.vacuna,
					});
				}
			});
		});


		//descarte provincial
		//descarte de centro de vacunacion

		res.render("InformeVacunasDescarte", {
			usuarioLogeado: req.usuarioLogeado.correo,
			lotesConDescarte: lotesProveedoresConDescarte,
			TituloLotes: "Lotes Proveedores",
		});
	},

	VacunasDescartadasLoteProvincial: async (req, res) => {
		const lotesDescartados = await descarte.findAll({
			include: [
				{
					model: usuario,
					attributes: ["correo", "rol"],
				},
			],
		});
		const lotesProvinciales = await loteprovincial.findAll({
			include: [
				{
					model: depositoprovincial,
				},
				{
					model: loteproveedor,
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
				},
			],
		});
		const lotesProvincialesConDescarte = [];

		lotesDescartados.forEach((loteDescarte) => {
			lotesProvinciales.forEach((loteP) => {
				if (loteP.id == loteDescarte.idLote  && loteDescarte.TipoDeLote == "LoteProvincial") {
					lotesProvincialesConDescarte.push({
						descarte: loteDescarte,
						deposito: loteP.depositoprovincial,
						id: loteP.id,
						vacuna: loteP.loteproveedor.vacuna,
					});
				}
			});
		});

		res.render("InformeVacunasDescarte", {
			usuarioLogeado: req.usuarioLogeado.correo,
			lotesConDescarte: lotesProvincialesConDescarte,
			TituloLotes: "Lotes Provinciales",
		});
	},

	VacunasDescartadasLoteCentroDeVacunacion: async (req, res) => {
		const lotesDescartados = await descarte.findAll({
			include: [
				{
					model: usuario,
					attributes: ["correo", "rol"],
				},
			],
		});
		const lotesCentrosDevacunacion = await lotecentrodevacunacion.findAll({
			include: [
				{
					model: centrodevacunacion,
				},
				{
					model: loteprovincial,
					include: [
						{
							model: loteproveedor,
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
						},
					],
				},
			],
		});
		const lotesProvincialesConDescarte = [];

		lotesDescartados.forEach((loteDescarte) => {
			lotesCentrosDevacunacion.forEach((loteC) => {
				if (loteC.id == loteDescarte.idLote  && loteDescarte.TipoDeLote == "LoteCentroDeVacunacion") {
					lotesProvincialesConDescarte.push({
						descarte: loteDescarte,
						deposito: loteC.centrodevacunacion,
						id: loteC.id,
						vacuna: loteC.loteprovincial.loteproveedor.vacuna,
					});
				}
			});
		});

		res.render("InformeVacunasDescarte", {
			usuarioLogeado: req.usuarioLogeado.correo,
			lotesConDescarte: lotesProvincialesConDescarte,
			TituloLotes: "Lotes de centros de vacunacion",
		});
	},

	DescartarLote: async (req, res) => {
		
		const MensajeToast = {
			estado: true,
			estilo: "",
			titulo: "",
			body: "",
		};

		const {TipoDeLote, LoteADescartarId, formadescarte, motivodescarte, cantidadadescartar,lotepercance } = req.body;

		console.log(TipoDeLote, LoteADescartarId, formadescarte, motivodescarte, cantidadadescartar,lotepercance);
		var loteAux;
	
		if(TipoDeLote == "LoteProveedor"){
			loteAux = await loteproveedor.findByPk(LoteADescartarId);
		}else if(TipoDeLote == "LoteProvincial"){
			loteAux = await loteprovincial.findByPk(LoteADescartarId);
		}else if(TipoDeLote == "LoteCentroDeVacunacion"){
			loteAux = await lotecentrodevacunacion.findByPk(LoteADescartarId);
		}

		if (loteAux == null) {
			MensajeToast.estilo = "bg-danger";
			MensajeToast.titulo = "Error";
			MensajeToast.body = "No se encontro el lote";
			res.status(500).render("error" , { error: "500", mensaje: "No se encontro el lote : "+ error });
			return;
		} else {
			const loteDescartado = await descarte.create({
				idUsuario: req.usuarioLogeado.id,
				idLote: parseInt(LoteADescartarId),
				fechaDeDescarte: new Date().toISOString().split("T")[0],
				formaDeDescarte: formadescarte,
				motivo: motivodescarte,
				cantidad: cantidadadescartar,
				TipoDeLote: TipoDeLote
			});
			if (loteDescartado) {
				MensajeToast.estilo = "bg-success";
				MensajeToast.titulo = "exito!";
				MensajeToast.body = "El descarte de :"+ cantidadadescartar + " vacunas fue exitoso";
			}
		}
		// si es de descarte por percance 

		if(lotepercance == "on"){

			return;

		}


		// tengo que ver que tipo de lote es, usando la id de loteAux(lote)



		if(TipoDeLote == "LoteProveedor"){
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
				MensajeToast: MensajeToast,
				
			});
			return;

		}else if(TipoDeLote == "LoteProvincial"){
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
	
			await TotalDistribuidoP(LotesProvinciales);
	
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
				LotesProvinciales: LotesProvinciales,
				centrosDeVacunacion: centrosDeVacunacion,
				depositosProvinciales: depositosProvinciales,
				lotesProveedores: lotesProveedores,
				MensajeToast: MensajeToast,
			});
			
		}else if(TipoDeLote == "LoteCentroDeVacunacion"){
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
			await TotalDistribuidoC(LotesCentrosDeVacunacion);
	
			res.render("GestionLoteCentroDeVacunacion", {
				usuarioLogeado: req.usuarioLogeado.correo,
				LotesCentrosDeVacunacion: LotesCentrosDeVacunacion,
				Vacunas: Vacunas,
				Ubicaciones: Ubicaciones,
				Enfermeros: Enfermeros,
				centrosDeVacunacion: centrosDeVacunacion,
				lotesProvinciales: lotesProvinciales,
				MensajeToast: MensajeToast,
			});
		}


		

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
async function TotalDistribuidoP(lotesProvinciales) {
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
async function TotalDistribuidoC(lotesCentrosDeVacunacion) {
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



module.exports = controllerDescarte;
