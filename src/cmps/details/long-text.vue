<template>
  <div class="long-text-container">
    <p>{{ textForDisplay }} <span v-if="!expandText && isLongTxt">...</span></p>
    <p class="long-text-btn" v-if="isLongTxt" @click="toggleText">
      {{ textButton }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'long-text',
  props: ['summary'],
  data() {
    return {
      expandText: false,
      textBtn: '',
    };
  },
  methods: {
    toggleText() {
      this.expandText = !this.expandText;
    },
  },
  computed: {
    textForDisplay() {
      return this.expandText ? this.summary : this.summary.slice(0, 210);
    },
    textButton() {
      return this.expandText ? 'Hide' : 'Show More >';
    },
    isLongTxt() {
      return this.summary.length > 210;
    },
  },
};
</script>
