<template>
  <section class="city-filter">
    <label>Location</label>
    <!-- <button @click="toggleLocations">Where are you going?</button> -->
    <div class="location-btn toggel-btn" @click="toggleLocations">
      {{ filterBy.city || 'Where are you going?' }}
    </div>

    <ul class="dropdown-list" v-if="shouldShow" @blur="toggleLocations">
      <div>
        <p @click="filterCity('London')">London</p>
      </div>
      <div>
        <p @click="filterCity('Tel Aviv')">Tel Aviv</p>
      </div>
      <div>
        <p @click="filterCity('Hong Kong')">Hong Kong</p>
      </div>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'city-filter',
  props: {
    currFilterBy: Object,
  },
  data() {
    return {
      filterBy: this.currFilterBy,
      // city: ['London', 'Tel Aviv', 'Hong Kong'],
      shouldShow: false,
    };
  },
  created() {
    // this.loadFilter();
  },
  methods: {
    filterCity(city) {
      this.filterBy.city = city;
      this.$emit('filteredCity', this.filterBy);
      this.toggleLocations();
    },
    toggleLocations() {
      this.shouldShow = !this.shouldShow;
    },
  },
  computed: {},
  components: {},
};
</script>
