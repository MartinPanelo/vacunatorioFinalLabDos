const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


// Configuración de body-parser
app.use(bodyParser.json()); // Para analizar solicitudes con formato JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para analizar solicitudes con datos de formulario


app.use(cookieParser());






const path = require('path');
const morgan = require('morgan')



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
