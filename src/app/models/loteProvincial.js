const { sequelize, DataTypes } = require("../conexion"); // Importa la instancia de Sequelize configurada
const { depositoprovincial } = require("./depositoProvincial");
const { loteproveedor } = require("./loteProveedor");

exports.loteprovincial = sequelize.define(
	"loteprovincial",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
/* 		idLote: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}, */
		idDepositoProvincial: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		idLoteProveedor: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		cantidadDeVacunas: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		fechaDeAdquisicion: {
			type: DataTypes.DATE,
			allowNull: true,
		}
	},
	{
		tableName: "loteprovincial", // Nombre de la tabla en la base de datos
		timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
	}
);

/* exports.loteprovincial.belongsTo(lote, { foreignKey: "idLote" }); */
exports.loteprovincial.belongsTo(depositoprovincial, { foreignKey: "idDepositoProvincial" });
exports.loteprovincial.belongsTo(loteproveedor, { foreignKey: "idLoteProveedor" });
//exports.laboratorio.sync({ alter: true });// esto es para pre-produccion
