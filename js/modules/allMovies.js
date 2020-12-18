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
    <h3 class="movie__title">{{movie.movies_title}}</h3>
    <p class="movie__date">{{movie.movies_year}}</p>
        <div class="movie__image" v-on:click="$emit('showmovie', movie)">
            <!-- <img :src="'images/' + movie.movies_cover" :alt='movie.movies_title + " Cover" + " Thumbnail"'> -->
            <img src="images/movieThumb.jpg" :alt='this.movie.movies_title + " Cover"'>

            <div class="fb-share-button" data-href="https://www.your-domain.com/your-page.html" data-layout="button_count"></div>

            <a class="twitter-share-button" href="https://twitter.com/intent/tweet">Tweet</a>
        </div>
        <!-- <div class="movie__details">
            <button v-on:click="$emit('showmydata', movie)" class="movie__button" :data-movie="movie.ID">Click for more!</button> --> <!-- keeping for click functionality -->
        </div>
    </div>`,
}