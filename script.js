fetch('data.json')
  .then(res => res.json())
  .then(({ semestres, prerrequisitos }) => {
    const cont = document.getElementById('contenedor-malla');
    const estado = {}; // ramos aprobados

    function crearRamo(name) {
      const div = document.createElement('div');
      div.className = 'ramo';
      div.textContent = name;
      div.dataset.name = name;
      if (prerrequisitos[name]) div.classList.add('bloqueado');

      div.addEventListener('click', () => {
        if (div.classList.contains('bloqueado')) return;

        if (!div.classList.contains('aprobado')) {
          div.classList.add('aprobado');
          div.classList.remove('reprobado');
        } else {
          div.classList.remove('aprobado');
        }
        estado[name] = div.classList.contains('aprobado');
        desbloquear();
      });
      return div;
    }

    function desbloquear() {
      document.querySelectorAll('.ramo.bloqueado').forEach(el => {
        const name = el.dataset.name;
        const reqs = prerrequisitos[name];
        if (reqs.every(r => estado[r])) el.classList.remove('bloqueado');
      });
    }

    Object.entries(semestres).forEach(([sem, ramos]) => {
      const sdiv = document.createElement('div');
      sdiv.className = 'semestre';
      const h2 = document.createElement('h2');
      h2.textContent = sem;
      sdiv.appendChild(h2);
      ramos.forEach(r => sdiv.appendChild(crearRamo(r)));
      cont.appendChild(sdiv);
    });
  })
  .catch(err => console.error('Error cargando data.json:', err));
