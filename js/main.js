let ingreso = prompt(
    "Hola, te interesa hacer un desafio de: \n 1-Matemáticas (if-else) \n 2-Inglés (while) \n 3-Jugar con Arrays"
);

switch (ingreso) {
    case "1":
        let examen_matematicas = prompt(
            "Perfecto, por favor indicar cuanto es 21 + 37?"
        );
        if (examen_matematicas == 58) {
            alert("Excelente. Estas aprobado!");
            break;
        } else {
            alert("Uhhh. Respuesta incorrecta!");
            break;
        }
        
    case "2":
        let examen_ingles = prompt(
            "Perfect.\n Guess what color I'm thinking? (response in lowercase)  (azul)"
        );
        let intentos = 0;
        while (examen_ingles != "blue" && intentos <= 3) {
            // ejecutamos el código
            alert(examen_ingles +". Im thinking of another color. Try again.");
            
            // condicion de salida
            if (intentos == 3) {
                examen_ingles = prompt("Try again. Last chance.");
                intentos++;
                console.log(intentos);
            } else {
                examen_ingles = prompt("Try again");
                intentos++;
                console.log(intentos);
            }
        }
        if(examen_ingles == "blue") {
            alert("Excelent. You are a genious!")
            break;
        }   
            alert("Ups. Wrong answer. Goodbye!")
        break;

        case "3":

            const contactos = [];
            function agregarContacto() {
              let nuevoContacto = { Nombre: "", Altura: 0.0 };
              nuevoContacto.Nombre = prompt("Ingrese el nombre");
              nuevoContacto.Altura = parseInt(prompt("Ingrese la altura (en centimetros)"));
              contactos.push(nuevoContacto);
              console.clear();
              console.table(contactos);
            }
            
            function listarContactos() {
              let filas = "";
              let muestra = "";
              for (elemento of contactos) {
                filas += `<tr><td>${elemento.Nombre}</td><td>${elemento.Altura}</td></tr>`;
                muestra += `${elemento.Nombre} mide ${elemento.Altura}.<br>`;
                }
                document.getElementById("here").innerHTML = muestra;
            }
            

            function sumarAlturas() {
              const resultado = contactos.reduce(
                (acumulador, elem) => (acumulador += elem.Altura),
                0.0
              );

                console.log("Todos sus contactos miden:", resultado, " cms");
                

            }
            
            while (confirm("¿Desea agregar un contacto a su agenda?")) {
              agregarContacto();
            }
            
            listarContactos();
            sumarAlturas();


                  
        break;
    


    default:
        alert("Opción no valida");
        break;
}