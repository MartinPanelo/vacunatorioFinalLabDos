const { persona } = require("../models/persona");
const { paciente } = require("../models/paciente");
const { lotecentrodevacunacion } = require("../models/loteCentroDeVacunacion");

const { descarte } = require("../models/descarte");
const { vacuna } = require("../models/vacuna");
const { enfermero } = require("../models/enfermero");
const { centrodevacunacion } = require("../models/centroDeVacunacion");
const { loteproveedor } = require("../models/loteProveedor");
const { loteprovincial } = require("../models/loteProvincial");
const { registrovacunacion } = require("../models/registroVacunacion");

const { depositoprovincial } = require("../models/depositoProvincial");

const { ciudad } = require("../models/ciudad");
const { provincia } = require("../models/provincia");

const { Op } = require("sequelize");
const { sequelize } = require("../conexion");
const { laboratorio } = require("../models/laboratorio");

const controllerRegistroVacunacion = {
	AplicarVacuna: async (req, res) => {
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
		const Enfermeros = await enfermero.findAll({
			include: persona,
		});

		const {
			nombrePaciente,
			apellidoPaciente,
			DNIPaciente,
			correoPaciente,
			provinciaPaciente,
			ciudadPaciente,
			fechaDeNacimientoPaciente,
			telefonoPaciente,
			generoPaciente,
			idEnfermero, // si el id es "" es un enfermero nuevo
			nombreEnfermero,
			apellidoEnfermero,
			DNIEnfermero,
			correoEnfermero,
			matriculaEnfermero,
			idCentroDeVacunacion,
			idLoteCentroDeVacunacion,
			idLoteProveedor,
			fechaDeAplicacion,
			fechaDeVencimiento,
		} = req.body;

		console.log(
			"Nombre del paciente:",
			nombrePaciente,
			"Apellido del paciente:",
			apellidoPaciente,
			"DNI del paciente:",
			DNIPaciente,
			"Correo electrónico del paciente:",
			correoPaciente,
			"Provincia del paciente:",
			provinciaPaciente,
			"Ciudad del paciente:",
			ciudadPaciente,
			"Fecha de nacimiento del paciente:",
			fechaDeNacimientoPaciente,
			"Teléfono del paciente:",
			telefonoPaciente,
			"Género del paciente:",
			generoPaciente,
			"ID del enfermero:",
			idEnfermero,
			"Nombre del enfermero:",
			nombreEnfermero,
			"Apellido del enfermero:",
			apellidoEnfermero,
			"DNI del enfermero:",
			DNIEnfermero,
			"Correo electrónico del enfermero:",
			correoEnfermero,
			"Matrícula del enfermero:",
			matriculaEnfermero,
			"ID del centro de vacunación:",
			idCentroDeVacunacion,
			"ID del lote del centro de vacunación:",
			idLoteCentroDeVacunacion,
			"ID del lote proveedor:",
			idLoteProveedor,
			"Fecha de aplicación:",
			fechaDeAplicacion,
			"Fecha de vencimiento:",
			fechaDeVencimiento
		);

		//primero ver si hay stock
		await totalDistribuidoC(LotesCentrosDeVacunacion);

		const LotesCentrosDeVacunacionDisponibles = LotesCentrosDeVacunacion.filter((lote) => lote.totalDisponible > 0);


		if (LotesCentrosDeVacunacion.totalDisponible === 0) {
			// NO tengo stock

			res.render("GestionLoteCentroDeVacunacion", {
				usuarioLogeado: req.usuarioLogeado.correo,
				LotesCentrosDeVacunacion: LotesCentrosDeVacunacionDisponibles,
				Vacunas: Vacunas,
				Ubicaciones: Ubicaciones,
				Enfermeros: Enfermeros,
				cartelToast: true,
				mensajeToast: "No hay stock. \n No puede aplicar la vacuna.!!",
			});
		}

		//busco o creo la ubicacion

		const [ProvinciaPaciente] = await provincia.findOrCreate({
			where: {
				id: provinciaPaciente,
			},
		});

		const [UbicacionPaciente] = await ciudad.findOrCreate({
			where: {
				nombre: ciudadPaciente,
				idProvincia: ProvinciaPaciente.id,
			},
		});

		//busco(con su DNI) o creo a la persona y al paciente
		const [PersonaP] = await persona.findOrCreate({
			where: {
				DNI: DNIPaciente,
			},
			defaults: {
				nombre: nombrePaciente,
				apellido: apellidoPaciente,
				DNI: DNIPaciente,
				correo: correoPaciente,
			},
		});
		const [PersonaPaciente] = await paciente.findOrCreate({
			where: {
				idPersona: PersonaP.id,
			},
			defaults: {
				idPersona: PersonaP.id,
				idCiudad: UbicacionPaciente.id,
				fechaDeNacimiento: fechaDeNacimientoPaciente,
				telefono: telefonoPaciente,
				genero: generoPaciente,
			},
		});

		//-
		if (!idEnfermero) {
			const [PersonaE] = await persona.findOrCreate({
				where: {
					DNI: DNIEnfermero,
				},
				defaults: {
					nombre: nombreEnfermero,
					apellido: apellidoPaciente,
					DNI: DNIEnfermero,
					correo: correoEnfermero,
				},
			});
			const [PersonaEnfermero] = await enfermero.findOrCreate({
				where: {
					idPersona: PersonaE.id,
				},
				defaults: {
					idPersona: PersonaE.id,
					matricula: matriculaEnfermero,
				},
			});

			//creo el registro de vacunación

			await registrovacunacion.create({
				idPaciente: PersonaPaciente.id,
				idEnfermero: PersonaEnfermero.id,
				idCentroDeVacunacion: idCentroDeVacunacion,
				idLoteCentroDeVacunacion: idLoteCentroDeVacunacion,
				idLoteProveedor: idLoteProveedor,
				fechaDeAplicacion: fechaDeAplicacion,
			});
		} else {
			await registrovacunacion.create({
				idPaciente: PersonaPaciente.id,
				idEnfermero: idEnfermero,
				idCentroDeVacunacion: idCentroDeVacunacion,
				idLoteCentroDeVacunacion: idLoteCentroDeVacunacion,
				idLoteProveedor: idLoteProveedor,
				fechaDeAplicacion: fechaDeAplicacion,
			});
		}
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

		const lotesProvinciales = await loteprovincial.findAll({
			include: [
				{
					model: loteproveedor,
					required: true,
					include: [{ model: vacuna, required: true }],
				},
				{
					model: depositoprovincial,
				},
			],
		});

		// dependiendo del estado de vencimiento de la vacuna, se muestra un cartel o no.
		if (new Date(fechaDeVencimiento) < new Date()) {
			res.render("GestionLoteCentroDeVacunacion", {
				usuarioLogeado: req.usuarioLogeado.correo,
				LotesCentrosDeVacunacion: LotesCentrosDeVacunacionDisponibles,
				Vacunas: Vacunas,
				Ubicaciones: Ubicaciones,
				Enfermeros: Enfermeros,
				centrosDeVacunacion: centrosDeVacunacion,
				lotesProvinciales: lotesProvinciales,
				cartelToast: true,
				mensajeToast: "Se aplico una vacuna vencida.!!",
			});
		}else{
			res.render("GestionLoteCentroDeVacunacion", {
				usuarioLogeado: req.usuarioLogeado.correo,
				LotesCentrosDeVacunacion: LotesCentrosDeVacunacionDisponibles,
				Vacunas: Vacunas,
				Ubicaciones: Ubicaciones,
				Enfermeros: Enfermeros,
				centrosDeVacunacion: centrosDeVacunacion,
				lotesProvinciales: lotesProvinciales,
				cartelToast: true,
				mensajeToast: "Registro de vacunación exitoso.!!",
			});
		}
	},

	InformePersonasVacunadas: async (req, res) => {
		const { vacunaid, provincia: provinciaRB, ciudad: ciudadRB, centrodevacunacionid, aplicacionvencidas } = req.body;

		console.log(vacunaid, provinciaRB, ciudadRB, centrodevacunacionid, aplicacionvencidas);

		// Verifico si el checkbox está marcado
		var tipoDeAplicacion;
		if (aplicacionvencidas === "on") {
			tipoDeAplicacion = {
				fechaDeAplicacion: {
					[Op.gte]: sequelize.col("loteproveedor.fechaDeVencimiento"), // gte >=  / lt <
				},
			};
		} else {
			tipoDeAplicacion = {};
		}

		// si tengo ciudad entonces no tengo centro de vacunacion y viceversa

		var ubicacionPaciente;

		if (ciudadRB && provinciaRB) {
			const aux = await ciudad.findOne({
				where: {
					idProvincia: provinciaRB,
					nombre: ciudadRB,
				},
			});
			ubicacionPaciente = {
				id: aux.id,
			};
		} else if (provinciaRB) {
			ubicacionPaciente = {
				idProvincia: provinciaRB,
			};
		}

		console.log(ubicacionPaciente);

		const personasVacunadas = await registrovacunacion.findAll({
			required: true,
			include: [
				{
					model: paciente,
					required: true,
					include: [
						{
							model: persona,
							required: true,
						},
						{
							model: ciudad,
							include: [
								{
									model: provincia,
									as: "provincia",
								},
							],
							required: true,
							where: ubicacionPaciente ? ubicacionPaciente : {},
						},
					],
				},
				{
					model: enfermero,
					required: true,
					include: [
						{
							model: persona,
							required: true,
						},
					],
				},
				{
					model: centrodevacunacion,
					required: true,
					where: centrodevacunacionid ? { id: parseInt(centrodevacunacionid) } : {},
				},
				{
					model: lotecentrodevacunacion,
					required: true,
					include: [
						{
							model: loteprovincial,
							required: true,
						},
					],
				},
				{
					model: loteproveedor,
					required: true,
					where: vacunaid ? { idVacuna: parseInt(vacunaid) } : {},
					include: [
						{
							model: vacuna,
							required: true,

							include: [
								{
									model: laboratorio,
									required: true,
								},
							],
						},
					],
				},
			],
			where: tipoDeAplicacion,
		});

		res.render("informePersonasVacunadas", {
			usuarioLogeado: req.usuarioLogeado.correo,
			personasVacunadas: personasVacunadas,
		});
	},
};

