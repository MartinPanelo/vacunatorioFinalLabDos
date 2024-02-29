const { sequelize, DataTypes } = require("../conexion"); // Importa la instancia de Sequelize configurada
const { loteproveedor } = require("./loteProveedor");
const { paciente } = require("./paciente");
const { enfermero } = require("./enfermero");
const { centrodevacunacion } = require("./centroDeVacunacion");
const { lotecentrodevacunacion } = require("./loteCentroDeVacunacion");

exports.registrovacunacion = sequelize.define(
	"registrovacunacion",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		idPaciente: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		idEnfermero: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		idCentroDeVacunacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		idLoteCentroDeVacunacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        idLoteProveedor: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        fechaDeAplicacion: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		tableName: "registrovacunacion", // Nombre de la tabla en la base de datos
		timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
	}
);
exports.registrovacunacion.belongsTo(paciente, { foreignKey: "idPaciente" });
exports.registrovacunacion.belongsTo(enfermero, { foreignKey: "idEnfermero" });
exports.registrovacunacion.belongsTo(centrodevacunacion, { foreignKey: "idCentroDeVacunacion" });
exports.registrovacunacion.belongsTo(lotecentrodevacunacion, { foreignKey: "idLoteCentroDeVacunacion" });
exports.registrovacunacion.belongsTo(loteproveedor, { foreignKey: "idLoteProveedor" });

//exports.depositonacional.sync({ alter: true });// esto es para pre-produccion
