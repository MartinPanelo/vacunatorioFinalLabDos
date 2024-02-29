const {sequelize, DataTypes} = require("../conexion"); // Importa la instancia de Sequelize configurada

exports.laboratorio = sequelize.define(
    "laboratorio",
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
        correo: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        direccion: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
      },
      {
        tableName: "laboratorio", // Nombre de la tabla en la base de datos
        timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
      }
    );
//exports.laboratorio.sync({ alter: true });// esto es para pre-produccion