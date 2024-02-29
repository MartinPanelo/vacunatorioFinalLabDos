const { sequelize, DataTypes } = require("../conexion"); // Importa la instancia de Sequelize configurada
const { ciudad } = require("./ciudad");
const { persona } = require("./persona");

exports.paciente = sequelize.define(
	"paciente",
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
		fechaDeNacimiento: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		telefono: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		genero: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
	},
	{
		tableName: "paciente", // Nombre de la tabla en la base de datos
		timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
	}
);
exports.paciente.belongsTo(ciudad, { foreignKey: "idCiudad" });
exports.paciente.belongsTo(persona, { foreignKey: "idPersona" });

//exports.depositonacional.sync({ alter: true });// esto es para pre-produccion
