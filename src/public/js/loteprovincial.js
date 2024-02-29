document.addEventListener("DOMContentLoaded", function () {


	const botonesEditar = document.querySelectorAll(".btn-editar");
	const botonesDistribuir = document.querySelectorAll(".btn-distribuir");

	function ModalConDatos(boton, cantidad) {
		

		// Obtener el tr ancestro del botón
		const fila = boton.closest("tr");

		// Obtener los datos de la fila
		const idLoteProveedor = fila.querySelector("td:nth-child(1)").textContent;
		const idLoteProvincial = fila.querySelector("td:nth-child(2)").textContent;
		const cantidadDeVacunasDisponibles = fila.querySelector(`td:nth-child(${cantidad})`).textContent;
		const fechaadquisicion = fila.querySelector("td:nth-child(10)").textContent;
		const idDepositoProvincial = fila.querySelector("td:nth-child(11)").textContent;


		// Asignar los valores al formulario de edición

		

		document.getElementById("cantidad").value = cantidadDeVacunasDisponibles;
		document.getElementById("fechaadquisicion").value = fechaadquisicion;

		document.getElementById("loteprovincial").value = idLoteProvincial;
		//document.getElementById("depositoId").value = idLoteProvincial;
		
		const listaDepositos = document.getElementById("deposito");
		var options = listaDepositos.options;


		for (var i = 0; i < options.length; i++) {
			//console.log("Valor del option:", options[i].value);
			if (options[i].value === idDepositoProvincial) {
				
				options[i].selected = true;
			}
		}
		

		const listaLoteProveedor = document.getElementById("loteproveedor");
		var optionsLoteP = listaLoteProveedor.options;


		for (var i = 0; i < optionsLoteP.length; i++) {
			//console.log("Valor del option:", optionsLoteP[i].value);
			if(optionsLoteP[i].value.includes(idLoteProveedor)){
				optionsLoteP[i].selected = true;
			}
		}
		

		const Descarte = document.getElementById("Descarte");
		if(fechaadquisicion === "Viajando"){
			Descarte.style.display = "block";
		}else{
			Descarte.style.display = "none";
		}

		






	}

	

	


	botonesEditar.forEach(function (boton) {
		boton.addEventListener("click", function () {
			ModalConDatos(boton,6); // el segundo parametro es para determinar la columna que tiene la cantidad de vacunas segun el caso
		});
	});

	botonesEditar.forEach(function (boton) {
		boton.addEventListener("click", function () {

			const LoteProvincial =  boton.dataset.loteProvincialId;

			
			const formlote = document.getElementById("formlote");
			formlote.action = "EditarLoteProvincial/" + LoteProvincial + "?_method=PUT"; // Cambia a la ruta de edición

			// Utilizar el valor de vacunaId según tus necesidades
			//  console.log('ID de la vacuna:', vacunaId);
			// document.getElementById('vacunaId').value = vacunaId;

			document.getElementsByName("provincia")[0].disabled = true;
			document.getElementsByName("centrodevacunacion")[0].disabled = true;
			document.getElementsByName("cantidadvacunas")[0].disabled = true;
			document.getElementById("deposito").disabled = false;
			document.getElementById("fechaadquisicion").disabled = false;
			document.getElementById("cantidad").disabled = false;
			document.getElementById("loteproveedor").disabled = false;
			document.getElementById("loteprovincial").disabled = false;

			document.getElementById("tamanioModal").classList.add("modal-lg");
			document.getElementById("tamanioModal").classList.remove("modal-xl");

			document.getElementsByName("datosenvio")[0].style.display = "none";
			document.getElementsByName("datosenvio")[1].style.display = "none";
			
			
			//document.getElementById("comprar").style.display = "none";
			document.getElementById("staticBackdropLabel").innerText = "Editar Lote";

		});
	});
	//--------------------------
	botonesDistribuir.forEach(function (boton) {
		boton.addEventListener("click", function () {
			ModalConDatos(boton, 7);
		});
	});
	botonesDistribuir.forEach(function (boton) {
		boton.addEventListener("click", function () {
			document.getElementById("staticBackdropLabel").innerText = "Distribuir Lote";

			document.getElementById("tamanioModal").classList.remove("modal-lg");
			document.getElementById("tamanioModal").classList.add("modal-xl");


			document.getElementById("cantidadvacunas").max = parseInt(
				document.getElementById("cantidad").value
			)


			document.getElementById("deposito").disabled = true;
			document.getElementById("fechaadquisicion").disabled = true;
			document.getElementById("cantidad").disabled = true;
			document.getElementById("loteproveedor").disabled = true;
			document.getElementById("loteprovincial").readOnly = true;

			document.getElementsByName("datosenvio")[0].style.display = "block";
			document.getElementsByName("datosenvio")[1].style.display = "block";
			document.getElementsByName("provincia")[0].disabled = false;
			document.getElementsByName("centrodevacunacion")[0].disabled = false;
			document.getElementsByName("cantidadvacunas")[0].disabled = false;
			

			const formlote = document.getElementById("formlote");
			formlote.action = "NuevoLoteCentroDeVacunacion"; // Cambia a la ruta de edición




			const listaprovincias = document.getElementById("provincia");
			const listacentros = document.getElementById("centrodevacunacion");
			
			listaprovincias.addEventListener("change", function () {
				listacentros.innerHTML = "";
				centrosDeVacunacion.forEach(function (centro) {

					console.log("Centro:", centro.ciudad.provincia.nombre, "Provincia:", listaprovincias.value);

					
					if(listaprovincias.value === centro.ciudad.provincia.nombre){
						var option = document.createElement("option");
						option.value = centro.id;
			
						option.text = centro.nombre + " - " + centro.ciudad.nombre;
						listacentros.appendChild(option);
	
					}
	
				})
			});
			



			//
			


			
	




		});
	});




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
			"Identificador Lote Provincial: " + fila.querySelector("td:nth-child(2)").textContent,
			"nombre deposito provincial: " + fila.querySelector("td:nth-child(3)").textContent,
			"ubicacion del deposito: " + fila.querySelector("td:nth-child(4)").textContent,
			"vacuna: " + fila.querySelector("td:nth-child(5)").textContent,
			"cantidad de vacunas: " + fila.querySelector("td:nth-child(6)").textContent,
			"cantidad de vacunas disponibles: " + fila.querySelector("td:nth-child(7)").textContent,
			"fecha de fabricacion: " + fila.querySelector("td:nth-child(8)").textContent,
			"fecha de vencimiento: " + fila.querySelector("td:nth-child(9)").textContent,
			"fecha de adquisicion: " + fila.querySelector("td:nth-child(10)").textContent
		];

		document.getElementById("cantidadadescartar").max = parseInt( fila.querySelector("td:nth-child(7)").textContent);

		datos.forEach(dato => {
			const nuevoElementoLi = document.createElement("li");
			nuevoElementoLi.textContent = dato;
			InfoLoteDescarte.appendChild(nuevoElementoLi);
		});
		const LoteADescartar = document.getElementById("LoteADescartarId");
		
		LoteADescartar.value = boton.getAttribute("data-lote-id");



	}



	const lotepercance = document.getElementById("lotepercance");
	lotepercance.addEventListener("change", function (event) {
	
	
	
		console.log(event.target.checked)
		if (event.target.checked) {
	
			console.log("si")
			document.getElementById("formulariodescarte").style.display = "block";
			document.getElementById("motivodescarteE").disabled = false;
			document.getElementById("formadescarteE").disabled = false;
	
			
	
			
		} else {
			console.log("no")
			document.getElementById("motivodescarteE").disabled = true;
			document.getElementById("formadescarteE").disabled = true;
			document.getElementById("formulariodescarte").style.display = "none";
	
		
		}
		
	})

})




