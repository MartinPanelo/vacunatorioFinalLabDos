const controllersIndex = {
	CargarVistaHome: async (req, res) => {
		try {
			res.render("index");
		} catch (error) {
			console.log(error);
			res.status(500).render("error" , { error: "500", mensaje: "Error al cargar la vista : "+ error });
		}
	},
};

module.exports = controllersIndex;
