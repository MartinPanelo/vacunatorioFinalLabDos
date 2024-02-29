const { sequelize, DataTypes } = require("../conexion"); // Importa la instancia de Sequelize configurada

exports.persona = sequelize.define(
	"persona",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		apellido: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		DNI: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		correo: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
	},
	{
		tableName: "persona", // Nombre de la tabla en la base de datos
		timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
	}
);
//exports.persona.sync({ alter: true });// esto es para pre-produccion
