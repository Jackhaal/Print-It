document.addEventListener('DOMContentLoaded', () => {
    // Tableau contenant les informations des slides
    const slides = [
        {
            "image": "slide1.jpg",
            "tagLine": "Impressions tous formats <span>en boutique et en ligne</span>"
        },
        {
            "image": "slide2.jpg",
            "tagLine": "Tirages haute définition grand format <span>pour vos bureaux et events</span>"
        },
        {
            "image": "slide3.jpg",
            "tagLine": "Grand choix de couleurs <span>de CMJN aux pantones</span>"
        },
        {
            "image": "slide4.png",
            "tagLine": "Autocollants <span>avec découpe laser sur mesure</span>"
        }
    ];

    // Index du slide actuellement affiché
    let currentIndex = 0;
    // Booléen pour vérifier si une transition est en cours
    let isTransitioning = false;

    // Sélection des éléments DOM nécessaires
    let bannerImg = document.querySelector('.banner-img');
    const tagLine = document.querySelector('#banner p');
    const dots = document.querySelector('.dots');

    // Création des points de navigation pour chaque slide
    slides.forEach((slide, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('dot_selected'); // Sélectionne le premier point par défaut
        }
        dots.appendChild(dot);

        // Ajoute un écouteur d'événement pour chaque point
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Fonction pour afficher un slide
    function showSlide(index, direction = 'right') {
        if (isTransitioning) return; // Empêche les transitions simultanées
        isTransitioning = true;

        // Réinitialise l'index si nécessaire
        if (index >= slides.length) {
            index = 0;
        } else if (index < 0) {
            index = slides.length - 1;
        }

        // Crée un nouvel élément d'image pour la transition
        const newImg = document.createElement('img');
        newImg.src = `./assets/images/slideshow/${slides[index].image}`;
        newImg.classList.add('banner-img');
        newImg.style.position = 'absolute';
        newImg.style.top = '0';
        newImg.style.left = direction === 'right' ? '100%' : '-100%'; // Place la nouvelle image à droite ou à gauche
        newImg.style.width = '100%';
        newImg.style.height = '100%';
        newImg.style.objectFit = 'cover';
        newImg.style.transition = 'left 0.5s ease-in-out'; // Ajoute la transition

        // Ajoute la nouvelle image au DOM
        bannerImg.parentElement.appendChild(newImg);

        // Utilise setTimeout pour démarrer la transition
        setTimeout(() => {
            bannerImg.style.transition = 'left 0.5s ease-in-out'; // Ajoute la transition à l'ancienne image
            bannerImg.style.left = direction === 'right' ? '-100%' : '100%'; // Déplace l'ancienne image à gauche ou à droite
            newImg.style.left = '0'; // Déplace la nouvelle image au centre

            // Retire l'ancienne image après la fin de la transition
            setTimeout(() => {
                bannerImg.remove();
                currentIndex = index; // Met à jour l'index actuel
                bannerImg = newImg; // Met à jour la référence de l'image actuelle

                // Met à jour la sélection des points de navigation
                document.querySelectorAll('.dot').forEach((dot, dotIndex) => {
                    dot.classList.toggle('dot_selected', dotIndex === index);
                });

                isTransitioning = false; // Réinitialise l'état de transition
            }, 500); // Durée de la transition en millisecondes
        }, 10);

        // Met à jour le texte de la bannière
        tagLine.innerHTML = slides[index].tagLine;
    }

    // Écouteur d'événement pour la flèche gauche
    document.querySelector('.arrow_left').addEventListener('click', () => {
        showSlide(currentIndex - 1, 'left'); // Affiche le slide précédent avec une transition vers la gauche
    });

    // Écouteur d'événement pour la flèche droite
    document.querySelector('.arrow_right').addEventListener('click', () => {
        showSlide(currentIndex + 1, 'right'); // Affiche le slide suivant avec une transition vers la droite
    });

    // Change automatiquement l'image toutes les 10 secondes
    setInterval(() => {
        showSlide(currentIndex + 1, 'right'); // Affiche le slide suivant avec une transition vers la droite
    }, 10000); // Intervalle en millisecondes
});
