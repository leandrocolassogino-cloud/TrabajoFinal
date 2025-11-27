const form = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const historialCont = document.getElementById("historial");
const darkModeBtn = document.getElementById("darkModeBtn");
const descargarBtn = document.getElementById("descargarBtn");
const agradecimiento = document.getElementById("agradecimiento");

let historial = JSON.parse(localStorage.getItem("tarjetas")) || [];

renderHistorial();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;
  const ocupacion = document.getElementById("ocupacion").value;
  const foto = document.getElementById("foto").files[0];

  let fotoURL = "";
  if (foto) {
    fotoURL = URL.createObjectURL(foto);
  }

  const tarjeta = { nombre, edad, ocupacion, fotoURL };
  mostrarTarjeta(tarjeta);
  guardarEnHistorial(tarjeta);

  descargarBtn.classList.remove("hidden");

  agradecimiento.classList.remove("hidden");
  setTimeout(() => agradecimiento.classList.add("hidden"), 2500);

  form.reset();
});


function mostrarTarjeta(data) {
  resultado.innerHTML = `
    <img src="${data.fotoURL || ""}" alt="Foto" />
    <h3>${data.nombre}</h3>
    <p>Edad: ${data.edad}</p>
    <p>Ocupación: ${data.ocupacion}</p>
  `;
  resultado.classList.remove("hidden");
}


function guardarEnHistorial(tarjeta) {
  historial.push(tarjeta);
  localStorage.setItem("tarjetas", JSON.stringify(historial));
  renderHistorial();
}


function renderHistorial() {
  historialCont.innerHTML = "";

  historial.forEach((t) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${t.fotoURL}" />
      <h4>${t.nombre}</h4>
      <p>${t.edad} años</p>
      <p>${t.ocupacion}</p>
    `;
    historialCont.appendChild(div);
  });
}


darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});


descargarBtn.addEventListener("click", () => {
  html2canvas(resultado).then(canvas => {
    const link = document.createElement("a");
    link.download = "tarjeta.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});
