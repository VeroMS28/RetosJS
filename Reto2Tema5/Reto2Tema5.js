let peliculas = [];

//Cargar los datos del DOM
window.addEventListener('load', function(){
    pideDatos();
    document.querySelector('input').addEventListener('input', ()=>{
    let peliculasDOM = document.getElementById('peliculas');
    peliculasDOM.innerHTML = '';
    //valor del input
    let busqueda = document.querySelector('input').value;
    let muestraPeliculas = peliculas.filter(p => p.Title.toLowerCase().includes(busqueda));
    muestraPeliculas.forEach(p => {
        let poster = document.createElement("div");
        poster.classList.add("poster");

        let imagen = document.createElement("img");
        imagen.src = p.Poster;

        let titulo = document.createElement("h2");
        titulo.textContent = p.Title;

        let year = document.createElement("p");
        year.innerHTML = `AÑO DE ESTRENO -> ${p.Year}`;

        poster.appendChild(imagen);
        poster.appendChild(titulo);
        poster.appendChild(year);

        peliculasDOM.appendChild(poster);
    });

});
})

//Si no fuera asíncrona, hasta que no cargue la API se bloquea la página porque el código no avanza
let pideDatos = async() => {
    try{
        //La apyKey se tiene que pedir
        let response = await fetch(`https://www.omdbapi.com/?s=movie&y=2024&page=1&apikey=5a0140ae`);
        console.log("pidiendo datos a la API");
        let data = await response.json();
        console.log(data);
        let numResultados = data.totalResults;
        let paginas = Math.ceil(numResultados/10);
        console.log(paginas);
        
        for (let i=1; i<=paginas; i++){
            console.log(`pidiendo datos de la página ${i}`);
            //fetch es para pedir a la API la información, método para que devuelva datos
            //poner siempre el await para que espere la respuesta y lo muestre en la consola
            let response = await fetch(`https://www.omdbapi.com/?s=movie&y=2024&page=${i}&apikey=5a0140ae`);
            let data =await response.json();
            //los 3 puntos es como el concat de todos los arrays y no sea un array de arrays
            peliculas.push(...data.Search);
        }

        console.log(peliculas);
    }catch(e){
        console.error(e);
    }
}