function validarFormDeposito() {

    let flag = true;
  
    const campos = ["nombreDeposito", "correo", "direccion", "provinciaId", "ciudadNombre"];
  
    campos.forEach(campo => {
  
      if(formDeposito[campo].value === "") {
        flag = false;
        campoInvalido(campo);
      } else {
        campoValido(campo);
      }
  

  
    if(campo === "correo") {
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDeposito[campo].value)) {
        flag = false;
        campoInvalido(campo);
      }
    }
});
  
    return flag;
  
  }
  
  function campoInvalido(campo) {
    formDeposito[campo].classList.add("is-invalid");
    formDeposito[campo].classList.remove("is-valid");  
  }
  
  function campoValido(campo) {
    formDeposito[campo].classList.add("is-valid");
    formDeposito[campo].classList.remove("is-invalid");
  }



  document.addEventListener('DOMContentLoaded', function() {
    const botonesEditar = document.querySelectorAll('.btn-editar');

    botonesEditar.forEach(function(boton) {
        boton.addEventListener('click', function() {

            const depositoId = boton.dataset.depositoId;

            // Obtener el tr ancestro del botón
            const fila = boton.closest('tr');

            const nombreDeposito = fila.querySelector('td:nth-child(2)').textContent;
            const correo = fila.querySelector('td:nth-child(3)').textContent;
            const direccion = fila.querySelector('td:nth-child(4)').textContent;
            const ubicacion = fila.querySelector('td:nth-child(5)').textContent;

            // Asignar los valores al formulario de edición
            document.getElementById('nombreDeposito').value = nombreDeposito;
            document.getElementById('correo').value = correo;
            document.getElementById('direccion').value = direccion;
            //separo la ubicacion
            const [provincia, ciudad] = ubicacion.split(',');
            // Encontrar la opción cuyo texto coincida con el nombre deseado
            const optionToSelect = Array.from(document.getElementById('provinciaId').options).find(option => option.text === provincia);

            // Si se encontró la opción, seleccionarla
            if (optionToSelect) {
                optionToSelect.selected = true;
            }
            /* document.getElementById('provincia').value = provincia.trim(); */
            document.getElementById('ciudadNombre').value = ciudad.trim();

            // Cambiar el action y el method del formulario
            
            const formDeposito = document.getElementById('formDeposito');
            formDeposito.action = "Editar"+ rutaActionCliente+"/" + depositoId +"?_method=PUT" // Cambia a la ruta de edición

            
    
            // Ahora puedes usar la variable rutaActionCliente en tu código JavaScript


           
            document.getElementById('staticBackdropLabel').innerText  = "Editar "+ cartel ;
            
        });
    });


    const botonesPersonal = document.querySelectorAll('.btn-personal');
    botonesPersonal.forEach(function(boton) {
      boton.addEventListener('click', function() {
        const depositoId = boton.dataset.depositoId;
        const asd = document.getElementById('asd');
        asd.innerText = depositoId ;
      });
    });

});


document.addEventListener('DOMContentLoaded', function() {
  const modalDeposito = new bootstrap.Modal(document.getElementById('modalDeposito'));

  // Función para restablecer el formulario
  function resetForm() {
      // Obtén el formulario y restablece su estado
      const formDeposito = document.getElementById('formDeposito');
      formDeposito.reset();


      formDeposito.action = "Registrar"+ rutaActionCliente; // Cambia a la ruta de registro




      document.getElementById('staticBackdropLabel').innerText  = "Registrar "+ cartel ;

  }

  // Asigna la función resetForm al evento show del modal
  modalDeposito._element.addEventListener('show.bs.modal', resetForm);

});