//Meto los contadores para que se muestren en pantalla luego
let contadorParejas = 0;
let contadorMovimientos = 0; 

//Tengo que tener la primera y segunda carta para luego compararlas
//El bloqueado está falso por defecto para que cuando se haga la pareja se ponga true
let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;

const parejasConseguidas = document.getElementById("parejas");
const movimientos = document.getElementById("movimientos");

let imagenes = [0,1,2,3,0,1,2,3];

let girar = (evento) => {

    const id = evento.target.id;
    const carta1 = imagenes[id];
    document.getElementById(id).src=`${carta1}.jpg`;

}
document.getElementById("0").addEventListener("click", girar);
document.getElementById("1").addEventListener("click", girar);
document.getElementById("2").addEventListener("click", girar);
document.getElementById("3").addEventListener("click", girar);
document.getElementById("4").addEventListener("click", girar);
document.getElementById("5").addEventListener("click", girar);
document.getElementById("6").addEventListener("click", girar);
document.getElementById("7").addEventListener("click", girar);

