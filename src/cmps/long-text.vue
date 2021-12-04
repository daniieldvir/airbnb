<template>
    <div class="long-text-container">
        <p>{{textForDisplay}} <span v-if="!expandText && isLongTxt">...</span></p>
        <button class="long-text-btn" v-if="isLongTxt" @click="toggleText">{{textButton}}</button>
    </div>
</template>

<script>
export default {
    props: ['summary'],
    data() {
        return {
            expandText: false,
            textBtn: ''
        }
    },
    methods: {
        toggleText() {
            this.expandText = !this.expandText
        }
    },
    computed: {
        textForDisplay() {
            return this.expandText ? this.summary : this.summary.slice(0, 200)
        },
        textButton() {
            return this.expandText ? 'Hide' : 'Show'
        },
        isLongTxt() {
            return this.summary.length > 200
        }
    }

}
</script>