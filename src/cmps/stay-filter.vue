<template>
  <section
    v-bind:class="{ 'small-filter': onExplorePage }"
    class="main-filters"
  >
    <city-filter
      :currFilterBy="filterBy"
      :onExplorePage="onExplorePage"
      @filteredCity="filterCity"
      @filterClicked="enlargeSearchBtn"
    />
    <!-- OLD DATE PICKER: -->
    <!-- <date-picker @filtered="setDates" @filterClicked="enlargeSearchBtn" /> -->

    <double-date-picker v-if="onExplorePage" />
    <date-picker
      v-else
      @filtered="setDates"
      @filterClicked="enlargeSearchBtn"
    />
    <guest-filter @addedGuests="addGuests" @filterClicked="enlargeSearchBtn" />
    <div class="search-btn-container flex">
      <button class="flex search-btn" @click="filter">
        <font-awesome-icon icon="search" />
        <span class="search" v-if="largeSearchBtn && !onExplorePage"
          >Search</span
        >
      </button>
    </div>
  </section>
</template>

<script>
import datePicker from '../cmps/filters/date-picker-2.vue';
import doubleDatePicker from '../cmps/filters/double-date-picker.vue';
import guestFilter from '../cmps/guest-filter.vue';
import cityFilter from '../cmps/city-filter-copy.vue';
export default {
  name: 'stay-filter',
  props: ['onExplorePage'],

  data() {
    return {
      filterBy: null,
      largeSearchBtn: false,
      // onExplorePage: false,
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
      console.log('fron stay filter got:', this.filterBy);
    },
    addGuests(filterBy) {
      this.filterBy.guests = filterBy.guests;
      this.filterBy.totalGuests = filterBy.totalGuests;
    },
    filterCity(filterBy) {
      this.filterBy.city = filterBy.city;
    },
    filter() {
      const filterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$store.dispatch({ type: 'setFilter', filterBy });
      this.$emit('filtered', filterBy);
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
    doubleDatePicker,
  },
};
</script>
