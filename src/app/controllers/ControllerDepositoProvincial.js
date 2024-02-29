const { depositoprovincial } = require("../models/depositoProvincial");
const { ciudad } = require("../models/ciudad");
const { provincia } = require("../models/provincia");

const controllerDepositoProvincial = {
	CargarVistaDeposito: async (req, res) => {
		const depositoProvincial = await depositoprovincial.findAll({
			include: [
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
		const ubicaciones = await ciudad.findAll({
			include: [
				{
					model: provincia,
					as : "provincia"
				},
			],
		});

		res.render("Deposito", {
			usuarioLogeado: req.usuarioLogeado.correo,
			depositos: depositoProvincial,
			tipoDeposito: "Depositos Provinciales",
			ubicaciones: ubicaciones,
			rutaAction: "DepositoProvincial",
			cartel: "Deposito Provincial",
		});
	},
	RegistrarDepositoProvincial: async (req, res) => {
		let mensajeToast = "";
		const { nombreDeposito, correo, direccion, provinciaId, ciudadNombre } = req.body;

		async function validarDeposito() {
			const errores = {};

			if (!nombreDeposito) errores.nombre = "El nombre es obligatorio.";
			if (!provinciaId) errores.provincia = "La provincia es obligatoria.";
			if (!ciudadNombre) errores.ciudad = "La ciudad es obligatoria.";
			if (!direccion) errores.direccion = "La dirección es obligatoria.";
			if (!correo) errores.correo = "El correo electrónico no es válido.";

			return errores;
		}

		const errores = validarDeposito();

		if (Object.keys(errores).length === 0) {
			// No hay errores, entences registro el depossito

			const [ubicacionARegistrar] = await ciudad.findOrCreate({
				where: {
					nombre: ciudadNombre,
					idProvincia: provinciaId,
				},
			});
			

			const [, resultado] = await depositoprovincial.findOrCreate({
				where: {
					nombre: nombreDeposito,
					correo: correo,
					direccion: direccion,
					idCiudad: ubicacionARegistrar.id,
				},
			});

			if (resultado) {
				mensajeToast = "El deposito se registro correctamente";
			} else {
				//si el deposito ya existe, no se registra
				mensajeToast = "El deposito ya existe por lo que no se registro";
			}

			const depositos = await depositoprovincial.findAll({
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
			const ubicaciones = await ciudad.findAll({
				include: [
					{
						model: provincia,
						as: "provincia",
					},
				],
			});
			//res.redirect("DepositosProvinciales");
			res.render("Deposito", {
				usuarioLogeado: req.usuarioLogeado.correo,
				depositos: depositos,
				tipoDeposito: "Depositos Provinciales",
				ubicaciones: ubicaciones,
				rutaAction: "DepositoProvincial",
				cartel: "Deposito Provincial",
				mensajeToast: mensajeToast,
			});
		} else {
			// Hay errores, los mando al front
			const depositos = await depositoprovincial.findAll({
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
			const ubicaciones = await ciudad.findAll({
				include: [
					{
						model: provincia,
						as: "provincia",
					},
				],
			});
			res.render("Deposito", {
				usuarioLogeado: req.usuarioLogeado.correo,
				depositos: depositos,
				tipoDeposito: "Depositos Provinciales",
				ubicaciones: ubicaciones,
				rutaAction: "DepositoProvincial",
				cartel: "Deposito Provincial",
				mensajeToast: "Error al registrar el deposito, revise los siguientes campos: \n" + errores,
			});
		}
	},

	EditarDepositoProvincial: async (req, res) => {
		try {			
			const { nombreDeposito, correo, direccion, provinciaId, ciudadNombre } = req.body;


			const depositoEditado = await depositoprovincial.findByPk(req.params.id, {
				include: {
					model: ciudad,
					include: [
						{
							model: provincia,
							as: "provincia",
						},
					],
				},
			});
			if (!depositoEditado) {
				throw new Error("Deposito no encontrado");
			}

			function validarForm() {
				const errores = {};
				if (!nombreDeposito) errores.nombre = "El nombre es obligatorio.";
				if (!provinciaId) errores.provincia = "La provincia es obligatoria.";
				if (!ciudadNombre) errores.ciudad = "La ciudad es obligatoria.";
				if (!direccion) errores.direccion = "La dirección es obligatoria.";
				if (!correo) errores.correo = "El correo electrónico no es válido.";

				return errores;
			}

			const errores = validarForm();

			if (Object.keys(errores).length === 0) {


				// Actualización de datos
				const [ubicacionEdit] = await ciudad.findOrCreate({
					where: {
						nombre: ciudadNombre,
						idProvincia: provinciaId,
					},
				});


				depositoEditado.nombre = nombreDeposito;
				depositoEditado.correo = correo;
				depositoEditado.direccion = direccion;
				depositoEditado.idCiudad = ubicacionEdit.id;


				// Guardar cambios en la base de datos
				await depositoEditado.save();
				res.redirect("/DepositosProvinciales");
			}



			
		} catch (error) {
			console.error(error);
			const depositos = await depositoprovincial.findAll({
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
			const ubicaciones = await ciudad.findAll({
				include: [
					{
						model: provincia,
						as: "provincia",
					},
				],
			});
			res.render("Deposito", {
				usuarioLogeado: req.usuarioLogeado.correo,
				depositos: depositos,
				tipoDeposito: "Depositos Provinciales",
				ubicaciones: ubicaciones,
				rutaAction: "DepositoProvincial",
				cartel: "Deposito Provincial",
				mensajeToast: "Error al registrar el deposito, revise los siguientes campos: \n" + error,
			});
		}
	},
};


module.exports = controllerDepositoProvincial;