async function totalDistribuidoC(loteCentroDeVacunacion) {
	const lotesdescartados = await descarte.findAll({});

	let Total = 0;
	let Descarte = 0;

	Total = loteCentroDeVacunacion.cantidadDeVacunas;

	// restarle aplicadas

	//le resto lo que fue descartado
	lotesdescartados.forEach((loteDescarte) => {
		if (loteDescarte.idLote == loteCentroDeVacunacion.id && loteDescarte.TipoDeLote == "LoteCentroDeVacunacion") {
			Total = Total - loteDescarte.cantidad;
			Descarte = Descarte + loteDescarte.cantidad;
		}
	});

	// Agregar la propiedad compraTotal a loteproveedor
	//console.log("Total P:", Total);
	loteCentroDeVacunacion.descarteTotal = Descarte;
	loteCentroDeVacunacion.totalDisponible = Total;
	//console.log("Total:", loteCentrosDeVacunacion.descarteTotal);
}

/* async function compraTotal(lotesCentrosDeVacunacion) {
	const lotesdescartados = await descarte.findAll({});
	// esta mal no es el total tranferido si no el total disponible
	lotesCentrosDeVacunacion.forEach((loteCentrosDeVacunacion) => {
		let Total = 0;
		let descarte = 0;

		Total = loteCentrosDeVacunacion.cantidadDeVacunas;

		// restarle aplicadas

		//le resto lo que fue descartado
		lotesdescartados.forEach((loteDescarte) => {
			if (loteDescarte.idLote == loteCentrosDeVacunacion.idLote) {
				//console.log("lote:", loteDescarte.cantidad);
				Total = Total - loteDescarte.cantidad;
				descarte = descarte + loteDescarte.cantidad;
			}
		});

		// Agregar la propiedad compraTotal a loteproveedor
		//console.log("Total P:", Total);
		loteCentrosDeVacunacion.descarteTotal = descarte;
		loteCentrosDeVacunacion.totalDisponible = Total;
	});
} */
module.exports = controllerRegistroVacunacion;
