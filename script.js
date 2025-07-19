const data = {
  semestres: /* los datos se insertan aquí */,
  prerrequisitos: /* los datos se insertan aquí */
};

// Para mantener el HTML limpio, insertamos JSON por separado:
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const { semestres, prerrequisitos } = data;
    const contenedor = document.getElementById("contenedor-malla");

    const estadoRamos = {};

    function crearRamo(nombre) {
      const div = document.createElement("div");
      div.classList.add("ramo");
      div.textContent = nombre;
      div.dataset.nombre = nombre;

      if (prerrequisitos[nombre]) {
        div.classList.add("bloqueado");
      }

      div.addEventListener("click", () => {
        if (div.classList.contains("bloqueado")) return;

        div.classList.toggle("aprobado");
        div.classList.toggle("reprobado");

        estadoRamos[nombre] = div.classList.contains("aprobado");
        desbloquearRamos();
      });

      return div;
    }

    function desbloquearRamos() {
      document.querySelectorAll(".ramo.bloqueado").forEach(ramo => {
        const nombre = ramo.dataset.nombre;
        const prereqs = prerrequisitos[nombre];

        if (prereqs && prereqs.every(pr => estadoRamos[pr])) {
          ramo.classList.remove("bloqueado");
        }
      });
    }

    for (const [semestre, ramos] of Object.entries(semestres)) {
      const semDiv = document.createElement("div");
      semDiv.classList.add("semestre");
      const title = document.createElement("h3");
      title.textContent = semestre;
      semDiv.appendChild(title);

      ramos.forEach(nombre => {
        semDiv.appendChild(crearRamo(nombre));
      });

      contenedor.appendChild(semDiv);
    }
  });
