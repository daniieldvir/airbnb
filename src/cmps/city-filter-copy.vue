<template>
  <section class="city-filter flex">
    <!-- <button @click="toggleLocations">Where are you going?</button> -->
    <div class="toggel-btn" @click="toggleLocations">
      <span v-if="onExplorePage || (!topOfPage && onHomePage)">{{
        city || 'Location'
      }}</span>
      <template v-else>
        <label>Location</label>
        <span>
          {{ city || 'Where are you going?' }}
        </span>
      </template>
    </div>

    <ul
      v-click-outside="onClickOutside"
      class="dropdown-list"
      v-if="shouldShow"
      @blur="toggleLocations"
    >
      <p @click="filterCity('London')">
        <img
          src="https://res.cloudinary.com/disku3v4j/image/upload/v1639404739/travel%20posters/london1_u0cqhx.jpg"
        />
        London
      </p>
      <p @click="filterCity('Tel Aviv')">
        <img
          src="https://res.cloudinary.com/disku3v4j/image/upload/v1639404955/travel%20posters/3t_h2o25l.jpg"
        />
        Tel Aviv
      </p>
      <p @click="filterCity('Hong Kong')">
        <img
          src="https://res.cloudinary.com/disku3v4j/image/upload/v1639404955/travel%20posters/2h_ldod24.jpg"
        />
        Hong Kong
      </p>
      <p @click="filterCity('Rome')">
        <img
          src="https://res.cloudinary.com/disku3v4j/image/upload/v1639404041/travel%20posters/roma_veffst.jpg"
        />
        Rome
      </p>
      <p @click="filterCity('flexible')">
        <img
          src="https://res.cloudinary.com/disku3v4j/image/upload/v1639404040/travel%20posters/flex_o4lqla.jpg"
        />
        I'm flexible
      </p>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'city-filter',
  props: {
    currCity: String,
    onExplorePage: Boolean,
    topOfPage: Boolean,
    onHomePage: Boolean,
  },
  data() {
    return {
      city: this.currCity,
      // city: ['London', 'Tel Aviv', 'Hong Kong'],
      shouldShow: false,
    };
  },
  created() {
    // this.loadFilter();
  },
  methods: {
    filterCity(city) {
      this.city = city;
      this.$emit('filteredCity', city);
      this.toggleLocations();
    },
    toggleLocations() {
      this.$emit('filterClicked');
      this.shouldShow = !this.shouldShow;
    },
    onClickOutside() {
      this.shouldShow = false;
    },
  },
  computed: {},
  components: {},
};
</script>
