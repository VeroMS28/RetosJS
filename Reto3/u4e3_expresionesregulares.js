
//Primero de todo tengo en cuenta el formulario que he realizado en el HTML
const form = document.getElementById("formulario");

//Ahora hago referencia a cada input y a los span de error que he puesto también en el HTML
const fechaHora = document.getElementById("fechaHoraCreacion");
const fechaHoraError = document.getElementById("errorFechaHoraCreacion");
const cocinero = document.getElementById("cocinero");
const cocineroError = document.getElementById("errorCocinero");
const destinatario = document.getElementById("destinatario");
const destinatarioError = document.getElementById("errorDestinatario");
const gramos = document.getElementById("gramos");
const gramosError = document.getElementById("errorGramos");
const composicion = document.getElementById("composicion");
const composicionError = document.getElementById("errorComposicion");
const cuenta = document.getElementById("cuenta");
const cuentaError =  document.getElementById("errorCuenta");
const cuentaFinal = document.getElementById("cuentaUSAfinal");

//Cuando el usuario envía el formulario
form.addEventListener("submit", function(event) {
    //Evito que se envíe automáticamente
    event.preventDefault();

    //Muestro errores de los campos usando la validación básica 
    fechaHoraError.textContent = fechaHora.validationMessage;
    cocineroError.textContent = cocinero.validationMessage;
    destinatarioError.textContent = destinatario.validationMessage;
    gramosError.textContent = gramos.validationMessage;
    composicionError.textContent = composicion.validationMessage;
    cuentaError.textContent = cuenta.validationMessage;

    //Validación extra del número de cuenta EEUU
    if (cuenta.checkValidity()) {  //Primero compruebo que cumple el pattern
        const valor = cuenta.value;

        //Primeras dos letras cortando con el slice ek valor
        const letras = valor.slice(0,2);

        //Dos dígitos que deben coincidir con la suma de las letras
        const digitos2 = parseInt(valor.slice(2,4),10);

        //12 dígitos de la cuenta
        const cuentaNum = valor.slice(5,17);

        //Dos dígitos de control
        const control = valor.slice(18);

        //Convierto las letras a números (A=1, B=2...)
        const letra1 = letras.charCodeAt(0) - 64; // 'A'.charCodeAt(0) = 65 → 65-64=1
        const letra2 = letras.charCodeAt(1) - 64;

        //Compruebo que los dos dígitos coinciden con la suma de las letras
        if (digitos2 === letra1 + letra2) {
            //Divido la cuenta en dos bloques de 6 dígitos para el control
            const primer6 = cuentaNum.slice(0,6);
            const segundo6 = cuentaNum.slice(6);

            //Calculo el primer dígito de control: suma de los 6 dígitos / 6 (parte entera)
            const control1 = Math.floor(primer6.split("").reduce((a,b)=>a+parseInt(b),0)/6);
            const control2 = Math.floor(segundo6.split("").reduce((a,b)=>a+parseInt(b),0)/6);

            //Combino los dos dígitos calculados
            const controlCalc = control1.toString() + control2.toString();

            //Si los dígitos de control coinciden
            if (controlCalc === control) {
                //Relleno el campo sin guiones
                cuentaFinal.value = valor.replace(/-/g,"");
                cuentaError.textContent = "";
            } else {
                cuentaError.textContent = "Control de dígitos incorrecto";
                cuentaFinal.value = "";
            }
        } else {
            cuentaError.textContent = "Los dos dígitos no coinciden con las letras";
            cuentaFinal.value = "";
        }
    } else {
        //Si no cumple el pattern, borro el campo final
        cuentaFinal.value = "";
    }

    //Compruebo si todo el formulario es válido y no hay errores en la cuenta
    if (form.checkValidity() && cuentaError.textContent === '') {
        alert("Formulario válido, listo para enviar.");
    }
});
