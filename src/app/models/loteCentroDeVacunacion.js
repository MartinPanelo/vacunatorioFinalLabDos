const { sequelize, DataTypes } = require("../conexion"); // Importa la instancia de Sequelize configurada

const { loteprovincial } = require("./loteProvincial");
const { centrodevacunacion } = require("./centroDeVacunacion");

exports.lotecentrodevacunacion = sequelize.define(
	"lotecentrodevacunacion",
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
		idCentroDeVacunacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		idLoteProvincial: {
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
		tableName: "lotecentrodevacunacion", // Nombre de la tabla en la base de datos
		timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
	}
);

/* exports.lotecentrodevacunacion.belongsTo(lote, { foreignKey: "idLote" }); */
exports.lotecentrodevacunacion.belongsTo(centrodevacunacion, { foreignKey: "idCentroDeVacunacion" });
exports.lotecentrodevacunacion.belongsTo(loteprovincial, { foreignKey: "idLoteProvincial" });
//exports.laboratorio.sync({ alter: true });// esto es para pre-produccion
