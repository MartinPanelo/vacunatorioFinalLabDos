const { sequelize, DataTypes } = require("../conexion"); // Importa la instancia de Sequelize configurada
const { provincia } = require("./provincia");

exports.ciudad = sequelize.define(
	"ciudad",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		idProvincia: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
	},
	{
		tableName: "ciudad", // Nombre de la tabla en la base de datos
		freezeTableName: true, // Para evitar que Sequelize cambie el nombre de la tabla
		timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
	}
);
exports.ciudad.belongsTo(provincia, {
	foreignKey: 'idProvincia',
	as: 'provincia',
  });
//exports.ciudad.sync({ alter: true });// esto es para pre-produccion
