let plazosFijos = [];
const listaPf = document.querySelector('#lista-plazosfijos');

// Evento Actualizo Tasa
var tnaSeleccionada = document.getElementById("nombreBanco");

tnaSeleccionada.addEventListener("change", (e) => {
  //const tna = document.querySelector('.nombreBanco');
  console.log(tnaSeleccionada.value);
  

}) 

// Evento Botón Simular Plazo Fijo 
btnSimular.addEventListener("click", (e) => {
  banco = document.querySelector('#nombreBanco').value;
  depositoCapital = document.querySelector('#capital').value;
  tna = 48 / 100;
  duracion = document.querySelector('#duracion').value;
  console.log(banco);

  if(banco=='-'){
    errorBanco();
    } else {
      if(depositoCapital<='1000'){
        errorMonto();
      } else {
        if (duracion<'30') {
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
    Swal.fire({
        title: 'Esta seguro que desear borrar el storage?',
        text: 'Esta acción no es reversible!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar!',
        cancelButtonText: 'No, mantenerlo'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Storage borrado!',
          )
          localStorage.clear();
          plazosFijos = [];
          limpiarHTML();
          mensajeBorrado();
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'El storage no ha sido borrado',
            'error'
          )
        }
      })
  });

// Funcion Simular
function simularPF() {
  var cf = depositoCapital * (1 + tna * (duracion / 365));
  var interes =  cf - depositoCapital;
  document.getElementById("calc_result").innerHTML = cf.toFixed(2);
  document.getElementById("calc_interes").innerHTML = interes.toFixed(2);
  document.getElementById("tna").innerHTML = tna.toFixed(2)+"%";
  document.getElementById("dias").innerHTML = duracion + ' dias';
  document.getElementById("monto").innerHTML = depositoCapital;
  document.getElementById("clac_error").innerHTML = '';
  const pfObj = {
    id: Date.now(),
    detalle: depositoCapital,duracion,tna
  }
  plazosFijos = [...plazosFijos, pfObj]
      console.log(plazosFijos);
      localStorage.setItem("id", JSON.stringify(plazosFijos));
      mensajeSimulacion();
 }

// Función Incorpora Simulación a Lista
function listaSimulación(){
  if(plazosFijos.length > 0) {
    plazosFijos.forEach( pfObj =>  {
    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    // Añade el id del plazo fijo
    li.innerText = pfObj.id;
    // añade un atributo único...
    li.dataset.plazosfijosId = pfObj.id;
    // añade el plazo fijo a la lista
    listaPf.appendChild(li);
    })
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
    console.log(tasas);
}
consultarTasas()

// Llenar Combo con Bancos
const select = document.querySelector("#nombreBanco");
fetch(url, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(lista_de_bancos => {
    for (let banco of lista_de_bancos) {
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.value = banco.id;
      nuevaOpcion.text = banco.banco;
      select.appendChild(nuevaOpcion);
    }
  })
  .catch(function(error) {
    console.error("¡Error!", error);
  })

// Funciones de Mensajes Toastify
// Función Mensaje Error Plazo < 30
function errorDuración(){
  Toastify({
    text: "Ingrese un plazo mayor a 30 días.",
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
    text: "Ingrese valor mayor a $1000.",
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
    text: "Borrado exitoso.",
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