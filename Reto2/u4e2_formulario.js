'use strict'

//El DOM tiene que estar cargado antes de inicializar
window.addEventListener("load", iniciar);

let iniciar = () => {
    //Evento que se dispara al hacer click en enviar
    document.getElementById("enviar").addEventListener('click', validar, false);

    //Mostrar/ocultar campos adicionales cuando el checkbox es activado
    document.getElementById("clubSki").addEventListener('change', mostrarCamposAdicionales, false);
}

//Función para mostrar los campos adicionales si el checkbox está marcado
let mostrarCamposAdicionales = () => {
    let checkBox = document.getElementById("clubSki");
    let camposAdicionales = document.getElementById("camposAdicionales");
    camposAdicionales.style.display = checkBox.checked ? "block" : "none";
}

//Función de validación personalizada de mensajes de error
let customErrorValidationMessage = (input) => {
    if(input.checkValidity()) {
        input.style.border = "";
        return ""; //Si es válido, no muestro el mensaje de error
    }

    if(input.validity.valueMissing) {
        input.style.border = "solid 3px red";
        return "El campo debe ser rellenado"; 
    }

    if(input.validity.patternMismatch) {
        input.style.border = "solid 3px red";
        return "Formato incorrecto"; 
    }

    if(input.validity.typeMismatch) {
        input.style.border = "solid 3px red";
        return "Tipo de dato incorrecto"; 
    }

    return "Error desconocido"; //Mensaje genérico
}

//Validación del identificador
let validaIdentificador = () => {
    let elemento = document.getElementById("identificador");
    let error = document.getElementById("errorIdentificador");
    error.innerHTML = customErrorValidationMessage(elemento);
    return elemento.checkValidity();
}

//Validación del nombre y apellidos
let validaNombreApellidos = () => {
    let elemento = document.getElementById("nombreApellidos");
    let error = document.getElementById("errorNombreApellidos");
    error.innerHTML = customErrorValidationMessage(elemento);
    return elemento.checkValidity();
}

//Validación de la fecha de nacimiento
let validaFecha = () => {
    let elemento = document.getElementById("fechaNacimiento");
    let error = document.getElementById("errorFechaNacimiento");
    error.innerHTML = customErrorValidationMessage(elemento);
    return elemento.checkValidity();
}

//Validación del correo electrónico
let validaCorreo = () => {
    let elemento = document.getElementById("correo");
    let error = document.getElementById("errorCorreo");
    error.innerHTML = customErrorValidationMessage(elemento);
    return elemento.checkValidity();
}

//Validación del teléfono
let validaTelefono = () => {
    let elemento = document.getElementById("telefono");
    let error = document.getElementById("errorTelefono");
    error.innerHTML = customErrorValidationMessage(elemento);
    return elemento.checkValidity();
}

//Validación de la edad
let validaEdad = () => {
    let elemento = document.getElementById("edad");
    let error = document.getElementById("errorEdad");
    error.innerHTML = customErrorValidationMessage(elemento);
    return elemento.checkValidity();
}

//Validación de los campos al enviar el formulario
let validar = (event) => {
    event.preventDefault(); //Evita el envío si hay errores

    //Valido cada campo por separado
    let validIdentificador = validaIdentificador();
    let validNombreApellidos = validaNombreApellidos();
    let validFecha = validaFecha();
    let validCorreo = validaCorreo();
    let validTelefono = validaTelefono();
    let validEdad = validaEdad();

    //Si el checkbox del club de ski está marcado, valida los campos adicionales
    let validSkiNivel = true;
    if (document.getElementById("clubSki").checked) {
        validSkiNivel = validaSkiNivel();
    }

    //Si todas las validaciones son verdaderas, el formulario es válido
    if (validIdentificador && validNombreApellidos && validFecha && validCorreo && validTelefono && validEdad && validSkiNivel) {
        alert("Formulario enviado con éxito");
    } else {
        alert("Existen errores en el formulario. Corrígelos e inténtalo otra vez.");
    }
}
