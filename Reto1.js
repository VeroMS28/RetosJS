//Meto los contadores para que se muestren en pantalla luego
let contadorParejas = 0;
let contadorMovimientos = 0; 

//Tengo que tener la primera y segunda carta para luego compararlas
//El bloqueado está falso por defecto para que cuando se haga la pareja se ponga true
let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;

//Referencias a los elementos de la página para mostrar los contadores
const parejasConseguidas = document.getElementById("parejas");
const movimientos = document.getElementById("movimientos");

//Se define un array con las imágenes repetidas para que así tenga su pareja
let imagenes = [0,1,2,3,0,1,2,3];

//Función para girar las cartas cuando se hace click
let girar = (evento) => {
    if (bloqueado) return; //Si el juego está bloqueado, no se puede hacer clic en más cartas

    const id = evento.target.id; //Se obtiene el id del elemento que representa la carta
    const carta1 = imagenes[id]; //Se obtiene el valor de la carta que será el número de la imagen
    document.getElementById(id).src=`${carta1}.jpg`; //Se muestra la imagen de la carta cuando se hace click

    //Si es la primera carta seleccionada
    if (primeraCarta === null) {
        primeraCarta = evento.target; //Guardo la primera carta
        return; //Salgo de la función para esperar la segunda carta
    }

    //Si es la segunda carta seleccionada
    segundaCarta = evento.target; //Guardo la segunda carta

    //Comparo si las dos cartas seleccionadas son iguales
    if (primeraCarta.src === segundaCarta.src) {
        //Si las cartas son iguales, se mantienen visibles y con borde rojo
        primeraCarta.style.border = "3px solid red"; 
        segundaCarta.style.border = "3px solid red"; 
        contadorParejas++; //Aumento el contador de parejas conseguidas
        parejasConseguidas.textContent = contadorParejas; //Actualizo la pantalla con el número de parejas

        //Reinicio las cartas seleccionadas para la siguiente comparación
        primeraCarta = null;
        segundaCarta = null;
        return; 
    }

    //Si las cartas no son iguales, les doy la vuelta después de un retraso
    bloqueado = true; //Bloqueo el juego para que no se puedan seleccionar más cartas hasta que las anteriores se den la vuelta
    setTimeout(() => {
        //Doy la vuelta a las cartas
        primeraCarta.src = "Reverso_Sakura.webp";
        segundaCarta.src = "Reverso_Sakura.webp"; 
        //Reinicio y desbloqueo esperando 1 segundo
        primeraCarta = null; 
        segundaCarta = null;
        bloqueado = false; 
    }, 1000); 

    //Aumento el contador de movimientos
    contadorMovimientos++;
    movimientos.textContent = contadorMovimientos; // Actualización
}

//Se asigna el evento de click a todas las cartas que tienen el id que he puesto en el html
document.getElementById("0").addEventListener("click", girar);
document.getElementById("1").addEventListener("click", girar);
document.getElementById("2").addEventListener("click", girar);
document.getElementById("3").addEventListener("click", girar);
document.getElementById("4").addEventListener("click", girar);
document.getElementById("5").addEventListener("click", girar);
document.getElementById("6").addEventListener("click", girar);
document.getElementById("7").addEventListener("click", girar);

