<template>
  <section class="footer-container">
    <!-- <div > -->
    <ul class="footer-list clean-list">
      <h4>Top Rated</h4>
      <li
        class="footer-card pointer"
        v-for="place in places"
        :key="place.name"
        @click="cardClicked(place)"
      >
        <div class="top-footer">
          <template v-if="place.avgRate"> </template>
          <p>{{ place.name }}</p>
          <p>{{ place.loc.city }}</p>
        </div>
      </li>
    </ul>
    <!-- </div> -->
  </section>
</template>

<script>
export default {
  name: 'home-list',
  props: ['places', 'listTitle'],
  data() {
    return {};
  },
  created() {},
  methods: {
    cardClicked(place) {
      this.$emit('cardClicked', place);
    },
  },

  components: {},
};
</script>
