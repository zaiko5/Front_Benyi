document.getElementById('startBtn').addEventListener('click', () => {
    fetch('http://localhost:8080/', {
      method: 'POST'
    })
    .then(res => res.ok ? alert('Sensor iniciado') : alert('Error al iniciar'))
    .catch(err => console.error(err));
  });
  
  document.getElementById('stopBtn').addEventListener('click', () => {
    fetch('http://localhost:8080/', {
      method: 'POST'
    })
    .then(res => res.ok ? alert('Sensor detenido') : alert('Error al detener'))
    .catch(err => console.error(err));
  });
  