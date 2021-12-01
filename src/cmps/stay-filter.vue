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
    <button @click="filter">Search</button>
  </section>
</template>

<script>
import datePicker from '../cmps/date-picker.vue';
export default {
  name: 'stay-filter',
  data() {
    return {
      filterBy: {
        city: '',
        guests: '',
        dates: [],
      },
    };
  },
  created() {},
  methods: {
    setDates(selectedDates) {
      this.filterBy.dates = selectedDates;
    },
    filter() {
      console.log(this.filterBy);
      this.$emit('filtered', this.filterBy);
      // this.filterBy = {
      //   city: '',
      //   guests: '',
      //   dates: '',
      // };
    },
  },
  components: {
    datePicker,
  },
};
</script>