var myModal = document.getElementById("modallote");
myModal.addEventListener("hidden.bs.modal", function (event) {

	document.getElementsByName("datosenvio")[0].style.display = "none";
	document.getElementsByName("datosenvio")[1].style.display = "none";
});


function validarFormLote(LoteADescarte = false) {
	let flag = true;


	let campos = ["deposito","fechaadquisicion","cantidad","loteproveedor"];


	if(document.getElementById("datosenvio").style.display !== "none"){
		campos = ["deposito","fechaadquisicion","cantidad","loteproveedor",
					"provincia","centrodevacunacion","cantidadvacunas"];
	}

	if(LoteADescarte){
		campos = ["deposito","fechaadquisicion","cantidad","loteproveedor","lotepercance","motivodescarteE","formadescarteE"];
	}

	let formlote = document.forms["formlote"];

	if(LoteADescarte){
		campos = ["formadescarte", "motivodescarte", "cantidadadescartar"];
		formlote = document.forms["formlotedescarte"];
	}
	campos.forEach((campo) => {
		console.log(formlote[campo].value.trim(), campo);


		if (formlote[campo].value.trim() === "") {
			console.log(formlote[campo].value.trim(), campo);
			flag = false;
			campoInvalido(campo);
		} else {
			campoValido(campo);
		}

	});

	return flag;
}


function campoInvalido(campo) {
	formlote[campo].classList.add("is-invalid");
	formlote[campo].classList.remove("is-valid");
}

function campoValido(campo) {
	formlote[campo].classList.add("is-valid");
	formlote[campo].classList.remove("is-invalid");
}