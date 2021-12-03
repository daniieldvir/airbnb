<template>
  <section class="city-filter">
    <label>Location</label>
    <!-- <button @click="toggleLocations">Where are you going?</button> -->
    <div class="location-btn toggel-btn" @click="toggleLocations">
      Where are you going?
    </div>

    <ul class="dropdown-list" v-if="shouldShow" @blur="toggleLocations">
      <p>{{ city[0] }}</p>
      <p>{{ city[1] }}</p>
      <p>{{ city[2] }}</p>
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
      city: ['London', 'Tel Aviv', 'Hong Kong'],
      shouldShow: false,
    };
  },
  created() {
    // this.loadFilter();
  },
  methods: {
    filteredCity() {
      this.$emit('filteredCity', this.filterBy);
    },
    toggleLocations() {
      this.shouldShow = !this.shouldShow;
    },
  },
  computed: {},
  components: {},
};
</script>
