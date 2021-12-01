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
      },
    };
  },
  created() {},
  methods: {
    filter() {
      // location names in data in UPPERCASE
      this.$emit('filtered', this.filterBy);
      this.filterBy = {
        city: '',
        guests: '',
      };
    },
  },
  components: {
    datePicker,
  },
};
</script>
