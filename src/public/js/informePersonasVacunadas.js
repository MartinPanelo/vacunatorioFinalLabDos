document.addEventListener("DOMContentLoaded", function () {
	const centrodevacunacionid = document.getElementById("centrodevacunacionid");
	const ciudad = document.getElementById("ciudad");
    const provincia = document.getElementById("provincia");

	centrodevacunacionid.addEventListener("change", function () {
		switchInput(centrodevacunacionid, ciudad);
	});

	ciudad.addEventListener("change", function () {
		switchInput(ciudad, centrodevacunacionid);
	});

    provincia.addEventListener("change", function () {
        centrodevacunacionid.disabled = false;
        provincia.disabled = false;
    })


	function switchInput(selected, other) {
		other.disabled = selected.value !== "";
	}

	

	provincia.addEventListener("change", function () {
		// Limpia las opciones actuales en el campo de selección de vacunas
		ciudad.innerHTML = "";

		// Obtener el texto de la provincia seleccionada
		var provinciaSeleccionada = provincia.options[provincia.selectedIndex].textContent.trim();

		// Crear un conjunto para almacenar ciudades únicas
		var ciudadesUnicas = new Set();

		// Iterar sobre las personas vacunadas
		personasVacunadas.forEach(function (p) {
			// Obtener la provincia de la ubicación de la persona vacunada
			var provinciaPersona = p.paciente.ciudad.provincia.nombre.trim();

			// Comparar la provincia de la persona con la provincia seleccionada
			if (provinciaPersona === provinciaSeleccionada) {
				// Agregar la ciudad al conjunto de ciudades únicas
				ciudadesUnicas.add(p.paciente.ciudad.nombre);
			}
		});

		// Limpiar el campo de selección de ciudades
		ciudad.innerHTML = "";

		// Agregar las ciudades únicas al campo de selección de ciudades
        var option = document.createElement("option");
			option.value = "";
			option.text = "- Seleccione -";
			ciudad.appendChild(option);
		ciudadesUnicas.forEach(function (ciudadUnica) {
			var option = document.createElement("option");
			option.value = ciudadUnica;
			option.text = ciudadUnica;
			ciudad.appendChild(option);
		});
	});
});
