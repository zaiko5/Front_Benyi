//Constantes.
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const status = document.getElementById('status');
const spinner = document.getElementById('spinner');

//Cuando se cliquee el boton con el id startBtn
startBtn.addEventListener('click', () => {
  toggleSpinner(true);  //Se llama a la funcion para quitar la clase hidden del spinner (comienza la carga del spinner)
  //Se consume el endpoint de la api en el metodo post
  fetch('http://localhost:8080', { method: 'POST' })
    .then(res => { //(Funcion flecha), despues de que cargue la respuesta....
      toggleSpinner(false); //Se agrega de nuevo la clase hidden al spinner
      if (res.ok) { //Si la respuesta es el codigo 200
        updateStatus(true); //Se actualiza el status del front a "Enviando datos"
      } else { //Si no...
        alert('Error al iniciar el sensor');
      }
    })
    .catch(err => { //Manejo de excepcion
      toggleSpinner(false); //Se agrega la clase hidden al spinner
      console.error(err); //Se muestra la excepcion
      alert('Error al conectar con el backend'); //Se mnanda la alerta.
    });
});

//Funcion para detener el envio de datos
stopBtn.addEventListener('click', () => {
  toggleSpinner(true); //Comenzar la carga del spinner
  fetch('http://localhost:8080', { method: 'POST' }) //Se llama al endpoint de salida
    .then(res => { //Despues de la respuesta
      toggleSpinner(false); //Se quita la carga del spinner
      if (res.ok) { //Si la respuesta es 200
        updateStatus(false); //Se actualiza el estado del front a "Sensor apagado"
      } else { //Si es otro codigo de respuesta...
        alert('Error al detener el sensor');
      }
    })
    .catch(err => { //Excepçion
      toggleSpinner(false); //Se quita el spinner
      console.error(err);
      alert('Error al conectar con el backend'); //Se manda el mensaje de error
    });
});

/**
 * Funcion para actualizar el status que se muestr asobre el sensor
 * @param {*} isActive  (booleano), si es true (el sensor esta activo) se cambia el texto a enviando datos, se elimina el off y se agrega como clase el on, esto afecta en el css el color del div.
 * Si no esta activo el texto sera igual el der sernsor detenido, el on se delimina y se agrega el off.
 */
function updateStatus(isActive) {
  if (isActive) {
    status.textContent = '🔄 Enviando datos...';
    status.classList.remove('off');
    status.classList.add('on');
  } else {
    status.textContent = '⛔ Sensor detenido';
    status.classList.remove('on');
    status.classList.add('off');
  }
}

/**
 * Funcion que agrega o quita la clase hidden en el HTMl.
 * @param {*} show que puede ser true o false, si existe el parametro se quitará el hidden, si no existe se agregará, esto afecta al display del spinner.
 */
function toggleSpinner(show) {
  if (show) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
}
