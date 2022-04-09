/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//fichier Javascript gérant la page des photographes


//ces variables permettent de récupérer photographer et medias dans les fonctions
let photographer = null;
let medias = [];



//cette fonction permet d'injecter la photo et les informations du photographe dans le header de la page 
async function displayPhotographer () {
    const infoPhotograph = document.querySelector(".infoPhotograph");
    const picPhotograph = document.querySelector(".picPhotograph");

    const photographerModel = photographerFactory(photographer);
    const userCardDOM2 = photographerModel.getUserCardDOM2();
    const userCardDOM3 = photographerModel.getUserCardDOM3();

    infoPhotograph.appendChild(userCardDOM2);
    picPhotograph.appendChild(userCardDOM3);
}

// cette fonction permet d'injecter le bloc en bas à droite de la page comprenant le total de likes et le prix du photographe
async function displayLikesPrice () {
    const blocLikesPrice = document.querySelector(".blocLikesPrice");


    const photographerModel2 = photographerFactory(photographer);
    const userCardDOM5 = photographerModel2.getUserCardDOM5();


    blocLikesPrice.appendChild(userCardDOM5);


}


//cette fonction permet d'injecter les images et les informations des images dans le corps de la page 
async function displayMedias () {

    const photographPictures = document.querySelector(".photograph-pictures");
    photographPictures.innerHTML = ""; //permet de vider le conteneur photograph-pictures


    medias.forEach((media) => {

        // eslint-disable-next-line no-undef
        const mediaModel = photographerFactory(media);
        const userCardDOM4 = mediaModel.getUserCardDOM4();
			
        photographPictures.appendChild(userCardDOM4);
        photographPictures.children[0].children[0].focus();
	
    });

}


//ces 4 fonctions permettent de rendre effectif la sélection du tri des images de la page (popularité, date, titre)

//cette fonction permet d'appeler les fonctions de tri des medias (par like-popularité, par titre, par date)
function sortMedias(elt)
{
    let sortFunction = null;
	
    switch(elt.value)
    {
    case "like":
    {
        sortFunction = sortLikesRef;
        break;
    }
    case "title":
    {
        sortFunction = sortTitleRef;
        break;
    }
    case "date":
    {
        sortFunction = sortDateRef;
        break;
    }
    }
	
    medias.sort(sortFunction);
    displayMedias();
}



//fonction de tri par likes-popularité
function sortLikesRef(a, b)
{
    if(a.likes < b.likes)
    {
        return -1;
    }
    if(a.likes > b.likes)
    {
        return 1;
    }
    return 0;
}

//fonction de tri par tire (alphabet)
function sortTitleRef(a, b)
{
    if(a.title < b.title)
    {
        return -1;
    }
    if(a.title > b.title)
    {
        return 1;
    }
    return 0;
}

//fonction de tri par date
function sortDateRef(a, b)
{
    const _a = Date.parse(a.date); // nb de milli-secondes depuis 1970-01-01 00:00:00.000 jusqu'à la date donnée
    const _b = Date.parse(b.date);
    if(_a < _b)
    {
        return -1;
    }
    if(_a > _b)
    {
        return 1;
    }
    return 0;
}



//cette fonction permet de récupérer les informations présentes dans la base de données JSON par Fetch
async function loadData() {

    const URLparams = new URLSearchParams(window.location.search);
    const photographerId = URLparams.get("id");	

    const rep = await fetch("data/photographers.json", { method: "GET" });
    const data = await rep.json();
    photographer = data.photographers.find(item => item.id == photographerId);
    medias = data.media.filter(item => item.photographerId == photographerId);

}




/*Gestion fleches modal*/
function flecheDroite () {
    mediaIndex = (mediaIndex + 1) % medias.length;
    const data =  medias[mediaIndex];
    displayCurrentMedia (data);
}

function flecheGauche () {
    mediaIndex = (mediaIndex + medias.length -1) % medias.length;
    const data =  medias[mediaIndex];
    displayCurrentMedia (data);
}

//gestion de l'utilisation du clavier dans la galerie d'image (modal) et la fermeture de la modal de formulaire
function handleKey(e)
{

    switch(e.code) {
    case "ArrowLeft":
    {
        flecheGauche();
        break;
    }
    case "ArrowRight":
    {
        flecheDroite();
        break;
    }
    case "Escape":
    {
        closeModal();
        closeMediaModal();
        break;
    }
    }

}







//cette fonction permet de rendre actives les fonctions évoquées à l'intérieur de celle-ci
window.onload = async function() {
    await loadData();
    displayPhotographer();
    displayMedias();
    displayLikesPrice();
    let sommeLikes = medias.reduce ((accumulateur, element) => {
        return accumulateur + element.likes;
    },0);
    document.getElementById("totalLikes").innerText = sommeLikes;

    crear_select();
};

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf("IEMobile") !== -1);
}


var li = new Array();

