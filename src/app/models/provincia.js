const {sequelize, DataTypes} = require("../conexion"); // Importa la instancia de Sequelize configurada

exports.provincia = sequelize.define(
    "provincia",
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
      },
      {
        tableName: "provincia", // Nombre de la tabla en la base de datos
        freezeTableName: true, // Para evitar que Sequelize cambie el nombre de la tabla
        timestamps: false, // Para deshabilitar la generación automática de campos createdAt y updatedAt
      }
    );
//exports.provincia.sync({ alter: true });// esto es para pre-produccion