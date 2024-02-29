const { sequelize, DataTypes } = require("../conexion"); // Importa la instancia de Sequelize configurada

const { usuario } = require("./usuario");

exports.descarte = sequelize.define(
	"descarte",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		idUsuario: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		idLote: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		TipoDeLote: {
			type: DataTypes.ENUM("LoteProveedor", "LoteProvincial", "LoteCentro"),
			allowNull: false,
		},
		formaDeDescarte: {
			type: DataTypes.STRING(300),
			allowNull: false,
		},
		fechaDeDescarte: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		motivo: {
			type: DataTypes.STRING(300),
			allowNull: false,
		},
		cantidad: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: "descarte", // Nombre de la tabla en la base de datos
		timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
	}
);

exports.descarte.belongsTo(usuario, { foreignKey: "idUsuario" });
//exports.descarte.belongsTo(lote, { foreignKey: "idLote" });
//exports.descarte.sync({ alter: true });// esto es para pre-produccion
