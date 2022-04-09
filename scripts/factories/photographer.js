/* eslint-disable no-unused-vars */
//fichier Javascript qui exploite les données JSON pour les injecter par méthode factory

let mediaIndex = 0;
let picture = null;
let pictures = null;
let videos = null;
const typeVideo = "video/mp4";
let data = [];





function photographerFactory(data) {
    var { name, portrait, city, country, tagline, price, id, photographerId, image, likes, title, video } = data;

    picture = `assets/photographers/${portrait}`;

    pictures = `assets/images/${photographerId}/${image}`;

    videos = `assets/images/${photographerId}/${video}`;


    //méthode factory injectant les informations des photographes sur la page d"accueil
    function getUserCardDOM() {


        const article = document.createElement( "article" );

        const boutonPhotographer = document.createElement( "button" );
        boutonPhotographer.ariaLabel = "Sélection du photographe";
        boutonPhotographer.onclick = function () {
            window.location.href= "photographer.html?id="+id;
        };
        article.appendChild(boutonPhotographer);

        const img = document.createElement( "img" );
        img.alt = name;
        img.setAttribute("src", picture);
        boutonPhotographer.appendChild(img);

        const h2 = document.createElement( "h2" );
        h2.textContent = name;
        h2.ariaLabel = name;
        boutonPhotographer.appendChild(h2);

        const p1 = document.createElement( "p" );
        p1.textContent = (city) + ", " + (country);
        p1.className = "localisation";
        p1.ariaLabel = (city) + ", " + (country);
        article.appendChild(p1);

        const p2 = document.createElement( "p" );
        p2.textContent = tagline;
        p2.className = "tagline";
        p2.ariaLabel = tagline;
        article.appendChild(p2);

        const p3 = document.createElement( "p" );
        p3.textContent = (price) + "€/jour";
        p3.className = "prix";
        p3.ariaLabel = (price) + "euros par jour";
        article.appendChild(p3);
        return (article);
    }

    
    //méthode factory injectant les informations (nom, ville, pays, citation) du photographe sur sa page
    function getUserCardDOM2() {
        const article2 = document.createElement( "article" );

        const h22 = document.createElement( "h2" );
        h22.textContent = name;
        article2.appendChild(h22);

        const p12 = document.createElement( "p" );
        p12.textContent = (city) + ", " + (country);
        p12.className = "localisation";
        article2.appendChild(p12);

        const p22 = document.createElement( "p" );
        p22.textContent = tagline;
        p22.className = "tagline";
        article2.appendChild(p22);

        return (article2);
    }

    //méthode factory injectant la photo de profil du photographe sur sa page
    function getUserCardDOM3() {
        const article3 = document.createElement( "article" );

        const img3 = document.createElement( "img" );
        img3.alt = name;
        img3.setAttribute("src", picture);

        article3.appendChild(img3);
        return (article3);
    }

    //méthode factory injectant les médias et leurs informations sur la page du photographe
    function getUserCardDOM4() {
        const article4 = document.createElement( "article" );

        const mediaContainer = document.createElement("button");
        mediaContainer.className = "mediaContainer";
        mediaContainer.ariaLabel = "Sélection du media";
        article4.appendChild(mediaContainer);



        if (data.image)
        {
            const pic1 = document.createElement( "img" );
            pic1.setAttribute("src", pictures);
            pic1.id = "myImg";
            pic1.alt = title;
            mediaContainer.appendChild(pic1);} else if (data.video) {
            const vid1 = document.createElement( "video" );
            vid1.controls = true;
            vid1.className = "video";
            vid1.id = "myImg";
            vid1.alt = title;
            mediaContainer.appendChild(vid1);
            const src1 = document.createElement("source");
            src1.setAttribute("src", videos);
            src1.setAttribute("type", typeVideo);
            vid1.appendChild(src1);
                        
        }

        var flexPicsInfo = document.createElement("div");
        flexPicsInfo.className = "flexPicsInfo";
        article4.appendChild(flexPicsInfo);

        const title1 = document.createElement("p");
        title1.textContent = title;
        title1.className = "titlePics";
        flexPicsInfo.appendChild(title1);


        var likes1 = document.createElement("p");
        likes1.innerText = likes.toString();
        likes1.className = "likesPics";
        flexPicsInfo.appendChild(likes1);


        const c=document.createElement("button");
        c.className = "heartPics";
        c.ariaLabel = "Aimer";
        flexPicsInfo.appendChild(c);

        const heartPic=document.createElement("i");
        heartPic.className = "fa-solid fa-heart";
        c.appendChild(heartPic);





        c.onclick = function () {

            if (likes1.innerText == likes) {
                
                let sommeLikes = parseInt(document.getElementById("totalLikes").innerText);
                document.getElementById("totalLikes").innerText = sommeLikes+1;

            }
            likes1.innerText=likes + 1;

        };







        //modal d"image
        mediaContainer.onclick = function () {

            // eslint-disable-next-line no-undef
            let index = medias.indexOf(data);
            mediaIndex = index;

            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            document.getElementById("fleche-before").focus();

            displayCurrentMedia (data);

        };



        return (article4);
    }



    //méthode factory injectant le total de likes et le prix du photographe en bas à droite de la page du photographe
    function getUserCardDOM5() {
        const article5 = document.createElement( "article" );


        const p22 = document.createElement( "p" );
        p22.textContent = (price) + "€/jour";
        p22.className = "pricePhotographerPage";
        article5.appendChild(p22);

        return (article5);
    }


    return { name, picture, getUserCardDOM, getUserCardDOM2, getUserCardDOM3, getUserCardDOM4, getUserCardDOM5 };

}

//fonction permettant de fermer la modale de gallerie d"image
function closeMediaModal () {

    var modal = document.getElementById("myModal");
    modal.style.display = "none";

}

//fonction permettant d"afficher le médias sélectionné dans une gallerie d"image (et vidéo)
function displayCurrentMedia (data) {
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    //var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var modalVideo = document.getElementById("video01");
    var captionText = document.getElementById("caption");



    var { photographerId, image, title, video } = data;

    pictures = `assets/images/${photographerId}/${image}`;

    videos = `assets/images/${photographerId}/${video}`;

    captionText.innerText = title;



    if (data.image){
        modalImg.style.display="block"; 
        modalImg.src = pictures;
        modalVideo.style.display="none";
    } else if (data.video) {
        modalVideo.style.display="block"; 
        modalVideo.src = videos;
        modalImg.style.display="none"; 
    }
}









