	var options = {
		animation: true, // Aplicar una transición de desvanecimiento CSS a la tostada
		autohide: true, // Ocultar automáticamente la tostada
		delay: 5000, // Retraso en ocultar la tostada (ms)
	};


var toastEl = document.querySelector(".toast");
if (toastEl) {
	var toast = new bootstrap.Toast(toastEl, options);
	toast.show();
}
