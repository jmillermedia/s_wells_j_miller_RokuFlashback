export default {
    name: 'TheLightboxImages',
    props: ['piece'],

    data: function() {
        return {
            projectName: this.piece.Title,
            projectDate: this.piece.Date,
            projectDesc: this.piece.Description,
            projectImage1: this.piece.Image1,
            projectImage1: this.piece.Image2,
            projectImage1: this.piece.Image3,
        }
    },

    template: `
        <div class="lbImages">
            <h2 class="lbImages__title">{{piece.Title}}</h2>
            <p class="lbImages__date">{{piece.Date}}</p>
            <p class="lbImages__desc">{{piece.Description}}</p>
            <div class="lbImages__images">
                <img :src="'images/' + piece.Image1" :alt='piece.Title + " Portfolio" + " Image"'>
                <img :src="'images/' + piece.Image2" :alt='piece.Title + " Portfolio" + " Image"'>
                <img :src="'images/' + piece.Image3" :alt='piece.Title + " Portfolio" + " Image"'>
            <video class="lbVideo__video hidden"></video>
            </div>
        </div>
    `,
}