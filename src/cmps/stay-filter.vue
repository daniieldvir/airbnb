<template>
  <section class="main-filters">
    <label for="city-filter"
      >Where are you going?
      <select v-model="filterBy.city" name="city-filter">
        <!-- <option disabled value="">Where are you going?</option> -->
        <option value="GB">London</option>
        <option value="IS">Tel Aviv</option>
        <option value="HK">Hong Kong</option>
      </select>
    </label>
    <date-picker @filtered="setDates" />
    <button @click="toggleGuests">Guests</button>
    <guest-filter
      :currFilterBy="filterBy"
      v-if="guestShouldShow"
      @addedGuests="addGuests"
      @blur="toggleGuests"
    />

    <button @click="filter">Search</button>
  </section>
</template>

<script>
import datePicker from '../cmps/date-picker.vue';
import guestFilter from '../cmps/guest-filter.vue';
export default {
  name: 'stay-filter',

  data() {
    return {
      filterBy: null,
      guestShouldShow: false,
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
      this.filterBy = filterBy;
    },
    filter() {
      this.$emit('filtered', this.filterBy);
    },
    toggleGuests() {
      this.guestShouldShow = !this.guestShouldShow;
    },
  },
  components: {
    datePicker,
    guestFilter,
  },
};
</script>
