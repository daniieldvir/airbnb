<template>
  <section
    v-bind:class="{
      'small-filter': onExplorePage || (!topOfPage && onHomePage),
    }"
    class="main-filters"
  >
    <city-filter
      :currCity="'' + filterBy.city"
      :onExplorePage="onExplorePage"
      @filteredCity="filterCity"
      @filterClicked="enlargeSearchBtn"
      :topOfPage="topOfPage"
      :onHomePage="onHomePage"
    />
    <double-date-picker
      :selectedDates="filterBy.dates"
      v-if="onExplorePage || (!topOfPage && onHomePage)"
    />
    <date-picker
      v-else
      @filtered="setDates"
      @filterClicked="enlargeSearchBtn"
    />
    <guest-filter
      @addedGuests="addGuests"
      @filterClicked="enlargeSearchBtn"
      :currGuests="filterBy.guests"
      :currTotalGuests="filterBy.totalGuests"
    />
    <div class="search-btn-container flex">
      <button class="flex search-btn" @click="filter">
        <font-awesome-icon icon="search" />
        <span class="search" v-if="largeSearchBtn && onHomePage && topOfPage"
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
  props: ['onExplorePage', 'topOfPage', 'onHomePage'],

  data() {
    return {
      filterBy: null,
      localFilterBy: {
        guests: { adults: 0, children: 0, infants: 0, pets: 0 },
        totalGuests: 0,
      },
      largeSearchBtn: false,
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
      this.localFilterBy.dates = selectedDates;
    },
    addGuests(filterBy) {
      this.localFilterBy.guests = filterBy.guests;
      this.localFilterBy.totalGuests = filterBy.totalGuests;
    },
    filterCity(city) {
      this.localFilterBy.city = city;
    },
    filter() {
      const filterBy = this.localFilterBy;
      this.$store.dispatch({ type: 'setFilter', filterBy });
      if (this.$route.name !== 'Explore') {
        this.$router.push('/explore');
      } else return;
    },

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
