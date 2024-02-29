function validarFormVacuna() {
	let flag = true;

	let campos = ["tipo", "nombreVacuna", "pais", "nombreLaboratorio", "correo", "direccion"];

	if(document.getElementById("comprar").style.display !== "none"){
		campos = ["tipo", "nombreVacuna", "pais", "nombreLaboratorio", "correo", "direccion", "idDeposito", "cantidad",
		"fechaDeFabricacion", "fechaDeVencimiento"];
	}

	let formVacuna = document.forms["formVacuna"];


	campos.forEach((campo) => {
		console.log(formVacuna[campo].value);
		if (formVacuna[campo].value.trim() === "") {
			flag = false;
			campoInvalido(campo);
		} else {
			campoValido(campo);
		}

		if (campo === "pais") {
			// Expresión regular que permite letras, espacios y algunos caracteres especiales
			if (!/^[a-zA-Z]+$/.test(formVacuna[campo].value)) {
				flag = false;
				campoInvalido(campo);
			}
		}


		if (campo === "correo") {
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formVacuna[campo].value)) {
				flag = false;
				campoInvalido(campo);
			}
		}


		if (campo === "idDeposito") {
			if (!/^[1-9]\d*$/.test(formVacuna[campo].value)) {
				flag = false;
				campoInvalido(campo);
			}
		}

		if (campo === "cantidad") {
			if (!/^[1-9]\d*$/.test(formVacuna[campo].value)) {
				flag = false;
				campoInvalido(campo);
			}
		}
		if (campo === "fechaDeFabricacion") {

			const fechaFabricacion = new Date(formVacuna["fechaDeFabricacion"].value);
			const fechaVencimiento = new Date(formVacuna["fechaDeVencimiento"].value);

			if (fechaFabricacion >= fechaVencimiento) {
				flag = false;
				campoInvalido(campo);
			}
		}


		if(campo === "deposito") {
			if(formVacuna[campo].value === "- Seleccione -") {
				flag = false;
				campoInvalido(campo);
			}
		}

	});

	return flag;
}

function campoInvalido(campo) {
	formVacuna[campo].classList.add("is-invalid");
	formVacuna[campo].classList.remove("is-valid");
}

function campoValido(campo) {
	formVacuna[campo].classList.add("is-valid");
	formVacuna[campo].classList.remove("is-invalid");
}


// validar editar - comprar y añadir vacuna








