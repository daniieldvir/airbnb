<template>
  <section>
    <div class="list-container column main-container">
      <h2>{{ listTitle }}</h2>
      <ul class="home-list clean-list">
        <li
          class="card pointer"
          v-for="place in places"
          :key="place.imgUrls[0]"
          @click="cardClicked(place)"
        >
          <img class="card-img" :src="place.imgUrls[0]" />
          <h4>{{ place.name }}</h4>
        </li>
      </ul>
    </div>
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
<style></style>
