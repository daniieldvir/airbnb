<template>
  <section class="main-filters">
    <city-filter
      :currFilterBy="filterBy"
      @filteredCity="filterCity"
      @filterClicked="enlargeSearchBtn"
    />

    <date-picker @filtered="setDates" @filterClicked="enlargeSearchBtn" />

    <guest-filter @addedGuests="addGuests" @filterClicked="enlargeSearchBtn" />

    <button class="search" @click="filter">
      <font-awesome-icon icon="search" />
      <span v-if="largeSearchBtn">Search</span>
    </button>
  </section>
</template>

<script>
import datePicker from '../cmps/date-picker.vue';
import guestFilter from '../cmps/guest-filter.vue';
import cityFilter from '../cmps/city-filter-copy.vue';
export default {
  name: 'stay-filter',

  data() {
    return {
      filterBy: null,
      largeSearchBtn: false,
      // guestShouldShow: false,
    };
  },
  created() {
    this.loadFilter();
  },
  methods: {
    loadFilter() {
      const filterBy = this.$store.getters.filterBy;
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
    },
    setDates(selectedDates) {
      this.filterBy.dates = selectedDates;
    },
    addGuests(filterBy) {
      this.filterBy.guests = filterBy.guests;
      this.filterBy.totalGuests = filterBy.totalGuests;
    },
    filterCity(filterBy) {
      this.filterBy.city = filterBy.city;
    },
    filter() {
      this.$emit('filtered', this.filterBy);
    },
    // toggleGuests() {
    //   this.guestShouldShow = !this.guestShouldShow;
    // },
    enlargeSearchBtn() {
      this.largeSearchBtn = true;
    },
  },
  components: {
    datePicker,
    guestFilter,
    cityFilter,
  },
};
</script>
