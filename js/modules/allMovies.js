export default {
    name: "movieThumb",
    props: ['movie'],

    data: function() {
        return {
            projectName: this.movie.movies_title,
            projectDate: this.movie.movies_year
        }
    },

    template:
    `<div class="movie">
        <div class="movie__image">
            <!-- <img :src="'images/' + movie.movies_cover" :alt='movie.movies_title + " Cover" + " Thumbnail"'> -->
            <img src="images/movieThumb.jpg" :alt='movies_title + " Cover" + " Thumbnail"'>
        </div>
        <div class="movie__details">
            <button v-on:click="$emit('showmydata', movie)" class="movie__button" :data-movie="movie.ID">Click for more!</button>
            <p class="movie__date">{{movie.movies_year}}</p>
            <h3 class="movie__title">{{movie.movies_title}}</h3>
        </div>
    </div>`,
}