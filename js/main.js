let plazosFijos = [];
const listaPf = document.querySelector('#lista-plazosfijos');
cargoSimulaciones()

// Evento Actualizo Tasa de Interes
  nombreBanco.addEventListener("change", (e) => {
  var tnaSeleccionada = document.getElementById("nombreBanco");
  const urlTna = "./js/datos.json";
  const actualizoTasa = async ()=>{
    const buscoTasa = await fetch(urlTna)
    const buscoBanco = await fetch(urlTna)
    const tasa = await buscoTasa.json()
    const bancoNombre = await buscoBanco.json()
    function obtenerTasaPorId() {
      return id = tnaSeleccionada.value;
    }
    function buscarID(element) {
      return element.id == obtenerTasaPorId();
    }
    encuentroTasa = tasa.filter(buscarID)
    encuentroBanco = bancoNombre.filter(buscarID)
    document.getElementById("tnaPf").innerHTML = encuentroTasa[0].tna+"%";
  }
  actualizoTasa()
});

// Evento Botón Simular Plazo Fijo 
btnSimular.addEventListener("click", (e) => {
  banco = document.querySelector('#nombreBanco').value;
  depositoCapital = document.querySelector('#capital').value;
  duracion = document.querySelector('#duracion').value;
  if(banco=='-'){
    errorBanco();
    } else {
      if(depositoCapital < 1000){
        errorMonto();
      } else {
        if (duracion < 30) {
          errorDuración();
        } else {
          simularPF();
          limpiarHTML();
          listaSimulación();
        }
      }
    }
});

// Evento Botón Borrar Storage
btnBorrarStorage.addEventListener("click", (e) => {
  if(localStorage.length == 0){
    Swal.fire({
      title: 'No existen simulaciones almacenadas',
      type: 'warning',
      })
    } else {
      Swal.fire({
        title: 'Esta seguro que desear borrar las simulaciones efectuadas?',
        text: 'Esta acción no es reversible!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar!',
        cancelButtonText: 'No, mantenerlo'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
          'Simulaciones borradas!',
          )
          localStorage.clear();
          plazosFijos = [];
          limpiarHTML();
          mensajeBorrado();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Las simulaciones no han sido borradas',
            'error'
          )
        }
      })
    }
  });

// Funcion Simular
function simularPF() {
  tna = encuentroTasa[0].tna / 100;
  nombreBanco = encuentroBanco[0].banco
  var cf = depositoCapital * (1 + tna * (duracion / 365));
  var interes =  cf - depositoCapital;
  document.getElementById("calc_result").innerHTML = cf.toFixed(2);
  document.getElementById("calc_interes").innerHTML = interes.toFixed(2);
  document.getElementById("calc_tna").innerHTML = encuentroTasa[0].tna+"%";
  document.getElementById("nBanco").innerHTML = nombreBanco;
  document.getElementById("dias").innerHTML = duracion + ' dias';
  document.getElementById("monto").innerHTML = depositoCapital;
  document.getElementById("clac_error").innerHTML = '';
  const pfObj = {
    id: Date.now(),
    capital: depositoCapital,
    duracion: duracion,
    tna: tna,
    banco: nombreBanco,
    interes: interes.toFixed(2),
    monto: cf.toFixed(2)
  }
  if(localStorage.length != 0){
    plazosFijos = JSON.parse(localStorage.getItem("id"));
  }
  plazosFijos = [...plazosFijos, pfObj]
      localStorage.setItem("id", JSON.stringify(plazosFijos));
      mensajeSimulacion();
 }

// Función Incorpora Simulación a Lista
function listaSimulación(){
  const $listaplazosfijos = document.querySelector("#lista-plazosfijos");
  // Recorrer todos los plazos fijos
  plazosFijos.forEach(pfObj => {
  // Crear un <tr>
  const $tr = document.createElement("tr");
  // El td del Id
  let $tdId = document.createElement("td");
  $tdId.textContent = pfObj.id;
  $tr.appendChild($tdId);
  // Creamos el <td> de Banco
  let $tdBanco = document.createElement("td");
  $tdBanco.textContent = pfObj.banco; 
  $tr.appendChild($tdBanco);
  // El td de Capital
  let $tdCapital = document.createElement("td");
  $tdCapital.textContent = pfObj.capital;
  $tr.appendChild($tdCapital);
  // El td de Duracion
  let $tdDuracion = document.createElement("td");
  $tdDuracion.textContent = pfObj.duracion;
  $tr.appendChild($tdDuracion);
  // El td de Tasa
  let $tdTasa = document.createElement("td");
  $tdTasa.textContent = pfObj.tna.toFixed(2)*100+'%';
  $tr.appendChild($tdTasa);
  // El td del Interes
  let $tdInteres = document.createElement("td");
  $tdInteres.textContent = pfObj.interes;
  $tr.appendChild($tdInteres);
  // El td del Monto Total
  let $tdMonto = document.createElement("td");
  $tdMonto.textContent = pfObj.monto;
  $tr.appendChild($tdMonto);
  // Finalmente agregamos el <tr> al cuerpo de la tabla
  $listaplazosfijos.appendChild($tr);
});
}

