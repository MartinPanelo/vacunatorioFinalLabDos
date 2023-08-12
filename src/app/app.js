const express = require('express');
const path = require('path');
const morgan = require('morgan')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "pug");


const dirpublic = __dirname.replace("app", "public");
app.use(express.static(dirpublic));

app.use(morgan('combined'))

// routes
var managerRutas = require("./managerRouter");
app.use("/", managerRutas);

//test conexion sacar de aca <====
const conexion = require("./conexion");


app.listen(8000, () => console.log("Server started on port 8000"));
