
	const botonesEditar = document.querySelectorAll(".btn-editar");
	const botonesDistribuir = document.querySelectorAll(".btn-distribuir");

	function ModalConDatos(boton) {
		

		// Obtener el tr ancestro del botón
		const fila = boton.closest("tr");

		// Obtener los datos de la fila
		const idLoteProveedor = fila.querySelector("td:nth-child(1)").textContent;
		const nombredeposito = fila.querySelector("td:nth-child(2)").textContent;
		const ubicaciondeposito = fila.querySelector("td:nth-child(3)").textContent;
		const vacuna = fila.querySelector("td:nth-child(4)").textContent;
		const laboratorio = fila.querySelector("td:nth-child(5)").textContent;
		const compradas = fila.querySelector("td:nth-child(6)").textContent;
		const disponibles = fila.querySelector("td:nth-child(7)").textContent;
		const fechafabricacion = fila.querySelector("td:nth-child(8)").textContent;
		const fechavencimiento = fila.querySelector("td:nth-child(9)").textContent;
		const fechacompra = fila.querySelector("td:nth-child(10)").textContent;
		const fechaadquisicion = fila.querySelector("td:nth-child(11)").textContent;

		// Asignar los valores al formulario de edición
		document.getElementById("idLoteProveedor").value = idLoteProveedor;
		document.getElementById("depositonacionalnombre").value = nombredeposito;
		document.getElementById("provinciadeposito").value = ubicaciondeposito.split(",")[0];
		document.getElementById("ciudad").value = ubicaciondeposito.split(",")[1].trim();
		document.getElementById("vacunaid").value = vacuna;
		document.getElementById("laboratorio").value = laboratorio;
		document.getElementById("cantidad").value = parseInt(compradas);
		document.getElementById("disponibles").value = parseInt(disponibles);
		document.getElementById("fechafabricacion").value = fechafabricacion;
		document.getElementById("fechavencimiento").value = fechavencimiento;
		document.getElementById("fechacompra").value = fechacompra;
		document.getElementById("fechaadquisicion").value = fechaadquisicion;

		

		

		// Utilizar el valor de vacunaId según tus necesidades
		//  console.log('ID de la vacuna:', vacunaId);
		// document.getElementById('vacunaId').value = vacunaId;

		

		//--------------

		var laboratorioSeleccionado = document.getElementById("laboratorio");
		laboratorioSeleccionado.addEventListener("change", function () {
			funcionFormVacuna(vacuna);
		});
		funcionFormVacuna(vacuna);

		var provinciaSeleccionada = document.getElementById("provinciadeposito");
		provinciaSeleccionada.addEventListener("change", function () {
			funcionFormDeposito(nombredeposito);
			ciudad = document.getElementById("depositonacionalnombre");
			document.getElementById("ciudad").value = ciudad.options[ciudad.selectedIndex].text.split(" - ")[1].trim();
		});
		funcionFormDeposito(nombredeposito);

		var depositoSeleccionado = document.getElementById("depositonacionalnombre");
		depositoSeleccionado.addEventListener("change", function () {
			ciudad = document.getElementById("depositonacionalnombre");
			document.getElementById("ciudad").value = ciudad.options[ciudad.selectedIndex].text.split(" - ")[1].trim();
		});

		



	}

	botonesEditar.forEach(function (boton) {
		boton.addEventListener("click", function () {
			ModalConDatos(boton);
		});
	});
	botonesEditar.forEach(function (boton) {
		boton.addEventListener("click", function () {
			document.getElementById("tamanioModal").classList.remove("modal-xl");
			document.getElementById("tamanioModal").classList.add("modal-lg");
				// Cambiar el action y el method del formulario
			const loteId = boton.dataset.loteId;
			const formlote = document.getElementById("formlote");
			formlote.action = "EditarLoteProveedor/" + loteId + "?_method=PUT"; // Cambia a la ruta de edición

			document.getElementById("staticBackdropLabel").innerText = "Editar Lote";


			document.getElementsByName("provincia")[0].disabled = true;
			document.getElementsByName("depositoprovincialid")[0].disabled = true;
			document.getElementsByName("cantidadvacunas")[0].disabled = true;

		});
	});
	botonesDistribuir.forEach(function (boton) {
		boton.addEventListener("click", function () {
			ModalConDatos(boton);
		});
	});
	botonesDistribuir.forEach(function (boton) {
		boton.addEventListener("click", function () {

			var provinciaDestino = document.getElementById("provincia");
			provinciaDestino.addEventListener("change", function () {
				funcionFormDestino();
			});
			funcionFormDestino();


			document.getElementById("tamanioModal").classList.remove("modal-lg");
			document.getElementById("tamanioModal").classList.add("modal-xl");
			document.getElementById("depositonacionalnombre").disabled = true;
			document.getElementById("provinciadeposito").disabled = true;
			document.getElementById("ciudad").disabled = true;
			document.getElementById("vacunaid").disabled = true;
			document.getElementById("laboratorio").disabled = true;
			document.getElementById("cantidad").disabled = true;
			document.getElementById("disponibles").disabled = true;
			document.getElementById("fechafabricacion").disabled = true;
			document.getElementById("fechavencimiento").disabled = true;
			document.getElementById("fechacompra").disabled = true;
			document.getElementById("fechaadquisicion").disabled = true;

			document.getElementsByName("provincia")[0].disabled = false;
			document.getElementsByName("depositoprovincialid")[0].disabled = false;
			document.getElementsByName("cantidadvacunas")[0].disabled = false;

	// Cambiar el action y el method del formulario
			const formlote = document.getElementById("formlote");
			formlote.action = "NuevoLoteProvincial"; // Cambia a la ruta de edición


			document.getElementById("staticBackdropLabel").innerText = "Distribuir Lote";

			document.getElementById("datosenvio").style.display = "block";

		});
	});




	function funcionFormDeposito(Deposito) {
		var provinciaSeleccionada = document.getElementById("provinciadeposito");
		var depositoSeleccionado = document.getElementById("depositonacionalnombre");
		var provinciaSeleccionadavalue = provinciaSeleccionada.value;
		// Filtra las vacunas por el laboratorio seleccionado
		var DepositosFiltrados = depositoNacionales.filter(function (deposito) {
			return deposito.ciudad.provincia.nombre === provinciaSeleccionadavalue;
		});

		// Limpia las opciones actuales en el campo de selección de vacunas
		depositoSeleccionado.innerHTML = "";

		// Agrega las nuevas opciones al campo de selección de vacunas
		DepositosFiltrados.forEach(function (depositoopc) {
			var option = document.createElement("option");
			option.value = depositoopc.id;

			option.text = depositoopc.nombre + " - " + depositoopc.ciudad.nombre;

			if (Deposito.includes(depositoopc.nombre)) {
				
				option.selected = true;
			}

			depositoSeleccionado.appendChild(option);
		});
	}

	function funcionFormVacuna(Vacuna) {
		var laboratorioSeleccionado = document.getElementById("laboratorio");
		var vacunaSeleccionada = document.getElementById("vacunaid");
		var laboratorioSeleccionadoValue = laboratorioSeleccionado.value;
		// Filtra las vacunas por el laboratorio seleccionado
		var vacunasFiltradas = vacunas.filter(function (vacuna) {
			return vacuna.laboratorio.nombre === laboratorioSeleccionadoValue;
		});

		// Limpia las opciones actuales en el campo de selección de vacunas
		vacunaSeleccionada.innerHTML = "";

		// Agrega las nuevas opciones al campo de selección de vacunas
		vacunasFiltradas.forEach(function (vacunaopc) {
			var option = document.createElement("option");
			option.value = vacunaopc.id;
			option.text = vacunaopc.tipoDeVacuna + " - " + vacunaopc.nombreComercial;
			if (Vacuna.includes(vacunaopc.tipoDeVacuna) && Vacuna.includes(vacunaopc.nombreComercial)) {
				
				option.selected = true;
			}
			vacunaSeleccionada.appendChild(option);
		});
	}

	function funcionFormDestino() {



		var provinciaSeleccionada = document.getElementById("provincia");
		var depositoSeleccionado = document.getElementById("depositoprovincialid");
		var provinciaSeleccionadavalue = provinciaSeleccionada.value;
		console.log(provinciaSeleccionadavalue)
		var DepositosFiltrados = depositoProvinciales.filter(function (deposito) {
			console.log(provinciaSeleccionadavalue, "sera", deposito.ciudad.provincia.nombre,deposito.ciudad.provincia.nombre == provinciaSeleccionadavalue)
			return deposito.ciudad.provincia.nombre == provinciaSeleccionadavalue;
		});

		// Limpia las opciones actuales en el campo de selección de vacunas
		depositoSeleccionado.innerHTML = "";
		
		// Agrega las nuevas opciones al campo de selección de vacunas
		DepositosFiltrados.forEach(function (depositoopc) {
			var option = document.createElement("option");
			option.value = depositoopc.id;

			option.text = depositoopc.nombre + " - " + depositoopc.ciudad.nombre;

			depositoSeleccionado.appendChild(option);
		});
	}
	

		const botonesDescartar = document.querySelectorAll(".btn-descartar");

		botonesDescartar.forEach(function (boton) {
			boton.addEventListener("click", function () {
				mostrarInfoLote(boton);
			});
		});

		function mostrarInfoLote(boton) {

			

			
		
			const InfoLoteDescarte = document.getElementById("InfoLoteDescarte");
			InfoLoteDescarte.innerHTML = "";

			const fila = boton.closest("tr");

			const datos = [
				"Identificador LoteProveedor: " + fila.querySelector("td:nth-child(1)").textContent,
				"nombre deposito nacional: " + fila.querySelector("td:nth-child(2)").textContent,
				"ubicacion del deposito: " + fila.querySelector("td:nth-child(3)").textContent,
				"vacuna: " + fila.querySelector("td:nth-child(4)").textContent,
				"laboratorio: " + fila.querySelector("td:nth-child(5)").textContent,
				"cantidad de vacunas compradas: " + fila.querySelector("td:nth-child(6)").textContent,
				"cantidad de vacunas disponibles: " + fila.querySelector("td:nth-child(7)").textContent,
				"fecha de fabricacion: " + fila.querySelector("td:nth-child(8)").textContent,
				"fecha de vencimiento: " + fila.querySelector("td:nth-child(9)").textContent,
				"fecha de compra: " + fila.querySelector("td:nth-child(10)").textContent,
				"fecha de adquisicion: " + fila.querySelector("td:nth-child(11)").textContent
			];

			datos.forEach(dato => {
				const nuevoElementoLi = document.createElement("li");
				nuevoElementoLi.textContent = dato;
				InfoLoteDescarte.appendChild(nuevoElementoLi);
			});
			const LoteADescartar = document.getElementById("LoteADescartarId");
			
			LoteADescartar.value = boton.getAttribute("data-lote-id");



		}
















