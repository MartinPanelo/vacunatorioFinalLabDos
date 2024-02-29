// modelos/usuario.js

const {sequelize, DataTypes} = require("../conexion"); // Importa la instancia de Sequelize configurada

/* const {DataTypes} = require("sequelize");
 */
exports.usuario = sequelize.define(
	"usuario",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		apellido: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		correo: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		contrasenia: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rol: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	},
    {
        tableName: 'usuario',
        timestamps: false,
      }
);
//exports.Usuario.sync({ alter: true });// esto es para produccion