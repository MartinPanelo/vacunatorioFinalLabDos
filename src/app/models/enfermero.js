const {sequelize, DataTypes} = require("../conexion"); // Importa la instancia de Sequelize configurada
const { persona } = require("./persona");

exports.enfermero = sequelize.define(
    "enfermero",
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        idPersona: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        matricula: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
      },
      {
        tableName: "enfermero", // Nombre de la tabla en la base de datos
        timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
      }
    );

exports.enfermero.belongsTo(persona, { foreignKey: "idPersona" });
//exports.enfermero.sync({ alter: true });// esto es para pre-produccion