//Información básica de cada personaje
const infoPersonajes = {
    hachiko: "Hachiko: Alegre y emocional, amiga cercana de Nana.",
    nana: "Nana Osaki: Vocalista de BLAST.",
    nobu: "Nobu: Guitarrista de BLAST.",
    shin: "Shin: Bajista joven de BLAST.",
    yasu: "Yasu: Batería de BLAST y muy responsable.",
    ren: "Ren: Guitarrista de TRAPNEST.",
    reira: "Reira: Vocalista de TRAPNEST.",
    takumi: "Takumi: Líder y bajista de TRAPNEST. El peor personaje de todos."
}

//Donde se mostrará la información
const infoText = document.getElementById("info-text");

//Todas las imágenes
const imagenes = document.querySelectorAll(".personaje");

//Al pasar el ratón por cada imagen mostramos info
imagenes.forEach(img => {
    img.addEventListener("mouseenter", () => {
        infoText.textContent = infoPersonajes[img.id]
    })
})

//Botones que modifican las imágenes según su clase (blast / trapnest)
const botones = document.querySelectorAll("[data-group]");

//Función para quitar estilos
function limpiar() {
    imagenes.forEach(img => img.style.border = "")
}

//Si pulso un botón, resalto solo su grupo
botones.forEach(btn => {
    btn.addEventListener("click", () => {
        const grupo = btn.dataset.group
        limpiar()
        imagenes.forEach(img => {
        if (img.classList.contains(grupo)) {
            img.style.border = "3px solid red"
        }
        })
        infoText.textContent = "Mostrando personajes del grupo " + grupo
    })
})

//Botón reset
document.getElementById("btn-reset").addEventListener("click", () => {
    limpiar()
    infoText.textContent = "Selección borrada. Pasa el ratón por una imagen."
})
