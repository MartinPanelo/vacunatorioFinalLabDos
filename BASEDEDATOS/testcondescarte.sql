-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-02-2024 a las 18:26:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `testcondescarte`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centrodevacunacion`
--

CREATE TABLE `centrodevacunacion` (
  `id` int(11) NOT NULL,
  `idCiudad` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `direccion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `centrodevacunacion`
--

INSERT INTO `centrodevacunacion` (`id`, `idCiudad`, `nombre`, `correo`, `direccion`) VALUES
(1, 20, 'Hospital Avellaneda', 'hospital1@email.com', 'Balcarce 50'),
(2, 30, 'Centro Vacunatorio cucharita', 'cucharita@email.com', 'San Martin 20'),
(7, 78, 'asd', 'ads@gsd.com', 'asd'),
(8, 96, 'qwer', 'labcorp@example.com', 'qwer'),
(9, 98, 'Deposito Sur', 'madscientist@example.com', 'qweqwe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `id` int(11) NOT NULL,
  `idProvincia` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`id`, `idProvincia`, `nombre`) VALUES
(1, 41, 'La Plata'),
(2, 41, 'Mar del Plata'),
(3, 41, 'Bahía Blanca'),
(4, 42, 'San Fernando del Valle de Catamarca'),
(5, 42, 'San Isidro'),
(6, 42, 'San José de Piedra Blanca'),
(7, 43, 'Resistencia'),
(8, 43, 'Barranqueras'),
(9, 43, 'Fontana'),
(10, 44, 'Comodoro Rivadavia'),
(11, 44, 'Puerto Madryn'),
(12, 44, 'Esquel'),
(13, 45, 'Córdoba'),
(14, 45, 'Villa Carlos Paz'),
(15, 45, 'Río Cuarto'),
(16, 46, 'Corrientes'),
(17, 46, 'Goya'),
(18, 46, 'Mercedes'),
(19, 47, 'Paraná'),
(20, 47, 'Concordia'),
(21, 47, 'Gualeguaychú'),
(22, 48, 'Formosa'),
(23, 48, 'Clorinda'),
(24, 48, 'Pirané'),
(25, 49, 'San Salvador de Jujuy'),
(26, 49, 'San Pedro'),
(27, 49, 'Libertador General San Martín'),
(28, 50, 'Santa Rosa'),
(29, 50, 'General Pico'),
(30, 50, 'Toay'),
(31, 51, 'La Rioja'),
(32, 51, 'Chilecito'),
(33, 51, 'Aimogasta'),
(34, 52, 'Mendoza'),
(35, 52, 'San Rafael'),
(36, 52, 'Malargüe'),
(37, 53, 'Posadas'),
(38, 53, 'Eldorado'),
(39, 53, 'Oberá'),
(40, 54, 'Neuquén'),
(41, 54, 'San Martín de los Andes'),
(42, 54, 'Zapala'),
(43, 55, 'Viedma'),
(44, 55, 'General Roca'),
(45, 55, 'Cipolletti'),
(46, 56, 'Salta'),
(47, 56, 'San Ramón de la Nueva Orán'),
(48, 56, 'Tartagal'),
(49, 57, 'San Juan'),
(50, 57, 'Rivadavia'),
(51, 57, 'Pocito'),
(52, 58, 'San Luis'),
(53, 58, 'Villa Mercedes'),
(54, 58, 'Merlo'),
(55, 59, 'Río Gallegos'),
(56, 59, 'Caleta Olivia'),
(57, 59, 'Puerto Deseado'),
(58, 60, 'Santa Fe'),
(59, 60, 'Rosario'),
(60, 60, 'Venado Tuerto'),
(61, 61, 'Santiago del Estero'),
(62, 61, 'La Banda'),
(63, 61, 'Fernández'),
(64, 62, 'Ushuaia'),
(65, 62, 'Río Grande'),
(66, 62, 'Tolhuin'),
(67, 63, 'San Miguel de Tucumán'),
(68, 63, 'Concepción'),
(69, 63, 'Yerba Buena'),
(72, 41, 'La Rioja'),
(73, 52, 'asd'),
(74, 52, 'FFF'),
(75, 52, 'FFFF'),
(76, 52, 'FFFFF'),
(77, 43, 'Fontano'),
(78, 52, 'DDD'),
(79, 43, 'Fontane'),
(80, 43, 'Resistencio'),
(81, 41, 'asd'),
(82, 41, 'asdDD'),
(83, 50, 'asdasd'),
(84, 50, 'asdasdz'),
(85, 50, 'asdasdzz'),
(86, 50, 'asdasdasdad'),
(87, 50, 'asdasdFF'),
(91, 59, 'qwerqwer'),
(92, 59, 'AZAZAZ'),
(93, 59, 'asdasdasd'),
(94, 59, 'qqqq'),
(95, 59, 'aaa'),
(96, 59, 'BBB'),
(97, 54, 'San Isidro'),
(98, 54, 'San y sidra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositonacional`
--

CREATE TABLE `depositonacional` (
  `id` int(11) NOT NULL,
  `idCiudad` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `direccion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `depositonacional`
--

INSERT INTO `depositonacional` (`id`, `idCiudad`, `nombre`, `correo`, `direccion`) VALUES
(1, 80, 'Deposito Central', 'deposito1@email.com', 'Calle 123'),
(2, 79, 'Deposito Sur', 'deposito2@email.com', 'Av. San Martin 567'),
(11, 81, 'AADD', 'BB@mail.comDD', 'CCDD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositoprovincial`
--

CREATE TABLE `depositoprovincial` (
  `id` int(11) NOT NULL,
  `idCiudad` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `direccion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `depositoprovincial`
--

INSERT INTO `depositoprovincial` (`id`, `idCiudad`, `nombre`, `correo`, `direccion`) VALUES
(1, 1, 'Depósito Bs As', 'depositobsas@email.com', 'Calle Falsa 123'),
(2, 5, 'Depósito Córdoba', 'depositocba@email.com', 'Lavalle 234'),
(4, 35, 'Galponazo', 'gz@mail.com', 'en la esquina, al lado'),
(5, 87, 'RRz', 'RR@RR.comz', 'EEz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descarte`
--

CREATE TABLE `descarte` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idLote` int(11) NOT NULL,
  `TipoDeLote` enum('LoteProveedor','LoteProvincial','LoteCentroDeVacunacion','') NOT NULL,
  `fechaDeDescarte` date NOT NULL,
  `formaDeDescarte` varchar(300) NOT NULL,
  `motivo` varchar(300) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `descarte`
--

INSERT INTO `descarte` (`id`, `idUsuario`, `idLote`, `TipoDeLote`, `fechaDeDescarte`, `formaDeDescarte`, `motivo`, `cantidad`) VALUES
(9, 9, 30, 'LoteProveedor', '2024-02-21', 'qwe', 'eqw', 5),
(13, 9, 19, 'LoteProvincial', '2024-02-21', 'asdf', 'fads', 10),
(14, 9, 19, 'LoteProvincial', '2024-02-21', 'qwerqw', 'rwqerqw', 5),
(15, 9, 19, 'LoteProvincial', '2024-02-21', 'sdfasdf', 'sdfasdfs', 5),
(16, 9, 18, 'LoteProvincial', '2024-02-21', 'forma', 'motivo', 15),
(18, 9, 22, 'LoteProvincial', '2024-02-22', 'edscarte provincial', 'motivo provincial', 5),
(19, 9, 15, 'LoteCentroDeVacunacion', '2024-02-22', 'forma centro', 'motivo centro', 5),
(21, 9, 23, 'LoteProvincial', '2024-02-22', 'forma', 'motivo', 1500),
(22, 9, 29, 'LoteProveedor', '2024-02-22', 'fff', 'mmmm', 100),
(23, 9, 29, 'LoteProveedor', '2024-02-22', 'RR', 'EWWEW', 100),
(24, 9, 18, 'LoteProvincial', '2024-02-23', 'forma percance', 'motivo percence', 100),
(25, 9, 18, 'LoteProvincial', '2024-02-23', 'forma', 'motivo', 100),
(26, 9, 29, 'LoteProveedor', '2024-02-29', 'qqqqqqqq', 'wwwwwwwwwwww', 1000),
(27, 9, 24, 'LoteProvincial', '2024-02-29', 'FFFFF', 'DDDD', 1000),
(28, 9, 17, 'LoteCentroDeVacunacion', '2024-02-29', 'sdfg', 'sdf', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermero`
--

CREATE TABLE `enfermero` (
  `id` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `matricula` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `enfermero`
--

INSERT INTO `enfermero` (`id`, `idPersona`, `matricula`) VALUES
(1, 3, '1234'),
(2, 4, '5678');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratorio`
--

CREATE TABLE `laboratorio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `direccion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `laboratorio`
--

INSERT INTO `laboratorio` (`id`, `nombre`, `correo`, `direccion`) VALUES
(1, 'Mad Scientist Inc.', 'madscientist@example.com', ' 123 Lab Street'),
(2, 'BioHazard Labs', 'biohazard@example.com', '456 Science Avenue'),
(3, 'Eureka Laboratories', 'eureka@example.com', '789 Research Blvd'),
(4, 'Genius Genomics', 'geniusgenomics@example.com', '321 Health Lane'),
(5, 'Crazy Chem Co.', 'crazychem@example.com', '555 Innovation Road'),
(32, 'Testlab', 'CorreroLab@mail.com', 'calla 1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lotecentrodevacunacion`
--

CREATE TABLE `lotecentrodevacunacion` (
  `id` int(11) NOT NULL,
  `idCentroDeVacunacion` int(11) NOT NULL,
  `idLoteProvincial` int(11) NOT NULL,
  `cantidadDeVacunas` int(11) NOT NULL,
  `fechaDeAdquisicion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lotecentrodevacunacion`
--

INSERT INTO `lotecentrodevacunacion` (`id`, `idCentroDeVacunacion`, `idLoteProvincial`, `cantidadDeVacunas`, `fechaDeAdquisicion`) VALUES
(9, 1, 18, 5, '2024-02-19'),
(10, 2, 18, 10, '2024-02-22'),
(14, 7, 18, 5, '2024-02-22'),
(15, 2, 22, 10, '2024-02-22'),
(16, 7, 22, 10, '2024-05-16'),
(17, 2, 19, 5, '2024-02-29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loteproveedor`
--

CREATE TABLE `loteproveedor` (
  `id` int(11) NOT NULL,
  `idDepositoNacional` int(11) NOT NULL,
  `idVacuna` int(11) NOT NULL,
  `cantidadDeVacunas` int(11) NOT NULL,
  `fechaDeFabricacion` date NOT NULL,
  `fechaDeVencimiento` date NOT NULL,
  `fechaDeCompra` date NOT NULL,
  `fechaDeAdquisicion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `loteproveedor`
--

INSERT INTO `loteproveedor` (`id`, `idDepositoNacional`, `idVacuna`, `cantidadDeVacunas`, `fechaDeFabricacion`, `fechaDeVencimiento`, `fechaDeCompra`, `fechaDeAdquisicion`) VALUES
(29, 11, 31, 10000, '2024-02-01', '2024-02-21', '2024-02-21', '2024-02-23'),
(30, 1, 1, 100, '2024-02-09', '2024-06-09', '2024-02-09', '2024-02-09'),
(31, 11, 10, 100, '2024-02-01', '2024-05-11', '2024-02-22', '2024-02-22'),
(32, 11, 1, 10, '1111-11-11', '2222-02-22', '2024-02-26', NULL),
(33, 11, 31, 10, '1111-11-11', '2222-02-22', '2024-02-26', NULL),
(34, 11, 31, 9, '1111-11-11', '2222-02-22', '2024-02-26', NULL),
(35, 11, 31, 123, '1111-11-11', '2222-02-22', '2024-02-26', NULL),
(36, 11, 31, 88, '1111-11-11', '2222-02-22', '2024-02-26', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loteprovincial`
--

CREATE TABLE `loteprovincial` (
  `id` int(11) NOT NULL,
  `idDepositoProvincial` int(11) NOT NULL,
  `idLoteProveedor` int(11) NOT NULL,
  `cantidadDeVacunas` int(11) NOT NULL,
  `fechaDeAdquisicion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `loteprovincial`
--

INSERT INTO `loteprovincial` (`id`, `idDepositoProvincial`, `idLoteProveedor`, `cantidadDeVacunas`, `fechaDeAdquisicion`) VALUES
(18, 4, 29, 100, '2024-02-23'),
(19, 5, 30, 30, '2024-02-21'),
(20, 2, 29, 30, '2024-02-19'),
(21, 5, 31, 30, '2024-02-22'),
(22, 4, 31, 30, '2024-02-22'),
(23, 2, 29, 1500, '2024-02-22'),
(24, 5, 29, 1000, '2024-02-29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `idCiudad` int(11) NOT NULL,
  `fechaDeNacimiento` date NOT NULL,
  `telefono` varchar(150) NOT NULL,
  `genero` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `idPersona`, `idCiudad`, `fechaDeNacimiento`, `telefono`, `genero`) VALUES
(4, 6, 52, '1994-02-05', '12341234', 'masculino'),
(5, 7, 52, '2000-02-12', '1234123412', 'masculino'),
(6, 8, 52, '2024-01-31', '12341234', 'masculino'),
(7, 9, 52, '2024-02-08', '123123', 'masculino'),
(8, 10, 52, '2024-02-20', '123412341324', 'masculino'),
(9, 11, 52, '2024-01-24', '123123123', 'masculino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `DNI` varchar(150) NOT NULL,
  `correo` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `nombre`, `apellido`, `DNI`, `correo`) VALUES
(1, 'Juan', 'Pérez', '32659874', 'juanperez@email.com'),
(2, 'María', 'García', '27349123', 'maria.garcia@example.com'),
(3, 'Pedro', 'Martínez', '35879465', 'pedro.martinez@gmail.com'),
(4, 'Rosa', 'Fernández', '29384567', 'rosa.fernandez@hotmail.com'),
(5, 'Daniel', 'López', '32165498', 'danielopez@live.com'),
(6, 'Panelo', 'Martin', '12341234', 'correo@correo.com'),
(7, 'Panelo', 'rodrigo', '412342', 'paneloe@martin.com'),
(8, 'Panelo', 'Martin', '1234242', 'correo@correo.com'),
(9, 'Panelo', 'Martin', '12312', 'correo@correo.com'),
(10, 'Panelo', 'Martin', '123423', 'correo@correo.com'),
(11, 'Panelo', 'Martin', '1312313', 'correo@correo.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincia`
--

CREATE TABLE `provincia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `provincia`
--

INSERT INTO `provincia` (`id`, `nombre`) VALUES
(41, 'Buenos Aires'),
(42, 'Catamarca'),
(43, 'Chaco'),
(44, 'Chubut'),
(45, 'Córdoba'),
(46, 'Corrientes'),
(47, 'Entre Ríos'),
(48, 'Formosa'),
(49, 'Jujuy'),
(50, 'La Pampa'),
(51, 'La Rioja'),
(52, 'Mendoza'),
(53, 'Misiones'),
(54, 'Neuquén'),
(55, 'Río Negro'),
(56, 'Salta'),
(57, 'San Juan'),
(58, 'San Luis'),
(59, 'Santa Cruz'),
(60, 'Santa Fe'),
(61, 'Santiago del Estero'),
(62, 'Tierra del Fuego'),
(63, 'Tucumán');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registrovacunacion`
--

CREATE TABLE `registrovacunacion` (
  `id` int(11) NOT NULL,
  `idPaciente` int(11) NOT NULL,
  `idEnfermero` int(11) NOT NULL,
  `idCentroDeVacunacion` int(11) NOT NULL,
  `idLoteCentroDeVacunacion` int(11) NOT NULL,
  `idLoteProveedor` int(11) NOT NULL,
  `fechaDeAplicacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registrovacunacion`
--

INSERT INTO `registrovacunacion` (`id`, `idPaciente`, `idEnfermero`, `idCentroDeVacunacion`, `idLoteCentroDeVacunacion`, `idLoteProveedor`, `fechaDeAplicacion`) VALUES
(4, 4, 1, 2, 15, 31, '2024-02-22'),
(5, 5, 2, 2, 15, 31, '2024-02-20'),
(6, 6, 2, 1, 9, 29, '2024-02-22'),
(7, 7, 2, 1, 9, 29, '2024-02-14'),
(8, 7, 2, 1, 9, 29, '2024-02-14'),
(9, 7, 2, 1, 9, 29, '2024-02-14'),
(10, 8, 1, 1, 9, 29, '2024-02-07'),
(11, 9, 1, 2, 10, 29, '2024-02-29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasenia` varchar(100) NOT NULL,
  `rol` varchar(50) NOT NULL DEFAULT 'Sin rol'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `correo`, `contrasenia`, `rol`) VALUES
(9, 'martin', 'panelo', 'mart@asd.com', '$2a$10$XdDcrIS70PCOBSz03zADb.rHP5vL9jGZ3g6WUARLrANghEDYd4ckC', 'admin'),
(10, 'willy', 'wonka', 'wonka@mail.com', '$2a$10$A7xSy.7aG/OUBEO3LltlXuClHF3EAkDPQq1xTXUjuq5qslyfrMlLS', 'nacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacuna`
--

CREATE TABLE `vacuna` (
  `id` int(11) NOT NULL,
  `idLaboratorio` int(11) NOT NULL,
  `tipoDeVacuna` varchar(150) NOT NULL,
  `nombreComercial` varchar(150) NOT NULL,
  `paisDeOrigen` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vacuna`
--

INSERT INTO `vacuna` (`id`, `idLaboratorio`, `tipoDeVacuna`, `nombreComercial`, `paisDeOrigen`) VALUES
(1, 1, 'COVID-19', 'VaxGuard', 'Estados Unidos'),
(2, 2, 'Influenza', 'FluShield', 'Canadá'),
(3, 3, 'Sarampión', 'MeasleGuard', 'Alemania'),
(4, 4, 'Hepatitis B', 'HepaShield', 'China'),
(5, 5, 'Neumococo', 'PneumoGuard', 'Reino Unido'),
(6, 1, 'Tétanos', 'TetanoShield', 'Francia'),
(7, 2, 'Varicela', 'VaricoGuard', 'India'),
(8, 3, 'Hepatitis A', 'HepaGuard', 'Brasil'),
(9, 4, 'Difteria', 'DiftoShield', 'Rusia'),
(10, 5, 'Rotavirus', 'RotaGuard', 'Australia'),
(31, 32, 'TipoVacunaTest', 'NombreVacunaTest', 'PaisVacunaTest');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `centrodevacunacion`
--
ALTER TABLE `centrodevacunacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCiudad` (`idCiudad`);

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProvincia` (`idProvincia`);

--
-- Indices de la tabla `depositonacional`
--
ALTER TABLE `depositonacional`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCiudad` (`idCiudad`);

--
-- Indices de la tabla `depositoprovincial`
--
ALTER TABLE `depositoprovincial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCiudad` (`idCiudad`);

--
-- Indices de la tabla `descarte`
--
ALTER TABLE `descarte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idLote` (`idLote`);

--
-- Indices de la tabla `enfermero`
--
ALTER TABLE `enfermero`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPersona` (`idPersona`);

--
-- Indices de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lotecentrodevacunacion`
--
ALTER TABLE `lotecentrodevacunacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idLoteProvincial` (`idLoteProvincial`),
  ADD KEY `idCentroDeVacunacion` (`idCentroDeVacunacion`);

--
-- Indices de la tabla `loteproveedor`
--
ALTER TABLE `loteproveedor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idVacuna` (`idVacuna`),
  ADD KEY `idDepositoNacional` (`idDepositoNacional`);

--
-- Indices de la tabla `loteprovincial`
--
ALTER TABLE `loteprovincial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idLoteProveedor` (`idLoteProveedor`),
  ADD KEY `idDepositoProvincial` (`idDepositoProvincial`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPersona` (`idPersona`),
  ADD KEY `idCiudad` (`idCiudad`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `provincia`
--
ALTER TABLE `provincia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registrovacunacion`
--
ALTER TABLE `registrovacunacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPaciente` (`idPaciente`),
  ADD KEY `idEnfermero` (`idEnfermero`),
  ADD KEY `idCentroDeVacunacion` (`idCentroDeVacunacion`),
  ADD KEY `idLoteCentroDeVacunacion` (`idLoteCentroDeVacunacion`),
  ADD KEY `idLoteProveedor` (`idLoteProveedor`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`) USING BTREE;

--
-- Indices de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idLaboratorio` (`idLaboratorio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `centrodevacunacion`
--
ALTER TABLE `centrodevacunacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de la tabla `depositonacional`
--
ALTER TABLE `depositonacional`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `depositoprovincial`
--
ALTER TABLE `depositoprovincial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `descarte`
--
ALTER TABLE `descarte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `enfermero`
--
ALTER TABLE `enfermero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `lotecentrodevacunacion`
--
ALTER TABLE `lotecentrodevacunacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `loteproveedor`
--
ALTER TABLE `loteproveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `loteprovincial`
--
ALTER TABLE `loteprovincial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `provincia`
--
ALTER TABLE `provincia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `registrovacunacion`
--
ALTER TABLE `registrovacunacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `centrodevacunacion`
--
ALTER TABLE `centrodevacunacion`
  ADD CONSTRAINT `centrodevacunacion_ibfk_1` FOREIGN KEY (`idCiudad`) REFERENCES `ciudad` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD CONSTRAINT `ciudad_ibfk_1` FOREIGN KEY (`idProvincia`) REFERENCES `provincia` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `depositonacional`
--
ALTER TABLE `depositonacional`
  ADD CONSTRAINT `depositonacional_ibfk_1` FOREIGN KEY (`idCiudad`) REFERENCES `ciudad` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `depositoprovincial`
--
ALTER TABLE `depositoprovincial`
  ADD CONSTRAINT `depositoprovincial_ibfk_1` FOREIGN KEY (`idCiudad`) REFERENCES `ciudad` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `descarte`
--
ALTER TABLE `descarte`
  ADD CONSTRAINT `descarte_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `enfermero`
--
ALTER TABLE `enfermero`
  ADD CONSTRAINT `enfermero_ibfk_1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`id`);

--
-- Filtros para la tabla `lotecentrodevacunacion`
--
ALTER TABLE `lotecentrodevacunacion`
  ADD CONSTRAINT `lotecentrodevacunacion_ibfk_2` FOREIGN KEY (`idLoteProvincial`) REFERENCES `loteprovincial` (`id`),
  ADD CONSTRAINT `lotecentrodevacunacion_ibfk_3` FOREIGN KEY (`idCentroDeVacunacion`) REFERENCES `centrodevacunacion` (`id`);

--
-- Filtros para la tabla `loteproveedor`
--
ALTER TABLE `loteproveedor`
  ADD CONSTRAINT `loteproveedor_ibfk_1` FOREIGN KEY (`idVacuna`) REFERENCES `vacuna` (`id`),
  ADD CONSTRAINT `loteproveedor_ibfk_3` FOREIGN KEY (`idDepositoNacional`) REFERENCES `depositonacional` (`id`);

--
-- Filtros para la tabla `loteprovincial`
--
ALTER TABLE `loteprovincial`
  ADD CONSTRAINT `loteprovincial_ibfk_2` FOREIGN KEY (`idLoteProveedor`) REFERENCES `loteproveedor` (`id`),
  ADD CONSTRAINT `loteprovincial_ibfk_4` FOREIGN KEY (`idDepositoProvincial`) REFERENCES `depositoprovincial` (`id`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`id`),
  ADD CONSTRAINT `paciente_ibfk_2` FOREIGN KEY (`idCiudad`) REFERENCES `ciudad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `registrovacunacion`
--
ALTER TABLE `registrovacunacion`
  ADD CONSTRAINT `registrovacunacion_ibfk_1` FOREIGN KEY (`idPaciente`) REFERENCES `paciente` (`id`),
  ADD CONSTRAINT `registrovacunacion_ibfk_2` FOREIGN KEY (`idEnfermero`) REFERENCES `enfermero` (`id`),
  ADD CONSTRAINT `registrovacunacion_ibfk_3` FOREIGN KEY (`idCentroDeVacunacion`) REFERENCES `centrodevacunacion` (`id`),
  ADD CONSTRAINT `registrovacunacion_ibfk_4` FOREIGN KEY (`idLoteProveedor`) REFERENCES `loteproveedor` (`id`),
  ADD CONSTRAINT `registrovacunacion_ibfk_5` FOREIGN KEY (`idLoteCentroDeVacunacion`) REFERENCES `lotecentrodevacunacion` (`id`);

--
-- Filtros para la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD CONSTRAINT `vacuna_ibfk_1` FOREIGN KEY (`idLaboratorio`) REFERENCES `laboratorio` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
