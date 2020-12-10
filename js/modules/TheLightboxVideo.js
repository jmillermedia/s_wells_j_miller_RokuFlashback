export default {
    name: 'TheLightboxVideo',
    props: ['piece'],


    data: function() {
        return {
            projectName: this.piece.Title,
            projectDate: this.piece.Date,
            projectDesc: this.piece.Description,
            projectVideo: this.piece.Video,
        }
    },

    template: `
        <div class="lbVideo">
            <h2 class="lbVideo__title">{{piece.Title}}</h2>
            <p class="lbVideo__date">{{piece.Date}}</p>
            <p class="lbVideo__desc">{{piece.Description}}</p>
            <video 
            :src="'videos/' + piece.Video"
            controls 
            class="lbVideo__video" 
            :poster="'images/' + piece.Thumbnail"></video>

        </div>
    `,
}