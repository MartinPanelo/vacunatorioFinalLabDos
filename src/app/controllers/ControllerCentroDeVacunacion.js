const { centrodevacunacion } = require("../models/centroDeVacunacion");
const { ciudad } = require("../models/ciudad");
const { provincia } = require("../models/provincia");

const ControllerCentroDeVacunacion = {
	CargarVistaCentroDeVacunacion: async (req, res) => {
		try {
			const centroDeVacunacion = await centrodevacunacion.findAll({
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
				depositos: centroDeVacunacion,
				tipoDeposito: "Centros de Vacunacion",
				ubicaciones: ubicaciones,
				rutaAction: "CentroDeVacunacion",
				cartel: "Centro de Vacunacion",
			});
		} catch (error) {
			console.error("Error al obtener los datos de los centros de vacunación y ubicaciones:", error);
			res.status(500).render("error" , { error: "500", mensaje: "Error al obtener los datos : "+ error });
		}
	},

	RegistrarCentrosDeVacunacion: async (req, res) => {
		const MensajeToast = {
			estado: true,
			estilo: "",
			titulo: "",
			body: "",
		};
		const { nombreDeposito, correo, direccion, provinciaId, ciudadNombre } = req.body;

		console.log(nombreDeposito, correo, direccion, provinciaId, ciudadNombre);

		async function validarCentrosDeVacunacion() {
			const errores = {};

			if (!nombreDeposito) errores.nombreDeposito = "El nombre es obligatorio.";
			if (!provinciaId) errores.provinciaId = "La provincia es obligatoria.";
			if (!ciudadNombre) errores.ciudadNombre = "La ciudad es obligatoria.";
			if (!direccion) errores.direccion = "La dirección es obligatoria.";
			if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errores.correo = "El correo electrónico no es válido.";

			return errores;
		}

		const errores = validarCentrosDeVacunacion();

		if (Object.keys(errores).length === 0) {
			// No hay errores, entences registro el depossito

			const [ubicacionARegistrar] = await ciudad.findOrCreate({
				where: {
					nombre: ciudadNombre,
					idProvincia: provinciaId,
				},
			});

			const [, resultado] = await centrodevacunacion.findOrCreate({
				where: {
					nombre: nombreDeposito,
					correo: correo,
					direccion: direccion,
					idCiudad: ubicacionARegistrar.id,
				},
			});
			if (resultado) {
				MensajeToast.titulo = "Exito";
				MensajeToast.body = "El centro de vacunacion se registro correctamente";
				MensajeToast.estilo = "bg-success";
			} else {
				//si el deposito ya existe, no se registra

				MensajeToast.titulo = "Error";
				MensajeToast.body = "El centro de vacunacion ya existe por lo que no se registro";
				MensajeToast.estilo = "bg-danger";
			}

			const centroDeVacunacion = await centrodevacunacion.findAll({
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
				depositos: centroDeVacunacion,
				tipoDeposito: "Centros de Vacunacion",
				ubicaciones: ubicaciones,
				rutaAction: "CentroDeVacunacion",
				cartel: "Centro de Vacunacion",
				MensajeToast: MensajeToast,
			});
		} else {
			const centroDeVacunacion = await centrodevacunacion.findAll({
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
			MensajeToast.titulo = "Error";
			MensajeToast.body = "Error al registrar el deposito : " + JSON.stringify(errores);
			MensajeToast.estilo = "bg-danger";
			res.render("Deposito", {
				usuarioLogeado: req.usuarioLogeado.correo,
				depositos: centroDeVacunacion,
				tipoDeposito: "Centros de Vacunacion",
				ubicaciones: ubicaciones,
				rutaAction: "CentroDeVacunacion",
				cartel: "Centro de Vacunacion",
				MensajeToast: MensajeToast,
			});
		}
	},

	EditarCentroDeVacunacion: async (req, res) => {
		const MensajeToast = {
			estado: true,
			estilo: "",
			titulo: "",
			body: "",
		};
		try {
			const { nombreDeposito, correo, direccion, provinciaId, ciudadNombre } = req.body;

			const centroDeVacunacion = await centrodevacunacion.findByPk(req.params.id, {
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
			if (!centroDeVacunacion) {
				MensajeToast.titulo = "Error";
				MensajeToast.body = "El deposito no existe";
				MensajeToast.estilo = "bg-danger";
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

				centroDeVacunacion.nombre = nombreDeposito;
				centroDeVacunacion.correo = correo;
				centroDeVacunacion.direccion = direccion;
				centroDeVacunacion.idCiudad = ubicacionEdit.id;

				// Guardar cambios en la base de datos
				await centroDeVacunacion.save();

				res.redirect("/CentrosDeVacunacion");
			}
		} catch (error) {
			//console.error(error);
			const centroDeVacunacion = await centrodevacunacion.findAll({
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
			MensajeToast.titulo = "Error";
			MensajeToast.body = "Error al registrar el deposito : " + JSON.stringify(error);
			MensajeToast.estilo = "bg-danger";
			res.render("Deposito", {
				usuarioLogeado: req.usuarioLogeado.correo,
				depositos: centroDeVacunacion,
				tipoDeposito: "Centros de Vacunacion",
				ubicaciones: ubicaciones,
				rutaAction: "CentroDeVacunacion",
				cartel: "Centro de Vacunacion",
				MensajeToast:MensajeToast
			});
		}
	},
};

module.exports = ControllerCentroDeVacunacion;
