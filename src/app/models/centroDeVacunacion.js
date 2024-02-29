const { sequelize, DataTypes } = require("../conexion"); // Importa la instancia de Sequelize configurada
const { ciudad } = require("./ciudad");


exports.centrodevacunacion = sequelize.define(
	"centrodevacunacion",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		idCiudad: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		correo: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		direccion: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
	},
	{
		tableName: "centrodevacunacion", // Nombre de la tabla en la base de datos
		timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
	}
);
exports.centrodevacunacion.belongsTo(ciudad, { foreignKey: "idCiudad" });

//exports.centrodevacunacion.sync({ alter: true });// esto es para pre-produccion
