const { sequelize, DataTypes } = require("../conexion"); // Importa la instancia de Sequelize configurada
const { ciudad } = require("./ciudad");


exports.depositoprovincial = sequelize.define(
	"depositoprovincial",
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
		tableName: "depositoprovincial", // Nombre de la tabla en la base de datos
		timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
	}
);
exports.depositoprovincial.belongsTo(ciudad, { foreignKey: "idCiudad" });

//exports.depositoprovincial.sync({ alter: true });// esto es para pre-produccion
