let plazosFijos = [];
const listaPf = document.querySelector('#lista-plazosfijos');

// Simular PF 
btnSimular.addEventListener("click", (e) => {
    depositoCapital = document.querySelector('#capital').value;
    tna = 48 / 100;
    duracion = document.querySelector('#duracion').value;

    if(depositoCapital!='' && duracion>='30'){
        var cf = depositoCapital * (1 + tna * (duracion / 365));
        var interes =  cf - depositoCapital;
            if (depositoCapital >= 1000) {
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
                Toastify({
                    text: "Simulación exitosa",
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
            else {
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
    }else{
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
   
    limpiarHTML();
    
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
});

// Borra Storage
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
          Toastify({
              text: "Borrado exitoso",
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

function limpiarHTML() {
    while(listaPf.firstChild) {
         listaPf.removeChild(listaPf.firstChild);
    }
}