function validarFormLote(formDescarte = false) {// editar , distribuir y hacer otro para descartar
	
	let flag = true;

	let campos = ["laboratorio", "vacunaid", "cantidad", "disponibles", "provinciadeposito", "depositonacionalnombre","fechafabricacion",
					"fechavencimiento","fechacompra","fechaadquisicion"];

	if(document.getElementById("datosenvio").style.display !== "none"){
		console.log("entro");
		campos = ["laboratorio", "vacunaid", "cantidad", "disponibles", "provinciadeposito", "depositonacionalnombre","fechafabricacion",
					"fechavencimiento","fechacompra","fechaadquisicion","provincia","depositoprovincialid","cantidadvacunas"];
	}

	let formlote = document.forms["formlote"];

	if(formDescarte){
		campos = ["formadescarte", "motivodescarte", "cantidadadescartar"];
		formlote = document.forms["formlotedescarte"];
	}



	campos.forEach((campo) => {
		
		if (formlote[campo].value.trim() === "") {
			console.log(formlote[campo].value.trim(), campo);
			flag = false;
			campoInvalido(campo);
		} else {
			campoValido(campo);
		}

		if(campo === "laboratorio") {
			if(formlote[campo].value === "- Seleccione -") {
				flag = false;
				campoInvalido(campo);
			}
		}
		if (campo === "cantidad") {
			if (!/^[1-9]\d*$/.test(formlote[campo].value)) {
				flag = false;
				campoInvalido(campo);
			}
		}
		if (campo === "provinciadeposito") {
			// Expresión regular que permite letras, espacios y algunos caracteres especiales
			if (!/^[a-zA-Z\s]+$/.test(formlote[campo].value)) {
				flag = false;
				campoInvalido(campo);
			}
		}
		if (campo === "provincia") {
			// Expresión regular que permite letras, espacios y algunos caracteres especiales
			if (!/^[a-zA-Z\s]+$/.test(formlote[campo].value)) {
				flag = false;
				campoInvalido(campo);
			}
		}

		if (campo === "cantidad") {
			if (!/^[1-9]\d*$/.test(formlote[campo].value)) {
				flag = false;
				campoInvalido(campo);
			}
		}
		if (campo === "fechafabricacion") {

			const fechaFabricacion = new Date(formlote["fechafabricacion"].value);
			const fechaVencimiento = new Date(formlote["fechavencimiento"].value);

			if (fechaFabricacion >= fechaVencimiento) {
				flag = false;
				campoInvalido(campo);
			}
		}
		if (campo === "fechacompra") {

			const fechacompra = new Date(formlote["fechacompra"].value);
			const fechaadquisicion = new Date(formlote["fechaadquisicion"].value);

			if (fechacompra > fechaadquisicion) {
				flag = false;
				campoInvalido(campo);
			}
		}

		if (campo === "cantidadadescartar") {
			if (!/^[1-9]\d*$/.test(formlote[campo].value)) {
				flag = false;
				campoInvalido(campo);
			}
		}



	});
	console.log(flag);
	return flag;
}

