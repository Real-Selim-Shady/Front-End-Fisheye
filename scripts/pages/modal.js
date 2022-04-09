

/////
/*Variables de gestion de la pop-in de formulaire*/
let modalid = document.getElementById("modalid1");
let croix = document.getElementById("croix");
let go = document.getElementById("btnmodal1");
let go2 = document.getElementById("btnmodalb")
let croix2 = document.getElementById("croix2");
let croix3 = document.getElementById("croix3");
let modalid2 = document.getElementById("modalid2");
let btn_envoi = document.getElementById("bouton_envoi");


////

/*Variables visant à aider l'utilisateur à compléter le formulaire*/
let prenom = document.getElementById("first");
let prenom_m = document.getElementById("prenom_manquant");
let prenom_v = /^[a-zA-ZéèëÉÈËçÇîïÎÏ][a-zéèëçîï]+([-'\s][a-zA-ZéèëÉÈËîïÎÏ][a-zéèëçîï]+)?$/;
let nom = document.getElementById("last");
let nom_m = document.getElementById("nom_manquant");
let nom_v = /^[a-zA-ZéèëÉÈËçÇîïÎÏ][a-zéèëçîï]+([-'\s][a-zA-ZéèëÉÈËîïÎÏ][a-zéèëçîï]+)?$/;
let email = document.getElementById("email");
let email_m = document.getElementById("email_manquant");
let email_v = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/



/*Fonctions visant à faire vivre les contraintes de remplissage, et faisant apparaitre les messages d'erreur*/
function validate (e) {
  var valid = true;
  console.log(checkbox1.value);
  if (prenom.validity.valueMissing) {
    prenom_m.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    prenom_m.style.color ="red";
    prenom.style.borderBlockColor="red";
    prenom.style.borderRightColor="red";
    prenom.style.borderLeftColor="red";
    valid=false;
    
  }else if (prenom_v.test(prenom.value) == false) {
    prenom_m.textContent = "format incorrect";
    prenom_m.style.color ="red";
    prenom.style.borderBlockColor="red";
    prenom.style.borderRightColor="red";
    prenom.style.borderLeftColor="red";
    valid=false;
  }

  if (nom.validity.valueMissing) {
    nom_m.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    nom_m.style.color ="red";
    nom.style.borderBlockColor="red";
    nom.style.borderRightColor="red";
    nom.style.borderLeftColor="red";
    valid=false;
  }else if (nom_v.test(nom.value) == false) {
    nom_m.textContent = "format incorrect";
    nom_m.style.color ="red";
    nom.style.borderBlockColor="red";
    nom.style.borderRightColor="red";
    nom.style.borderLeftColor="red";
    valid=false;
  }

  if (email.validity.valueMissing) {
    email_m.textContent = "Vous devez entrer un email.";
    email_m.style.color ="red";
    email.style.borderBlockColor="red";
    email.style.borderRightColor="red";
    email.style.borderLeftColor="red";
    valid=false;
  }else if (email_v.test(email.value) == false) {
    email_m.textContent = "format incorrect";
    email_m.style.color ="red";
    email.style.borderBlockColor="red";
    email.style.borderRightColor="red";
    email.style.borderLeftColor="red";
    valid=false;
  }


  if (valid == true) {
    //fermer le formulaire
    document.getElementById("modalid1").style.display = "none";
    //remettre le formulaire à zero
    document.forms["reserve"].reset();
    //afficher le message
    document.getElementById("modalid2").style.display ="block";
  }

  if (valid == false) {
    e.preventDefault();
  }

}

////

