<template>
  <section class="main-filters">
    <city-filter :currFilterBy="filterBy" @filteredCity="filterCity" />
    <date-picker @filtered="setDates" />
    <!-- <button @click="toggleGuests">Guests</button> -->
    <guest-filter :currFilterBy="filterBy" @addedGuests="addGuests" />

    <button @click="filter">Search</button>
  </section>
</template>

<script>
import datePicker from '../cmps/date-picker.vue';
import guestFilter from '../cmps/guest-filter.vue';
import cityFilter from '../cmps/city-filter.vue';
export default {
  name: 'stay-filter',

  data() {
    return {
      filterBy: null,
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
  },
  components: {
    datePicker,
    guestFilter,
    cityFilter,
  },
};
</script>
