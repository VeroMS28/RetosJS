
//Lo primero que debo hacer siempre es esto y como es breve la función lo puedo hacer dentro
window.addEventListener('load', function(){
    //Así coge el primer formulario que encuentre
    //checkID es una función que se va a hacer fuera pero también se podría hacer dentro como esta
    document.querySelector('form').addEventListener('submit', checkID);
})

//Después de la de abajo y se recomienda así cuando no va asociada a un evento
const renderData = (data) => {
    const container = document.querySelector('div');
    container.innerHTML = `
    <ul>
        <!--Buscar de donde viene cada apartado, data es donde pone message... e ir siguiendo los puntos-->
        <li>${data.result.properties.name}</li>
        <li>${data.result.properties.height}</li>
        <li>${data.result.properties.mass}</li>
        <li>${data.result.properties.gender}</li>
    </ul>
    `;
}

//Después de la función de abajo se hace esto y he copiado la estructura de pideDatos() en la mejor solución
const fetchAPI = async() => {
    try{
        const id = document.querySelector('input').value;
        //Comillas invertidas si no no coge el id
        const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
        if (!response.ok) {
            throw `Error ${response.status} de la API: ${response.statusText}`
        }
        const myData = await response.json(); // recordad que .json() tb es una promesa
        console.log(myData);
        renderData(myData);
    }catch (e){
        console.error(e);
    }
}

//No usar arrow function porque con function crea un contexto diferente y con el arrow para poder llamarlo tengo que ponerlo encima
//En eventos no recomendado
function checkID(event){
    console.log("entra");
    event.preventDefault();
    //Validaciones
    //querySelector es mejor porque lo referencia como si fuera una clase CSS y coge el primero que coincida con lo que se pone sin necesidad de id
    const id = document.querySelector('input');
    //Si está correcto o no
    if(id.checkValidity()){
        fetchAPI();
    }else{
        const error = StereoPannerNode.querySelector('span');
        //Apuntes validity para ver el tipo de error
        if (id.validity.valueMissing){
            error.innerHTML = "Este campo es obligatorio";
        }
        if (id.validity.patternMismatch){
            error.innerHTML = "El id debe tener 1 o 2 dígitos";
        }
    }
}