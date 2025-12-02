
//Siempre primero lo de window
window.addEventListener('load', function(){
    document.querySelector('form').addEventListener('submit', function(event){
        event.preventDefault();
        fetchData();
    });
})

//Tiene que ser asíncrona porque va a llamar a la API (esto después de la función de abajo)
//En este caso son 10 páginas y se ve en la API en total_pages
const fetchAllData = async (type) => {
    let allData = [];
    let url;
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw `Error ${response.status} de la API: ${response.statusText}`
        }
        const data = await response.json(); 
        allData = data.results;
        url = data.next;
        console.log(data);
    }catch (e){
        console.error(e);
    }
    
    while(url != null){
        try{
        const response = await fetch(url);
        if (!response.ok) {
            throw `Error ${response.status} de la API: ${response.statusText}`
        }
        const fetchData = await response.json(); 
        //Para concatenar arrays se puede mirar en los apuntes de arrays y es la siguiente forma
        allData = allData.concat(fetchData.results);
        url = fetchData.next;
        }catch (e){
            console.error(e);
        }
    }
    console.log(allData);
    const container = document.querySelector('div');
    //Mostrar
    allData.map ((e=>{
        containeer.innerHTML *= `
        <ul>
            <li>${e.uid}</li>
            <li>${e.name}</li>
            <li>${e.url}</li>
        </ul>
        `;
    }))
}

const fetchInData = async (type, id) => {
    try{
        const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
        if (!response.ok) {
            throw `Error ${response.status} de la API: ${response.statusText}`
        }
        const data = await response.json(); 
        console.log(data);
        const container = document.querySelector('div');
        switch (type){
            case 'people':
                container.innerHTML = `
                <ul>
                    <li>${data.result.properties.name}</li>
                    <li>${data.result.properties.height}</li>
                    <li>${data.result.properties.mass}</li>
                    <li>${data.result.properties.gender}</li>
                </ul>
                `;
                break;
            case 'films':
                //Él nos dice lo que tenemos que poner de datos, en este caso título... Lo más relevante que vaya cambiando
                container.innerHTML = `
                <ul>
                    <li>${data.result.properties.title}</li>
                    <li>${data.result.properties.release_date}</li>
                    <li>${data.result.properties.director}</li>
                </ul>
                `;
                break;
            case 'planets':
                container.innerHTML = `
                <ul>
                    <li>${data.result.properties.name}</li>
                    <li>${data.result.properties.terrain}</li>
                    <li>${data.result.properties.population}</li>
                </ul>
                `;
                break;
            case 'starships':
                //el id 1 en este caso no existe
                container.innerHTML = `
                <ul>
                    <li>${data.result.properties.name}</li>
                    <li>${data.result.properties.crew}</li>
                    <li>${data.result.properties.passenger}</li>
                    <!--Array de prueba para que muestre la primera película-->
                    <li>${data.result.properties.films[0]}</li>
                </ul>
                `;
                break;
            case 'species':
                container.innerHTML = `
                <ul>
                <!--Si queremos podemos poner lo de nombre, idioma...-->
                    <li>Nombre: ${data.result.properties.name}</li>
                    <li>Idioma: ${data.result.properties.language}</li>
                    <li>Designación: ${data.result.properties.designation}</li>
                </ul>
                `;
                break;
        }
    }catch (e){
        console.error(e);
    }
}

function fetchData(){
    const id = document.querySelector('input');
    const type = document.querySelector('select').value;
    console.log(type);
    //value se puede poner tanto aquí como arriba
    id.value === "" ? fetchAllData(type) : fetchInData(type, id.value);
}

