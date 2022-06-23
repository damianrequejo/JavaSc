 
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
            } 
            else {
                document.getElementById("clac_error").innerHTML = 'Ingrese valor mayor a $1000.';
            }
    }else{
            document.getElementById("clac_error").innerHTML = 'Ingrese un plazo mayor a 30.';
    }

});
