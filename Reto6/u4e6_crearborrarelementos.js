
//Formulario para capturar los datos
const form = document.getElementById("form-ficha");

//Campo del título
const inputTitulo = document.getElementById("titulo");

//Campo de la URL de la imagen
const inputImagen = document.getElementById("imagen");

//Campo de la URL externa
const inputURL = document.getElementById("url");

//Campo de la descripción
const inputDescripcion = document.getElementById("descripcion");

//Botón que creará la ficha al pulsarlo
const btnCrear = document.getElementById("btn-crear");

//Contenedor donde se añadirán las fichas generadas
const contenedor = document.getElementById("contenedor-fichas");

//Función para crear una ficha
let crearFicha = () => {
    //Creo un div que tendrá toda la ficha
    const ficha = document.createElement("div");
    ficha.classList.add("ficha"); //le doy la clase .ficha del CSS

    //Título
    const titulo = document.createElement("h3");
    titulo.textContent = inputTitulo.value;
    ficha.appendChild(titulo);

    //Imagen
    const imagen = document.createElement("img");
    imagen.src = inputImagen.value; //uso la URL escrita
    ficha.appendChild(imagen);

    //Descripción
    const descripcion = document.createElement("p");
    descripcion.textContent = inputDescripcion.value;
    ficha.appendChild(descripcion);

    //Enlace externo 
    const enlace = document.createElement("a");
    enlace.href = inputURL.value; //enlace puesto
    enlace.textContent = "Más información";
    enlace.target = "_blank"; //abre en nueva pestaña
    ficha.appendChild(enlace);

    //Finalmente, añado la ficha al contenedor de fichas
    contenedor.appendChild(ficha);

    //Limpio los campos del formulario
    form.reset();
}

//Cuando el usuario pulse el botón "Crear ficha", ejecutará la función crearFicha().
btnCrear.addEventListener("click", crearFicha);
