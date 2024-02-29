function ValidarFormulario(formulario) {
	let flag = true;
	let form = document.forms[formulario];

	// Validar que el nombre contenga solo letras
	if (form["nombre"]) {
		if (!/^[a-zA-Z]+$/.test(form["nombre"].value) || form["nombre"].value === "") {
			flag = false;
			campoInvalido(form["nombre"])
		} else {
			campoValido(form["nombre"])
		}
	}

	// Validar que el apellido contenga solo letras
	if (form["apellido"]) {
		if (!/^[a-zA-Z]+$/.test(form["apellido"].value) || form["apellido"].value === "") {
			flag = false;
			campoInvalido(form["apellido"])
		} else {
			campoValido(form["apellido"])
		}
	}

	// Validar que el correo tenga la forma mail@mail.com
	if (form["correo"]) {
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form["correo"].value) || form["correo"].value === "") {
			flag = false;
			campoInvalido(form["correo"])
		} else {
			campoValido(form["correo"])
		}
	}

	// Validar la contraseña
	if (form["contrasenia"]) {
		if (!/^[a-zA-Z0-9]{6,10}$/.test(form["contrasenia"].value) || form["contrasenia"].value === "") {
			flag = false;
			campoInvalido(form["contrasenia"])
		} else {
			campoValido(form["contrasenia"])
		}
	}
    console.log(flag);
	return flag;
}

function campoInvalido(campo) {
	campo.classList.add("is-invalid");
	campo.classList.remove("is-valid");
}

function campoValido(campo) {
	campo.classList.add("is-valid");
	campo.classList.remove("is-invalid");
}

/* document.addEventListener("DOMContentLoaded", function () {
	var toast = new bootstrap.Toast(document.getElementById("registroExitosoToast"));
	toast.show();
});
 */