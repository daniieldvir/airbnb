
export default {
    props: ['book'],
    template: `
        <section class="review-add" v-if="book">
            <fieldset>
                <legend>
            <button class="add-btn" @click="toggleAddReview"> {{(this.reviewToggle) ? 'Cancel' : 'Add a review'}} </button></legend>
            <form class="form-review flex column" v-if= "reviewToggle" @submit.prevent="save" >
                <label> Full Name: <input ref="input" id="fullName" v-model="bookReview.fName" type="text" placeholder="Your name..."> </label>
                <!-- Rate: <select v-model="bookReview.rate" >
                         <option>1</option>
                         <option>2</option>
                         <option>3</option>
                         <option>4</option>
                         <option>5</option>
                     </select> -->
                <div class="stars">
                    <span v-for="num in 5" class="fa fa-star" :class="{checked:num <= bookReview.rate}" @click="changeColor(num)"></span>
                </div>
                <label> Read At: <input type="date" v-model="bookReview.readAt"></label>
                <label> <textarea v-model.trim="bookReview.text" cols="40" rows="5" placeholder="Add Free Text..."> </textarea> </label>
                <button class="submit-btn btn">Submit Review</button>
            </form>
</fieldset>
        </section>
    `,

    data() {
        return {
            // book: null,
            bookReview: {
                fName: 'Books Reader',
                rate: 3,
                readAt: new Date().toDateString(),
                text: '',
            },
            reviewToggle: false,
        }
    },
    mounted() {

    },
    created() {
        this.bookReview.readAt = this.currDate


    },
    methods: {
        resetReview() {
            this.bookReview = {
                text: '',
                fullName: '',
                readAt: new Date().toDateString(),
                rate: 3
            }
        },

        save() {
            this.$emit('saveReview', this.bookReview)
            this.resetReview()
            this.toggleAddReview();

        },
        // delete(idx) {
        //     this.$emit('deleteReview', idx)
        //     this.resetReview()
        //     this.toggleAddReviewMode();
        // },

        changeColor(num) {
            this.bookReview.rate = num;
            console.log('hello', num)
        },

        toggleAddReview() {

            this.reviewToggle = !this.reviewToggle;
        },
    },
    computed: {
        currDate() {
            // return new Date().toISOString().substring(0, 10);
            const date = new Date();
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        },

        bookId() {
            return this.$route.params.bookId
        },
    },

}
