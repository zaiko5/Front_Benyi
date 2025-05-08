//Constantes.
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const status = document.getElementById('status');
const spinner = document.getElementById('spinner');

//Cuando se cliquee el boton con el id startBtn
startBtn.addEventListener('click', () => {
  toggleSpinner(true);
  fetch('http://localhost:8080', { method: 'POST' })
    .then(res => {
      toggleSpinner(false);
      if (res.ok) {
        updateStatus(true);
      } else {
        alert('Error al iniciar el sensor');
      }
    })
    .catch(err => {
      toggleSpinner(false);
      console.error(err);
      alert('Error al conectar con el backend');
    });
});

stopBtn.addEventListener('click', () => {
  toggleSpinner(true);
  fetch('http://localhost:8080', { method: 'POST' })
    .then(res => {
      toggleSpinner(false);
      if (res.ok) {
        updateStatus(false);
      } else {
        alert('Error al detener el sensor');
      }
    })
    .catch(err => {
      toggleSpinner(false);
      console.error(err);
      alert('Error al conectar con el backend');
    });
});

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

function toggleSpinner(show) {
  if (show) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
}
