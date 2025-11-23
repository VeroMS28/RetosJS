
//Referencia al formulario
const form = document.getElementById("mi-formulario");

//Botón para el análisis
const btnAnalizar = document.getElementById("btn-analizar");

//Div donde se van mostrando los resultados del análisis
const divResultado = document.getElementById("resultado");

//Contador para numerar cada elemento encontrado
let contador = 0;

/** 
 * @param {Node} nodo - Cualquier nodo dentro del formulario.
 * @param {Array<string>} lineas - Array donde guardo cada línea de texto de resultado.
 */
let analizarNodo = (nodo, lineas) => {
    //Si es un comentario
    if (nodo.nodeType === Node.COMMENT_NODE) {
        contador++;
        const valorComentario = nodo.nodeValue.trim();
        lineas.push(contador + ". COMENTARIO. Valor: " + valorComentario);
        return; 
    }

    //Si NO es un elemento (por ejemplo, texto suelto), no se analiza 
    if (nodo.nodeType !== Node.ELEMENT_NODE) {
        return;
    }

    //Si es un elemento HTML 
    const tag = nodo.tagName.toLowerCase(); //nombre de la etiqueta en minúsculas

    //Estos tipos de elemento se ignoran 
    const ignorar = ["fieldset", "datalist", "keygen", "output"];

    //Variables comunes a muchos tipos: clase, id y nombre
    const clase = nodo.className ? nodo.className : "no tiene";
    const id = nodo.id ? nodo.id : "no tiene";
    const nombre = nodo.name ? nodo.name : "no tiene";

    //Según el tipo de etiqueta (tag), hago un caso u otro
    switch (tag) {
        case "input": {
            contador++;
            //Tipo de input (text, password, checkbox, etc.)
            const tipo = nodo.type || "text";
            //Valor del input (lo que haya escrito el usuario o el value por defecto)
            const valor = nodo.value || "";
            const linea =
                contador + ". INPUT. Tipo: " + tipo +
                ". Nombre: " + nombre +
                ". Clase: " + clase +
                ". Id: " + id +
                ". Valor: " + valor;
            lineas.push(linea);
            break;
        }

        case "textarea": {
        contador++;
            const valor = nodo.value || "";
            const linea =
                contador + ". TEXTAREA. Nombre: " + nombre +
                ". Clase: " + clase +
                ". Id: " + id +
                ". Valor: " + valor;
            lineas.push(linea);
            break;
        }

        case "button": {
            contador++;
            const valor = nodo.textContent.trim();
            const linea =
                contador + ". BUTTON. Nombre: " + nombre +
                ". Clase: " + clase +
                ". Id: " + id +
                ". Valor: " + valor;
            lineas.push(linea);
            break;
        }

        case "label": {
            contador++;
            //El atributo "for" indica con qué input se relaciona el label
            const atributoFor = nodo.htmlFor ? nodo.htmlFor : "no tiene";
            const linea =
                contador + ". LABEL. Nombre: " + nombre +
                ". Clase: " + clase +
                ". Id: " + id +
                ". For: " + atributoFor;
            lineas.push(linea);
            break;
        }

        case "select": {
            contador++;
            //Recorro todos los option del select para obtener sus valores
            const opciones = [];
            for (const option of nodo.options) {
                //Uso el value del option; si no tiene, uso su texto
                const valorOption = option.value || option.textContent.trim();
                opciones.push(valorOption);
            }
            const linea =
                contador + ". SELECT. Nombre: " + nombre +
                ". Clase: " + clase +
                ". Id: " + id +
                ". Opciones: " + opciones.join(", ");
            lineas.push(linea);
            break;
        }

        default:
        //Si es un elemento de los que hay que ignorar, no se cuenta
        if (ignorar.includes(tag)) {}
        break;
  }

    for (const hijo of nodo.childNodes) {
        analizarNodo(hijo, lineas);
    }
}

let analizarFormulario = () =>{
    //Reinicio el contador y el div de resultado
    contador = 0;
    divResultado.textContent = "";

    //Array donde se va guardando las frases generadas, una por elemento
    const lineas = [];

    //Llamada a la función recursiva con el formulario como nodo inicial
    analizarNodo(form, lineas);

    //Uno todas las líneas con saltos de línea y las muestro
    divResultado.textContent = lineas.join("\n");
}

//Cuando el usuario haga clic en el botón "Analizar formulario", llamo a la función analizarFormulario.
btnAnalizar.addEventListener("click", analizarFormulario);