//fonction permettant de gérer la mise en forme du sélecteur/trieur
function crear_select(){
    var div_cont_select = document.querySelectorAll("[data-mate-select='active']");
    var select_ = "";
    for (var e = 0; e < div_cont_select.length; e++) 
    {
        div_cont_select[e].setAttribute("data-indx-select",e);
        div_cont_select[e].setAttribute("data-selec-open","false");
        var ul_cont = document.querySelectorAll("[data-indx-select='"+e+"'] > .cont_list_select_mate > ul");
        select_ = document.querySelectorAll("[data-indx-select='"+e+"'] >select")[0];
        if (isMobileDevice()) { 
            select_.addEventListener("change", function () {
                _select_option(select_.selectedIndex,e);
            });
        }	
        var select_options = select_.options;
        document.querySelectorAll("[data-indx-select='"+e+"']  > .selecionado_opcion ")[0].setAttribute("data-n-select",e);
        document.querySelectorAll("[data-indx-select='"+e+"']  > .icon_select_mate ")[0].setAttribute("data-n-select",e);
		
        for (var i = 0; i < select_options.length; i++) {
            li[i] = document.createElement("li");
            if (select_options[i].selected == true || select_.value == select_options[i].innerHTML ) {
                li[i].className = "active";
                document.querySelector("[data-indx-select='"+e+"']  > .selecionado_opcion ").innerHTML = select_options[i].innerHTML;
            }
            li[i].setAttribute("data-index",i);
            li[i].setAttribute("tabindex",0);
            li[i].setAttribute("data-selec-index",e);
            // fonctions de click liées à la fleche de sélection
            li[i].addEventListener( "click", function(){  _select_option(this.getAttribute("data-index"),this.getAttribute("data-selec-index")); });
            li[i].addEventListener( "keypress", function(e){  if (e.key === "Enter") {_select_option(this.getAttribute("data-index"),this.getAttribute("data-selec-index"));}  });

            li[i].innerHTML = select_options[i].innerHTML;
            ul_cont[0].appendChild(li[i]);

        } // Fin de select_options
    } // fin de divs_cont_select
} // Fin de la Fonction 



var cont_slc = 0;
function open_select(idx){
    var idx1 =  idx.getAttribute("data-n-select");
    var ul_cont_li = document.querySelectorAll("[data-indx-select='"+idx1+"'] .cont_select_int > li");
    var hg = 0;
    var slect_open = document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].getAttribute("data-selec-open");
    var slect_element_open = document.querySelectorAll("[data-indx-select='"+idx1+"'] select")[0];
    if (isMobileDevice()) { 
        if (window.document.createEvent) { // All
            var evt = window.document.createEvent("MouseEvents");
            evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            slect_element_open.dispatchEvent(evt);
        } else if (slect_element_open.fireEvent) { // IE
            slect_element_open.fireEvent("onmousedown");
        }else {
            slect_element_open.click();
        }
    }else {


        for (var i = 0; i < ul_cont_li.length; i++) {
            hg += ul_cont_li[i].offsetHeight;
        } 
        if (slect_open == "false") {  
            document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].setAttribute("data-selec-open","true");
            document.querySelectorAll("[data-indx-select='"+idx1+"'] > .cont_list_select_mate > ul")[0].style.height = hg+"px";
            document.querySelectorAll("[data-indx-select='"+idx1+"'] > .icon_select_mate")[0].style.transform = "rotate(180deg)";
        }else{
            document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].setAttribute("data-selec-open","false");
            document.querySelectorAll("[data-indx-select='"+idx1+"'] > .icon_select_mate")[0].style.transform = "rotate(0deg)";
            document.querySelectorAll("[data-indx-select='"+idx1+"'] > .cont_list_select_mate > ul")[0].style.height = "0px";
        }
    }

} // fin function open_select

function exit_select(indx){
    var select_ = document.querySelectorAll("[data-indx-select='"+indx+"'] > select")[0];
    document.querySelectorAll("[data-indx-select='"+indx+"'] > .cont_list_select_mate > ul")[0].style.height = "0px";
    document.querySelector("[data-indx-select='"+indx+"'] > .icon_select_mate").style.transform = "rotate(0deg)";
    document.querySelectorAll("[data-indx-select='"+indx+"']")[0].setAttribute("data-selec-open","false");
}


function _select_option(indx,selc){
    if (isMobileDevice()) { 
        selc = selc -1;
    }
    var select_ = document.querySelectorAll("[data-indx-select='"+selc+"'] > select")[0];

    var li_s = document.querySelectorAll("[data-indx-select='"+selc+"'] .cont_select_int > li");
    var p_act = document.querySelectorAll("[data-indx-select='"+selc+"'] > .selecionado_opcion")[0].innerHTML = li_s[indx].innerHTML;
    var select_options = document.querySelectorAll("[data-indx-select='"+selc+"'] > select > option");
    for (var i = 0; i < li_s.length; i++) {
        if (li_s[i].className == "active") {
            li_s[i].className = "";
        }
        li_s[indx].className = "active";

    }
    select_options[indx].selected = true;
    select_.selectedIndex = indx;
    select_.onchange();
    exit_select(selc); 
}