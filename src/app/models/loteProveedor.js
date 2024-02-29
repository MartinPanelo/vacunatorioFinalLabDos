const { sequelize, DataTypes } = require("../conexion"); // Importa la instancia de Sequelize configurada
const { depositonacional } = require("./depositoNacional");
const { vacuna } = require("./vacuna");

exports.loteproveedor = sequelize.define(
	"loteproveedor",
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
		idDepositoNacional: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		idVacuna: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		cantidadDeVacunas: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		fechaDeFabricacion: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		fechaDeVencimiento: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		fechaDeCompra: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		fechaDeAdquisicion: {
			type: DataTypes.DATE,
			allowNull: true,
		}
	},
	{
		tableName: "loteproveedor", // Nombre de la tabla en la base de datos
		timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
	}
);

exports.loteproveedor.belongsTo(vacuna, { foreignKey: "idVacuna" });
exports.loteproveedor.belongsTo(depositonacional, { foreignKey: "idDepositoNacional" });
/* exports.loteproveedor.belongsTo(lote, { foreignKey: "idLote" }); */
//exports.laboratorio.sync({ alter: true });// esto es para pre-produccion
