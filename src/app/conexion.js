const { Sequelize,DataTypes } = require("sequelize");

const sequelize = new Sequelize("testcondescarte", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => {
    console.log("Connection to DB was successful");
  })
  .catch((err) => {
    console.error("Unable to connect to DB", err);
  });

module.exports = {sequelize, DataTypes};


    
/*  const UsuarioModel  = require("./../../models/usuario")
const Usuario = sequelize.define('Usuario', UsuarioModel); */

