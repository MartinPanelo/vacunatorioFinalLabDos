const { Sequelize } = require("sequelize");

const connection = new Sequelize("vacunatorio", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
connection
  .authenticate()
  .then(() => {

    console.log("Connection to DB was successful");
  })
  .catch((err) => {
    console.error("Unable to connect to DB", err);
  });

module.exports = connection;
