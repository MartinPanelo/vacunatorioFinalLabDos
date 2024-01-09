function validarCuentaregistro() {
    let formRegistro = document.forms["formRegistro"];
    flag = true;

    // Validar que el nombre contenga solo letras
    if (!/^[a-zA-Z]+$/.test(formRegistro["nombre"].value) || formRegistro["nombre"].value === "") {
        flag = false;
        formRegistro["nombre"].classList.add("is-invalid");
        formRegistro["nombre"].classList.remove("is-valid");
    } else {
        formRegistro["nombre"].classList.add("is-valid");
        formRegistro["nombre"].classList.remove("is-invalid");
    }

    // Validar que el apellido contenga solo letras
    if (!/^[a-zA-Z]+$/.test(formRegistro["apellido"].value) || formRegistro["apellido"].value === "") {
        flag = false;
        formRegistro["apellido"].classList.add("is-invalid");
        formRegistro["apellido"].classList.remove("is-valid");
    } else {
        formRegistro["apellido"].classList.add("is-valid");
        formRegistro["apellido"].classList.remove("is-invalid");
    }

    // Validar que el correo tenga la forma mail@mail.com
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formRegistro["correo"].value) || formRegistro["correo"].value === "") {
        flag = false;
        formRegistro["correo"].classList.add("is-invalid");
        formRegistro["correo"].classList.remove("is-valid");
    } else {
        formRegistro["correo"].classList.add("is-valid");
        formRegistro["correo"].classList.remove("is-invalid");
    }

    // Validar la contraseña
    if (!/^[a-zA-Z0-9]{6,10}$/.test(formRegistro["contrasenia"].value) || formRegistro["contrasenia"].value === "") {
        flag = false;
        formRegistro["contrasenia"].classList.add("is-invalid");
        formRegistro["contrasenia"].classList.remove("is-valid");
    } else {
        formRegistro["contrasenia"].classList.add("is-valid");
        formRegistro["contrasenia"].classList.remove("is-invalid");
    }

    return flag;
}


function validarLogeo() {
    let formLogin = document.forms["formLogin"];
    flag = true;

    // Validar que el correo tenga la forma mail@mail.com
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formLogin["correo"].value) || formLogin["correo"].value === "") {
        flag = false;
        formLogin["correo"].classList.add("is-invalid");
        formLogin["correo"].classList.remove("is-valid");
    } else {
        formLogin["correo"].classList.add("is-valid");
        formLogin["correo"].classList.remove("is-invalid");
    }

    // Validar la contraseña
    if (!/^[a-zA-Z0-9]{6,10}$/.test(formLogin["contrasenia"].value) || formLogin["contrasenia"].value === "") {
        flag = false;
        formLogin["contrasenia"].classList.add("is-invalid");
        formLogin["contrasenia"].classList.remove("is-valid");
    } else {
        formLogin["contrasenia"].classList.add("is-valid");
        formLogin["contrasenia"].classList.remove("is-invalid");
    }

    return flag;
}



document.addEventListener('DOMContentLoaded', function () {
    var toast = new bootstrap.Toast(document.getElementById('registroExitosoToast'));
    toast.show();
  });