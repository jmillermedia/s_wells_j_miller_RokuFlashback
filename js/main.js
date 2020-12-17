// JAVASCRIPT START
import { fetchdata } from "./modules/Data.js";
import allMovies from "./modules/allMovies.js";
// import TheLightboxVideo from "./modules/TheLightboxVideo.js";
// import TheLightboxImages from "./modules/TheLightboxImages.js";

    const myVM = (() => {

    let vue_vm = new Vue({
        data: {
            movie: {},
            movies: [],
            currentMovieData: {},
            activeComponent: null,
        },
        
        mounted: function() {
            fetchdata('./includes/read.php')
                .then(data => {
                    data.forEach(movie => this.movies.push(movie));
                })
                .catch(err => console.error(err));
        },

        methods: {
            showPortfolioData(target) { //debugger;
                console.log("you clicked on " + target.Title + " this will show " + target.Type);

                this.activeComponent = `lightbox${target.Type}`;
                document.querySelector('.lightbox').classList.remove('hidden');
                document.documentElement.style.overflow = 'hidden';
                this.movie = target;
            },

            hide() {
                document.querySelector('.lightbox').classList.add('hidden');
                document.documentElement.style.overflow = 'auto';
                document.querySelector('.lbVideo__video').pause();
            }
        },

        components: {
            "allmovies": allMovies,
            // "lightboxvideo": TheLightboxVideo,
            // "lightboximages": TheLightboxImages
        },

    }).$mount("#app") 
})();


// (() => {
//     // hamburger menu functions
//     let burgerButton = document.querySelector('.burgerButton'),
//         socialsButton = document.querySelector('.socials__button'),
//         socialButtons = document.querySelector('.socials__ul');
//         // debugger;
//     function burgerMenuExpand(){
//         document.querySelector('.burgerNav').classList.toggle('hidden');
//         document.querySelector('.burgerButton').classList.toggle('closeBurger');
//     }

//     function scrollClose() {
//         if (document.querySelector('.burgerNav').classList.contains('hidden'))
//         return;
//         document.querySelector('.burgerNav').classList.toggle('hidden');
//         document.querySelector('.burgerButton').classList.toggle('closeBurger');
//     }

//     function animateSocialButtons() {
//         socialButtons.classList.toggle('shown');
//         }

//     burgerButton.addEventListener('click', burgerMenuExpand);
//     window.addEventListener('scroll', scrollClose);

//     socialsButton.addEventListener('click', animateSocialButtons);

// })();