function validarFormFiltro() {
	let flag = true;

	let formlote = document.forms["formfiltro"];

			const fechadesde = new Date(formlote["fechadesde"].value);
			const fechahasta = new Date(formlote["fechahasta"].value);

			if (fechadesde > fechahasta) {
				flag = false;
				formlote["fechadesde"].classList.add("is-invalid");
				formlote["fechahasta"].classList.add("is-invalid");
			}else{
				formlote["fechadesde"].classList.remove("is-valid");
				formlote["fechahasta"].classList.remove("is-valid");
			}
		

	return flag;

}


var myModal = document.getElementById("modallote");
myModal.addEventListener("hidden.bs.modal", function (event) {

	document.getElementById("tamanioModal").classList.remove("modal-lg");
			document.getElementById("tamanioModal").classList.add("modal-xl");
			document.getElementById("depositonacionalnombre").disabled = false;
			document.getElementById("provinciadeposito").disabled = false;
			document.getElementById("ciudad").disabled = false;
			document.getElementById("vacunaid").disabled = false;
			document.getElementById("laboratorio").disabled = false;
			document.getElementById("cantidad").disabled = false;
			document.getElementById("fechafabricacion").disabled = false;
			document.getElementById("fechavencimiento").disabled = false;
			document.getElementById("fechacompra").disabled = false;
			document.getElementById("fechaadquisicion").disabled = false;
	

	document.getElementById("datosenvio").style.display = "none";
});

function campoInvalido(campo) {
	formlote[campo].classList.add("is-invalid");
	formlote[campo].classList.remove("is-valid");
}

function campoValido(campo) {
	formlote[campo].classList.add("is-valid");
	formlote[campo].classList.remove("is-invalid");
}