export default {
    name: "pieceThumb",
    props: ['piece'],

    data: function() {
        return {
            projectName: this.piece.Title,
            projectDate: this.piece.Date
        }
    },

    template:
    `<div class="work" data-aos="fade-up">
        <div class="work__image">
            <img :src="'images/' + piece.Thumbnail" :alt='piece.Title + " Portfolio" + " Thumbnail"'>
        </div>
        <div class="work__details">
            <button v-on:click="$emit('showmydata', piece)" class="work__button" :data-piece="piece.ID">Click for more!</button>
            <p class="work__date">{{piece.Date}}</p>
            <h3 class="work__title">{{piece.Title}}</h3>
        </div>
    </div>`,
}