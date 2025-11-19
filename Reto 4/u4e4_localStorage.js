'use strict';

//Crea cookie hasta fin del día
function setCookie(nombre, valor) {
    const ahora = new Date();
    ahora.setHours(23, 59, 59, 999);
    document.cookie = `${nombre}=${valor}; expires=${ahora.toUTCString()}`;
}

//Devuelve valor cookie (o 0 si no existe)
function getCookie(nombre) {
    const cookies = document.cookie.split(";");
    for (let c of cookies) {
        let [key, val] = c.trim().split("=");
        if (key === nombre) return val;
    }
    return 0;
}

//Borra cookie
function delCookie(nombre) {
    document.cookie = `${nombre}=0; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

const spanForfaits = document.getElementById("cForfaits");
const spanSocios = document.getElementById("cSocios");

//Cargar al entrar
spanForfaits.textContent = getCookie("forfaitsHoy");
spanSocios.textContent = getCookie("sociosHoy");

//Suma 1 al forfait
function sumarForfait() {
    let v = parseInt(getCookie("forfaitsHoy")) + 1;
    setCookie("forfaitsHoy", v);
    spanForfaits.textContent = v;
}

//Suma 1 al socio
function sumarSocio() {
    let v = parseInt(getCookie("sociosHoy")) + 1;
    setCookie("sociosHoy", v);
    spanSocios.textContent = v;
}

//Reset forfaits
function resetForfaits() {
    setCookie("forfaitsHoy", 0);
    spanForfaits.textContent = 0;
}

//Reset socios
function resetSocios() {
    setCookie("sociosHoy", 0);
    spanSocios.textContent = 0;
}

document.getElementById("btnEnviarR4").addEventListener("click", () => {

  //Si algún campo obligatorio está vacío
    if (
        document.getElementById("nombre").value === "" ||
        document.getElementById("email").value === "" ||
        document.getElementById("telefono").value === "" ||
        document.getElementById("modalidad").value === ""
    ) {
        document.getElementById("mensaje").textContent = "Faltan datos obligatorios";
        return;
    }

    //Si todo está bien actualizar contadores
    sumarForfait();
    if (document.getElementById("clubSki").checked) {
        sumarSocio();
    }

    document.getElementById("mensaje").textContent = "Formulario enviado con éxito";
});
