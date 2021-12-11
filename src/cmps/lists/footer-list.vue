<template>
  <section class="footer-container">
    <template>
      <p class="list-title">{{ listTitle }}</p>

      <ul class="footer-list clean-list">
        <li
          class="footer-card pointer"
          v-for="place in places"
          :key="place.name"
          @click="cardClicked(place)"
        >
          <div class="top-footer">
            <template v-if="place.avgRate" />
            <p>{{ place.name }}</p>
          </div>
        </li>
      </ul>
    </template>
  </section>
</template>

<script>
export default {
  name: 'footer-list',
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
