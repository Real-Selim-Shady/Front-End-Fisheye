//fichier Javascript gérant la page d'accueil


//fonction permettant de récupérer les données des photographes sur JSON par méthode fetch
async function getPhotographers() {

    const rep = await fetch("data/photographers.json", { method: "GET" });
    const data = await rep.json();
    const photographers = data.photographers;
        
    return (
        [...photographers]
    );
}


//fonction permettant d'afficher la carte de chaque photographe par méthode factory
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        // eslint-disable-next-line no-undef
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);         

    });
}

//fonction permettant d'afficher les données du photographe
async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
}
init();
    