// Función Muestra Simulaciones
function cargoSimulaciones() {
  if(localStorage.length != 0){
    const $listaplazosfijos = document.querySelector("#lista-plazosfijos");
    const $listaSimulaciones = JSON.parse(localStorage.getItem("id"));
    // Recorrer todos los productos
    $listaSimulaciones.forEach($listaSimulaciones => {
      // Crear un <tr>
      const $tr = document.createElement("tr");
      // El td del Id
      let $tdId = document.createElement("td");
      $tdId.textContent = $listaSimulaciones.id;
      $tr.appendChild($tdId);
      // Creamos el <td> de Banco
      let $tdBanco = document.createElement("td");
      $tdBanco.textContent = $listaSimulaciones.banco; 
      $tr.appendChild($tdBanco);
      // El td de Capital
      let $tdCapital = document.createElement("td");
      $tdCapital.textContent = $listaSimulaciones.capital;
      $tr.appendChild($tdCapital);
      // El td de Duracion
      let $tdDuracion = document.createElement("td");
      $tdDuracion.textContent = $listaSimulaciones.duracion;
      $tr.appendChild($tdDuracion);
      // El td de Tasa
      let $tdTasa = document.createElement("td");
      $tdTasa.textContent = $listaSimulaciones.tna.toFixed(2)*100+'%';
      $tr.appendChild($tdTasa);
      // El td del Interes
      let $tdInteres = document.createElement("td");
      $tdInteres.textContent = $listaSimulaciones.interes;
      $tr.appendChild($tdInteres);
      // El td del Monto Total
      let $tdMonto = document.createElement("td");
      $tdMonto.textContent = $listaSimulaciones.monto;
      $tr.appendChild($tdMonto);
      // Finalmente agregamos el <tr> al cuerpo de la tabla
      $listaplazosfijos.appendChild($tr);
    });
  }
}

// Función LimpiarHTML
function limpiarHTML() {
    while(listaPf.firstChild) {
      listaPf.removeChild(listaPf.firstChild);
    }
}

// Listar Bancos con Tasas
const listaTasas= document.querySelector("#tasas")
const url = "./js/datos.json";
const consultarTasas = async ()=>{
    const respuesta = await fetch(url)
    const tasas = await respuesta.json()
    tasas.forEach((tasas) => {
      const li = document.createElement("li");
      const { id, banco, tna } = tasas;
      li.innerHTML = `${banco.toUpperCase()} otorga una tasa de ${tna}%`;
      listaTasas.append(li);
    });
  }
  consultarTasas()

// Llenar Combo con Bancos
const comboBancos = document.querySelector("#nombreBanco");
fetch(url, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(lista_de_bancos => {
    for (let banco of lista_de_bancos) {
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.value = banco.id;
      nuevaOpcion.text = banco.banco;
      comboBancos.appendChild(nuevaOpcion);
    }
  })
  .catch(function(error) {
    errorComboBanco();
  })

// -------------------- Funciones de Mensajes Toastify ----------------------------
// Función Mensaje Error Plazo < 30
function errorDuración(){
  Toastify({
    text: "Debe ingresar un plazo mayor o igual a 30 días.",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
}

// Función Mensaje Importe < 1000
function errorMonto(){
  Toastify({
    text: "Debe ingresar un monto mayor o igual a $1000.",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
}

// Función Mensaje Banco sin Seleccionar
function errorBanco(){
  Toastify({
    text: "Debe seleccionar un Banco.",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
}

// Función Mensaje Borrado Exitoso
function mensajeBorrado(){
  Toastify({
    text: "Simulaciones borradas.",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
}

// Función Mensaje Simulación
function mensajeSimulacion(){
  Toastify({
    text: "Simulación exitosa.",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
}

function errorComboBanco(){
  Toastify({
    text: "Fallo la carga de los Bancos.",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
}