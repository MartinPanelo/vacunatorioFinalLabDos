document.addEventListener("DOMContentLoaded", function () {
	const botonesAplicarVacuna = document.querySelectorAll(".btn-aplicar");

	

	function ModalConDatos(boton) {
		// Obtener el tr ancestro del botón
		const fila = boton.closest("tr");

		// Obtener los datos de la fila
		const idLoteProveedor = fila.querySelector("td:nth-child(1)").textContent;
		const idLoteCentroDeVacunacion = fila.querySelector("td:nth-child(3)").textContent;
		const fechaDeVencimiento = fila.querySelector("td:nth-child(10)").textContent;
		const idCentroDeVacunacion = boton.dataset.idcentrodevacunacion;

		document.getElementById("idLoteProveedor").value = idLoteProveedor;
		document.getElementById("idLoteCentroDeVacunacion").value = idLoteCentroDeVacunacion;
		document.getElementById("idCentroDeVacunacion").value = idCentroDeVacunacion;
		document.getElementById("fechaDeVencimiento").value = fechaDeVencimiento;
	}

	botonesAplicarVacuna.forEach(function (boton) {
		boton.addEventListener("click", function () {
			ModalConDatos(boton);
			const formlote = document.getElementById("formlote");
			formlote.action = "AplicarVacuna"; // Cambia a la ruta de edición

			const botonAceptarModal = document.getElementById("btnAceptar");

			
			

			if(new Date(document.getElementById("fechaDeVencimiento").value) <= new Date()){
				
			
				botonAceptarModal.classList.add("btn-danger");
				botonAceptarModal.classList.remove("btn-primary");
				botonAceptarModal.setAttribute("data-bs-trigger", "hover focus");
				botonAceptarModal.setAttribute("data-bs-container", "body");
				botonAceptarModal.setAttribute("data-bs-toggle", "popover");
				botonAceptarModal.setAttribute("data-bs-placement", "top");
				botonAceptarModal.setAttribute("data-bs-html", "true");
					const fechaActual = new Date();
					const año = fechaActual.getFullYear();
					const mes = fechaActual.getMonth() + 1;
					const dia = fechaActual.getDate();

					const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

				botonAceptarModal.setAttribute("data-bs-content",
				`<ul ">
					<li class="text-nowrap" >Fecha de vencimiento: ${document.getElementById("fechaDeVencimiento").value}</li>
					<li>Fecha actual : ${fechaFormateada}</li>
				</ul>`
				);
				botonAceptarModal.setAttribute("title", "🚫 ¡¡Vacuna vencida!!");
				
				popover();


				
			}else{

				botonAceptarModal.classList.add("btn-primary");
				botonAceptarModal.classList.remove("btn-danger");
				console.log("entro")
				removePopovers();
				
			}
			
		
		


		

				
		});
	});

	//-----------------------------------------------------

	const botonesEditarVacuna = document.querySelectorAll(".btn-editar");
	const botonesReasignarVacuna = document.querySelectorAll(".btn-distribuir");


	botonesEditarVacuna.forEach(function (boton) {
			boton.addEventListener("click", function () {

				const idLoteCentroDeVacunacion =  boton.dataset.loteid;

				const fila = boton.closest("tr");

				// Obtener los datos de la fila
				const idCentroDeVacunacion =  boton.dataset.depositocentrodevacunacionid;
				document.getElementById("deposito").value = idCentroDeVacunacion;

				const idLoteProvincial = fila.querySelector("td:nth-child(2)").textContent;
				document.getElementById("loteprovincial").value = idLoteProvincial;

				const fechaadquisicion = fila.querySelector("td:nth-child(9)").textContent;
				const cantidadDeVacunas = fila.querySelector("td:nth-child(7)").textContent;
				const cantidadDeVacunasDisponibles = fila.querySelector("td:nth-child(8)").textContent;

				document.getElementById("fechaadquisicion").value = fechaadquisicion;
				document.getElementById("cantidad").value = cantidadDeVacunas;
				document.getElementById("cantidadDisponible").value = cantidadDeVacunasDisponibles;

				const formlote = document.getElementById("formloteEditarReasignar");
				formlote.action = "EditarLoteCentroDeVacunacion/" + idLoteCentroDeVacunacion + "?_method=PUT"; // Cambia a la ruta de edición



				document.getElementById("deposito").disabled = false;
				document.getElementById("fechaadquisicion").readOnly  = false;
				document.getElementById("cantidad").readOnly  = false;
				//document.getElementById("cantidadDisponible").disabled = true;
				document.getElementById("loteprovincial").disabled   = false;
				document.getElementById("datosenvio").style.display = "none";



				document.getElementById("cantidadvacunas").disabled  = true;
				//document.getElementById("centrodevacunacion").disabled  = true;
				document.getElementById("depositoreasignado").disabled  = true;

				
				document.getElementById("titulomodal").innerText = "Editar Lote";

			}
		);
	});


	botonesReasignarVacuna.forEach(function (boton) {
		boton.addEventListener("click", function () {

			const idLoteCentroDeVacunacion =  boton.dataset.loteid;

			const fila = boton.closest("tr");

			// Obtener los datos de la fila
			const idCentroDeVacunacion =  boton.dataset.depositocentrodevacunacionid;
			document.getElementById("deposito").value = idCentroDeVacunacion;

			const idLoteProvincial = fila.querySelector("td:nth-child(2)").textContent;
			document.getElementById("loteprovincial").value = idLoteProvincial;

			const fechaadquisicion = fila.querySelector("td:nth-child(9)").textContent;
			const cantidadDeVacunas = fila.querySelector("td:nth-child(7)").textContent;
			const cantidadDeVacunasDisponibles = fila.querySelector("td:nth-child(8)").textContent;

			document.getElementById("fechaadquisicion").value = fechaadquisicion;
			document.getElementById("cantidad").value = cantidadDeVacunas;
			document.getElementById("cantidadDisponible").value = cantidadDeVacunasDisponibles;

			document.getElementById("idloteprovincial").value = idLoteProvincial;
			document.getElementById("idlotecentrosalida").value = idLoteCentroDeVacunacion;

			const formlote = document.getElementById("formloteEditarReasignar");
			formlote.action = "ReasignarLoteCentroDeVacunacion"; // Cambia a la ruta de edición

			document.getElementById("deposito").disabled = true;
			document.getElementById("fechaadquisicion").readOnly  = true;
			document.getElementById("cantidad").readOnly  = true;
			//document.getElementById("cantidadDisponible").disabled = true;
			document.getElementById("loteprovincial").disabled   = true;
			document.getElementById("datosenvio").style.display = "block";



				document.getElementById("cantidadvacunas").disabled  = false;
			//	document.getElementById("centrodevacunacion").disabled  = false;
				document.getElementById("depositoreasignado").disabled  = false;

				document.getElementById("titulomodal").innerText = "Reasignar Lote";

				document.getElementById("cantidadvacunas").min = 1;
				document.getElementById("cantidadvacunas").max = cantidadDeVacunasDisponibles;
				
		}
	);
});










	//-----------------------------------------------------


	const enfermero = document.getElementById("idEnfermero");
	enfermero.addEventListener("change", function () {
		console.log(enfermero.value)// es el id
        if(enfermero.value !== ""){
			document.getElementById("nombreEnfermero").disabled = true;
			document.getElementById("apellidoEnfermero").disabled = true;
			document.getElementById("DNIEnfermero").disabled = true;
			document.getElementById("correoEnfermero").disabled = true;
			document.getElementById("matriculaEnfermero").disabled = true;
        }else{
			document.getElementById("nombreEnfermero").disabled = false;
			document.getElementById("apellidoEnfermero").disabled = false;
			document.getElementById("DNIEnfermero").disabled = false;
			document.getElementById("correoEnfermero").disabled = false;
			document.getElementById("matriculaEnfermero").disabled = false;
		}
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
				"Identificador lote provincial: " + fila.querySelector("td:nth-child(2)").textContent,
				"identificador lote centro de vacunacion: " + fila.querySelector("td:nth-child(3)").textContent,
				"nombre del centro de vacunacion: " + fila.querySelector("td:nth-child(4)").textContent,
				"ubicacion del centro de vacunacion: " + fila.querySelector("td:nth-child(5)").textContent,
				"vacuna: " + fila.querySelector("td:nth-child(6)").textContent,
				"cantidad de vacunas disponibles: " + fila.querySelector("td:nth-child(8)").textContent,
				"fecha de adquisicion: " + fila.querySelector("td:nth-child(9)").textContent,
				"fecha de vencimiento: " + fila.querySelector("td:nth-child(10)").textContent,
				"estado del lote: " + fila.querySelector("td:nth-child(11)").textContent,

			];

				document.getElementById("cantidadadescartar").min = 1;
				document.getElementById("cantidadadescartar").max = parseInt(fila.querySelector("td:nth-child(8)").textContent);

			datos.forEach(dato => {
				const nuevoElementoLi = document.createElement("li");
				nuevoElementoLi.textContent = dato;
				InfoLoteDescarte.appendChild(nuevoElementoLi);
			});
			const LoteADescartar = document.getElementById("LoteADescartarId");
			
			LoteADescartar.value = boton.getAttribute("data-lote-id");



		}




	
});

function validarFormLote(modal) {

	//console.log(new Date(document.getElementById("fechaDeVencimiento").value) < new Date());
	let flag = true;
	let formlote
	if(modal = "reasignar"){
		formlote = document.forms["formloteEditarReasignar"];

		if (formlote["depositoreasignado"].value.trim() === "") {
			flag = false;
			campoInvalido(formlote["depositoreasignado"]);
		} else {
			campoValido(formlote["depositoreasignado"]);
		}
	}
	

/* 	if(new Date(document.getElementById("fechaDeVencimiento").value) < new Date()){
		
		
		return true;
	} */

	return true;

}


function popover() {
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
	  return new bootstrap.Popover(popoverTriggerEl);
	});
  }

  function removePopovers() {
    var popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(function(popoverTriggerEl) {
        var popover = bootstrap.Popover.getInstance(popoverTriggerEl);
        if (popover) {
            popover.dispose();
        }
    });
}


function campoInvalido(campo) {
	formlote[campo].classList.add("is-invalid");
	formlote[campo].classList.remove("is-valid");
}

function campoValido(campo) {
	formlote[campo].classList.add("is-valid");
	formlote[campo].classList.remove("is-invalid");
}