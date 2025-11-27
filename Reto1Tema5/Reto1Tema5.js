//URL de la API REST Countries (solo campos necesarios)
const API_URL ='https://restcountries.com/v3.1/all?fields=capital,name,region,population';

const searchInput = document.getElementById('search');
const tbody = document.getElementById('countries-body');
const statusEl = document.getElementById('status');

//Aquí guardo todos los países cargados
let countries = [];

//Función principal que carga todos los países desde la API
async function loadCountries() {
    try {
        statusEl.textContent = 'Cargando países...';

        //petición
        const res = await fetch(API_URL);

        //Si hay error de servidor, excepción
        if (!res.ok) {
            throw new Error('Error al cargar los datos');
        }

        //Convierto la respuesta a JSON
        const data = await res.json();

        //orden alfabéticamente por nombre común
        countries = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common, 'es')
        );

        //tabla con todos los países
        renderTable(countries);

        //Mensaje de estado
        statusEl.textContent = `Mostrando ${countries.length} países.`;
    } catch (error) {
        //En caso de error, muestro al usuario
        tbody.innerHTML =
        '<tr><td colspan="4">No se pudieron cargar los datos.</td></tr>';
        statusEl.textContent = error.message;
    }
}

//Función que pinta los países recibidos en la tabla list 
function renderTable(list) {
    //Si no hay países para mostrar
    if (!list.length) {
        tbody.innerHTML =
        '<tr><td colspan="4">No hay países que coincidan con la búsqueda.</td></tr>';
        return;
    }

    //Genero cada fila
    const rows = list
        .map((country) => {
        //Algunos países no tienen ciertos campos, así que controlo valores vacíos
        const name = country.name?.common ?? '—';
        const capital = Array.isArray(country.capital)
            ? country.capital.join(', ')
            : country.capital || '—';
        const region = country.region ?? '—';
        const population =
            typeof country.population === 'number'
            ? country.population.toLocaleString('es-ES') // Formato bonito
            : '—';

        //Devuelvo el HTML de cada fila
        return `
            <tr>
            <td>${name}</td>
            <td>${capital}</td>
            <td>${region}</td>
            <td>${population}</td>
            </tr>
        `;
        })
        .join('');

    //Inserto todas las filas en la tabla
    tbody.innerHTML = rows;
}

//Evento de búsqueda
//Se ejecuta cada vez que el usuario escribe en el input
searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase();

    //Filtro los países por nombre
    const filtered = countries.filter((c) =>
        c.name?.common?.toLowerCase().includes(term)
    );

    //Vuelvo a pintar la tabla con los filtrados
    renderTable(filtered);

    //Actualización estado
    if (countries.length) {
        statusEl.textContent = term
        ? `Mostrando ${filtered.length} de ${countries.length} países.`
        : `Mostrando ${countries.length} países.`;
    }
});

//Cargo los países al iniciar la página
loadCountries();
