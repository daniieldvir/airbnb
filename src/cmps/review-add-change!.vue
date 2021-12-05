<template> 
        <section class="review-add" v-if="stay">
            <fieldset>
                <legend>
            <button class="add-btn" @click="toggleAddReview"> {{(this.reviewToggle) ? 'Cancel' : 'Add a review'}} </button></legend>
            <form class="form-review flex column" v-if= "reviewToggle" @submit.prevent="save" >
                <label> Full Name: <input ref="input" id="fullName" v-model="stayReview.fName" type="text" placeholder="Your name..."> </label>
                <div class="stars">
                    <span v-for="(num,idx) in 5" :key="idx" class="fa fa-star" :class="{checked:num <= stayReview.rate}" @click="changeColor(num)"></span>
                </div>
                <label> Read At: <input type="date" v-model="stayReview.readAt"></label>
                <label> <textarea v-model.trim="stayReview.text" cols="40" rows="5" placeholder="Add Free Text..."> </textarea> </label>
                <button class="submit-btn btn">Submit Review</button>
            </form>
        </fieldset>
    </section>
</template>

<script>
export default {
    props: ['stay'],
    data() {
        return {
            // stay: null,
            stayReview: {
                fName: 'Stays Reader',
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
        this.stayReview.readAt = this.currDate


    },
    methods: {
        resetReview() {
            this.stayReview = {
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
</script>
