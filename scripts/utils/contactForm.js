
//fonction affichant la modale de formulaire
// eslint-disable-next-line no-unused-vars
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

//fonction permettant de fermer la modale de formulaire
// eslint-disable-next-line no-unused-vars
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

//Fonction permmetant d'envoyer les informations du formulaire dans la console
let first = document.querySelector("#first");
let last = document.querySelector("#last");
let email = document.querySelector("#email");
let text = document.querySelector("#text");

// eslint-disable-next-line no-unused-vars
function send() {
    console.log(first.value);
    console.log(last.value);
    console.log(email.value);
    console.log(text.value);
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}