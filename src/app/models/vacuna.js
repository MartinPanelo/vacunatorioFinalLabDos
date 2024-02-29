const {sequelize, DataTypes} = require("../conexion"); // Importa la instancia de Sequelize configurada
const { laboratorio } = require("./laboratorio");

exports.vacuna = sequelize.define(
    "vacuna",
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        idLaboratorio: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        tipoDeVacuna: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        nombreComercial: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        paisDeOrigen: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
      },
      {
        tableName: "vacuna", // Nombre de la tabla en la base de datos
        timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
      }
    );

exports.vacuna.belongsTo(laboratorio, { foreignKey: "idLaboratorio" });
//exports.vacuna.sync({ alter: true });// esto es para pre-produccion