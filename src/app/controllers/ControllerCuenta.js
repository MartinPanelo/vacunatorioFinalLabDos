const { usuario } = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const cookie = require("cookie");


const controllerCuenta = {
	CargarVistaLogin: async (req, res) => {
		//   res.render('index', { title: 'Express' });

		try {
			// Realizar la consulta a la base de datos
			const usuarios = await usuario.findAll();

			// Pasar los resultados a la vista
			console.log("Usuarios:", typeof usuarios);
			res.render("Login", { title: "Express", usuarios: usuarios });
		} catch (error) {
			console.error("Error al consultar la base de datos:", error);
			res.status(500).send("Error interno del servidor");
		}
	},

	CargarVistaRegistro: async (req, res) => {
		try {
			res.render("Registro");
		} catch (error) {
			res.status(500).send("Error interno del servidor");
		}
	},

	RegistrarUsuario: async (req, res) => {
		const datosRegistro = req.body;

		console.log("DATOS RECIBIDOS: ", datosRegistro);

		const flag = true;

		const nombreRegex = /^[a-zA-Z]+$/;
		const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const contraseniaRegex = /^[a-zA-Z0-9]{6,10}$/;

		// Validar que el nombre contenga solo letras
		if (!nombreRegex.test(datosRegistro.nombre) || datosRegistro.nombre === "") {
			flag = false;
		}

		// Validar que el apellido contenga solo letras
		if (!nombreRegex.test(datosRegistro.apellido) || datosRegistro.apellido === "") {
			flag = false;
		}

		// Validar que el correo tenga la forma mail@mail.com
		if (!correoRegex.test(datosRegistro.correo) || datosRegistro.correo === "") {
			flag = false;
		}

		// Validar la contraseña
		if (!contraseniaRegex.test(datosRegistro.contrasenia) || datosRegistro.contrasenia === "") {
			flag = false;
		}

		if (flag) {
			try {
				//revisar si el usuario ya existe
				const usuarioExistente = await usuario.findOne({ where: { correo: datosRegistro.correo } });
				if (usuarioExistente) {
					res.render("Registro", { resultado: "usuario ya existe" });
				} else {
					//hashear la contrasenia
					const contraseniaHasheada = await bcryptjs.hash(datosRegistro.contrasenia, 10);

					//crear el usuario
					await usuario.create({
						nombre: datosRegistro.nombre,
						apellido: datosRegistro.apellido,
						correo: datosRegistro.correo,
						contrasenia: contraseniaHasheada,
						rol: "Sin rol",
					});

					res.render("Login", { registroExitoso: true });
				}
			} catch (error) {
				res.render("Registro", { resultado: error });
			}
		} else {
			res.render("Registro", { resultado: "Error en el registro" });
		}
	},

	LogearUsuario: async (req, res) => {
		const body = req.body;

		//console.log(body.correo);
		//////////////////
		const datosLogeo = req.body;
		/*  console.log(datosLogeo); */
		const userLogin = await usuario.findOne({ where: { correo: datosLogeo.correo } });

		if (userLogin == null) {
			res.render("Login", { resultado: "Usuario no encontrado" });
		} else {
			let pass = await bcryptjs.compare(datosLogeo.contrasenia, userLogin.contrasenia);

			if (pass) {
				//generar token
				
				const token = jwt.sign({ id: userLogin.id }, "SegmentationFault", { expiresIn: "10h" });

				//  res.render("index", { token: token });
				//const usuarios = await usuario.findAll();

				res.cookie("jwt", token);
				//res.render("gestionCuentas", { usuarios: usuarios , usuarioLogeado: userLogin.correo, usuariorol: userLogin.rol });
				res.redirect("gestionCuentas");
			} else {
				res.render("Login", { resultado: "Usuario incorrecto" });
			}
		}
		//////////////////////
	},

	CargarVistaGestionCuentas: async (req, res) => {
		try {
				const usuarios = await usuario.findAll();
		//	const usuarioLogeado = await usuario.findOne({ where: { correo: req.usuarioLogeado } });
			const usuarioLogeado = req.usuarioLogeado;
				res.render("gestionCuentas", { usuarios: usuarios, usuarioLogeado: usuarioLogeado.correo, usuariorol: usuarioLogeado.rol });
				
			} catch (error) {
			console.error("Error al cargar la vista de gestión de cuentas:", error);
			res.status(500).send("Error interno del servidor");
		}
	},

	CerrarSesion: async (req, res) => {
		try {
			res.clearCookie("jwt");
			res.redirect("Login");
		} catch (error) {
			console.error("Error al cerrar la sesión:", error);
			res.status(500).send("Error interno del servidor");
		}
	},


	CambiarRol: async (req, res) => {
		//console.log(body,req.usuarioLogeado);
		console.log("entro a cambiar rol");
		const body = req.body;

		const usuarioActualizar = await usuario.findByPk(body.userId);

		if (!usuarioActualizar) {
		return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		// Actualizar el rol
		usuarioActualizar.rol = body.RolNuevo;

		// Guardar los cambios en la base de datos
		await usuarioActualizar.save();
	//	const usuarios = await usuario.findAll();
		//res.render("gestionCuentas", { usuarios: usuarios, usuarioLogeado: req.usuarioLogeado.correo, usuariorol: req.usuarioLogeado.rol });
		res.redirect("gestionCuentas");
	}

};

module.exports = controllerCuenta;
