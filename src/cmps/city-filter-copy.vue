<template>
  <section class="city-filter flex">
    <!-- <button @click="toggleLocations">Where are you going?</button> -->
    <div class="toggel-btn" @click="toggleLocations">
      <span v-if="onExplorePage || (!topOfPage && onHomePage)">{{
        filterBy.city || 'Location'
      }}</span>
      <template v-else>
        <label>Location</label>
        <span>
          {{ filterBy.city || 'Where are you going?' }}
        </span>
      </template>
    </div>

    <ul
      v-click-outside="onClickOutside"
      class="dropdown-list"
      v-if="shouldShow"
      @blur="toggleLocations"
    >
      <p @click="filterCity('London')">London</p>
      <p @click="filterCity('Tel Aviv')">Tel Aviv</p>
      <p @click="filterCity('Hong Kong')">Hong Kong</p>
      <p @click="filterCity('Rome')">Rome</p>
      <p @click="filterCity('flexible')">I'm flexible</p>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'city-filter',
  props: {
    currFilterBy: Object,
    onExplorePage: Boolean,
    topOfPage: Boolean,
    onHomePage: Boolean,
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
