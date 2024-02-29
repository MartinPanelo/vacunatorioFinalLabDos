const { vacuna } = require("../models/vacuna");
const { laboratorio } = require("../models/laboratorio");
const { provincia } = require("../models/provincia");
const { ciudad } = require("../models/ciudad");
const { depositonacional } = require("../models/depositoNacional");




const controllerVacuna = {
	CargarVistaGestionVacunas: async (req, res) => {

		let vacunas = [];
		let DepositosNacionales = [];

		const MensajeToast = {
			estado: true,
			estilo: "",
			titulo: "",
			body: "",
		};

		try{
			vacunas = await vacuna.findAll({
				include: laboratorio,
			});
			DepositosNacionales = await depositonacional.findAll({
				include :[
					{
						model: ciudad,
						include: [
							{
								model : provincia,
								as : "provincia"
							}
						]
					}
				]
	
			});
			res.render("GestionVacunas", {
				usuarioLogeado: req.usuarioLogeado.correo,
				usuariorol: req.usuarioLogeado.rol,
				vacunas: vacunas,
				DepositosNacionales: DepositosNacionales,
			});
		}catch(e){

			MensajeToast.estado = true;
			MensajeToast.estilo = "bg-warning";
			MensajeToast.titulo = "Error al procesar la solicitud";
			MensajeToast.body = e;

			res.render("GestionVacunas", {
				usuarioLogeado: req.usuarioLogeado.correo,
				vacunas: vacunas,
				DepositosNacionales: DepositosNacionales,
				MensajeToast: MensajeToast,
			});
		}

		

		
	},
	RegistrarVacuna: async (req, res) => {
		const { tipo, nombreVacuna, pais, nombreLaboratorio, correo, direccion } = req.body;
		let mensajeToast = "";
		console.log(tipo, nombreVacuna, pais, nombreLaboratorio, correo, direccion);

		function validarForm() {
			const errores = {};

			if (!tipo) errores.tipo = "El tipo de vacuna es obligatorio.";
			if (!nombreVacuna) errores.nombreVacuna = "El nombre de la vacuna es obligatorio.";
			if (!pais) errores.pais = "El país es obligatorio.";
			if (!nombreLaboratorio) errores.nombreLaboratorio = "El nombre del laboratorio es obligatorio.";
			if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errores.correo = "El correo electrónico no es válido.";
			if (!direccion) errores.direccion = "La dirección es obligatoria.";

			return errores;
		}

		const errores = validarForm();

		
		const DepositosNacionales = await depositonacional.findAll({
			include :[
				{
					model: ciudad,
					include: [
						{
							model : provincia,
							as : "provincia"
						}
					]
				}
			]
		});

		//console.log(vacunas);
		if (Object.keys(errores).length === 0) {
			// No hay errores, se puedes procesar la vacuna

			const [laboratorioARegistrar] = await laboratorio.findOrCreate({
				where: { nombre: nombreLaboratorio, correo, direccion },
			});

			//console.log(laboratorioARegistrar.id);

			const vacunaAux = await vacuna.findOne({
				where: {
					tipoDeVacuna: tipo,
					nombreComercial: nombreVacuna,
					paisDeOrigen: pais,
					idLaboratorio: laboratorioARegistrar.id,
				},
			});

			if (!vacunaAux) {
				// la vacuna no existe, entonces la creo
				vacunaARegistrar = await vacuna.create({
					tipoDeVacuna: tipo,
					nombreComercial: nombreVacuna,
					paisDeOrigen: pais,
					idLaboratorio: laboratorioARegistrar.id,
				});
				mensajeToast = "La vacuna se registro correctamente";
			} else {
				//si la vacuna ya existe, no se registra
				mensajeToast = "La vacuna ya existe por lo que no se registro";
			}
			const vacunas = await vacuna.findAll({
				include: laboratorio,
			});
			res.render("GestionVacunas", {
				usuarioLogeado: req.usuarioLogeado.correo,
				vacunas: vacunas,
				DepositosNacionales: DepositosNacionales,
				cartelToast: true,
				mensajeToast: mensajeToast,
			});
		} else {
			const vacunas = await vacuna.findAll({
				include: laboratorio,
			});
			// Hay errores, los mando al front
			res.render("GestionVacunas", {
				usuarioLogeado: req.usuarioLogeado.correo,
				vacunas: vacunas,
				depositosNacionales: DepositosNacionales,
				cartelToast: true,
				mensajeToast: "Error al registrar la vacuna, revise los siguientes campos: \n" + JSON.stringify(errores),
			});
		}
	},
	EditarVacuna: async (req, res) => {
		try {
			const { tipo, nombreVacuna, pais, nombreLaboratorio, correo, direccion } = req.body;
			const vacunaEditada = await vacuna.findByPk(req.params.id, { include: laboratorio });
			if (!vacunaEditada) {
				throw new Error("Vacuna no encontrada");
			}

			function validarVacuna() {
				const errores = {};
				if (!nombreVacuna) errores.nombreVacuna = "El nombre de la vacuna es obligatorio.";
				if (!pais) errores.pais = "El pais es obligatorio.";
				if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errores.correo = "El correo electrónico no es válido.";
				if (!direccion) errores.direccion = "La dirección es obligatoria.";
				return errores;
			}

			const errores = validarVacuna();

			if (Object.keys(errores).length === 0) {
				// Actualización de datos
				vacunaEditada.nombreComercial = nombreVacuna;
				vacunaEditada.paisDeOrigen = pais;
				vacunaEditada.tipoDeVacuna = tipo;

				const laboratorioEditado = vacunaEditada.laboratorio;
				laboratorioEditado.correo = correo;
				laboratorioEditado.direccion = direccion;
				laboratorioEditado.nombre = nombreLaboratorio;

				// Guardar cambios en la base de datos
				await vacunaEditada.save();
				await laboratorioEditado.save();
			}

			// Obtener la lista de vacunas
			//const vacunas = await vacuna.findAll({ include: laboratorio });

			res.redirect("/GestionVacunas");
		} catch (error) {
			//console.error(error);
			const vacunas = await vacuna.findAll({ include: laboratorio });
			res.render("GestionVacunas", {
				usuarioLogeado: req.usuarioLogeado.correo,
				vacunas: vacunas,
				cartelToast: true,
				mensajeToast: "Error al editar la vacuna, revise los siguientes campos: \n" + JSON.stringify(error),
			});
		}
	},


};

module.exports = controllerVacuna;
