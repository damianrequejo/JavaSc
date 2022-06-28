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
            } 
            else {
                document.getElementById("clac_error").innerHTML = 'Ingrese valor mayor a $1000.';
            }
    }else{
            document.getElementById("clac_error").innerHTML = 'Ingrese un plazo mayor a 30.';
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
    localStorage.clear();
    plazosFijos = [];
    limpiarHTML();
});

function limpiarHTML() {
    while(listaPf.firstChild) {
         listaPf.removeChild(listaPf.firstChild);
    }
}