document.addEventListener("DOMContentLoaded", function () {
	const botonesEditar = document.querySelectorAll(".btn-editar");

	botonesEditar.forEach(function (boton) {
		boton.addEventListener("click", function () {
			// Obtener el valor de data-vacuna-id
			const vacunaId = boton.dataset.vacunaId;

			// Obtener el tr ancestro del botón
			const fila = boton.closest("tr");

			// Obtener los datos de la fila
			const tipo = fila.querySelector("td:nth-child(1)").textContent;
			const nombreVacuna = fila.querySelector("td:nth-child(2)").textContent;
			const pais = fila.querySelector("td:nth-child(3)").textContent;
			const nombreLaboratorio = fila.querySelector("td:nth-child(4)").textContent;
			const correo = fila.querySelector("td:nth-child(5)").textContent;
			const direccion = fila.querySelector("td:nth-child(6)").textContent;

			// Asignar los valores al formulario de edición
			document.getElementById("tipo").value = tipo;
			//document.getElementById("tipo").disabled = true;
			document.getElementById("nombreVacuna").value = nombreVacuna;
			document.getElementById("pais").value = pais;
			document.getElementById("nombreLaboratorio").value = nombreLaboratorio;
			//document.getElementById("nombreLaboratorio").disabled = true;
			document.getElementById("correo").value = correo;
			document.getElementById("direccion").value = direccion;



			//

			// Cambiar el action y el method del formulario

			const formVacuna = document.getElementById("formVacuna");
			formVacuna.action = "EditarVacuna/" + vacunaId + "?_method=PUT"; // Cambia a la ruta de edición

			// Utilizar el valor de vacunaId según tus necesidades
			//  console.log('ID de la vacuna:', vacunaId);
			// document.getElementById('vacunaId').value = vacunaId;
			document.getElementById("comprar").style.display = "none";

			document.getElementById("staticBackdropLabel").innerText = "Editar vacuna";
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const modalVacuna = new bootstrap.Modal(document.getElementById("modalVacuna"));

	// Función para restablecer el formulario
	function resetForm() {
		// Obtén el formulario y restablece su estado
		const formVacuna = document.getElementById("formVacuna");
		formVacuna.reset();

		formVacuna.action = "RegistrarVacuna"; // Cambia a la ruta de edición

		document.getElementById("tipo").disabled = false;
		document.getElementById("nombreVacuna").disabled = false;
		document.getElementById("pais").disabled = false;
		document.getElementById("nombreLaboratorio").disabled = false;
		document.getElementById("correo").disabled = false;
		document.getElementById("direccion").disabled = false;

		
		document.getElementsByName("cantidad")[0].disabled = true;
		document.getElementsByName("fechaDeFabricacion")[0].disabled = true;
		document.getElementsByName("fechaDeVencimiento")[0].disabled = true;
		document.getElementsByName("idDeposito")[0].disabled = true;


		document.getElementById("comprar").style.display = "none";


		document.getElementById("staticBackdropLabel").innerText = "Registrar vacuna";
	}

	// Asigna la función resetForm al evento show del modal
	modalVacuna._element.addEventListener("show.bs.modal", resetForm);
});

document.addEventListener("DOMContentLoaded", function () {
	const botonesComprar = document.querySelectorAll(".btn-comprar");

	botonesComprar.forEach(function (boton) {
		boton.addEventListener("click", function () {
			// Obtener el valor de data-vacuna-id
			const vacunaId = boton.dataset.vacunaId;

			// Obtener el tr ancestro del botón
			const fila = boton.closest("tr");

			// Obtener los datos de la fila
			const tipo = fila.querySelector("td:nth-child(1)").textContent;
			const nombreVacuna = fila.querySelector("td:nth-child(2)").textContent;
			const pais = fila.querySelector("td:nth-child(3)").textContent;
			const nombreLaboratorio = fila.querySelector("td:nth-child(4)").textContent;
			const correo = fila.querySelector("td:nth-child(5)").textContent;
			const direccion = fila.querySelector("td:nth-child(6)").textContent;

			// Asignar los valores al formulario de edición
			document.getElementById("tipo").value = tipo;
			document.getElementById("nombreVacuna").value = nombreVacuna;
			document.getElementById("pais").value = pais;
			document.getElementById("nombreLaboratorio").value = nombreLaboratorio;
			document.getElementById("correo").value = correo;
			document.getElementById("direccion").value = direccion;

			// desabilar todos los campos del formulario
			document.getElementById("tipo").disabled = true;
			document.getElementById("nombreVacuna").disabled = true;
			document.getElementById("pais").disabled = true;
			document.getElementById("nombreLaboratorio").disabled = true;
			document.getElementById("correo").disabled = true;
			document.getElementById("direccion").disabled = true;

			//menejo el imput de cantidad de vacunas

			document.getElementsByName("cantidad")[0].disabled = false;
			document.getElementsByName("fechaDeFabricacion")[0].disabled = false;
			document.getElementsByName("fechaDeVencimiento")[0].disabled = false;
			document.getElementsByName("idDeposito")[0].disabled = false;
	
	
			document.getElementById("comprar").style.display = "none";

			document.getElementById("comprar").style.display = "block";

			// Cambiar el action y el method del formulario

			const formVacuna = document.getElementById("formVacuna");
			formVacuna.action = "ComprarLoteProveedor";


			 document.getElementById('idVacuna').value = vacunaId;

			document.getElementById("staticBackdropLabel").innerText = "comprar vacuna";
		});
	});
});

function detalleDeposito() {
	var select = document.getElementById("selectDeposito");
	var deposito = Depositos.find((d) => d.id == select.value);

	var nombreDepositoElement = document.getElementById("nombreDeposito");
	var direccionDepositoElement = document.getElementById("direccionDeposito");
	var correoDepositoElement = document.getElementById("correoDeposito");
	var detallesDepositoElement = document.getElementById("detallesDeposito");

	nombreDepositoElement.innerText = deposito.nombre;
	direccionDepositoElement.innerText = deposito.direccion;
	correoDepositoElement.innerText = deposito.correo;
	detallesDepositoElement.classList.remove("oculto");
}



var myModal = document.getElementById("modalVacuna");
myModal.addEventListener("hidden.bs.modal", function (event) {
	var detallesDepositoElement = document.getElementById("detallesDeposito");
	detallesDepositoElement.classList.add("oculto");


	document.getElementById("tipo").disabled = false;
	document.getElementById("nombreVacuna").disabled = false;
	document.getElementById("pais").disabled = false;
	document.getElementById("nombreLaboratorio").disabled = false;
	document.getElementById("correo").disabled = false;
	document.getElementById("direccion").disabled = false;
});
