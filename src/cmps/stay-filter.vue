<template>
  <section class="main-filters">
    <label for="city-filter"
      >Where are you going?
      <select v-model="filterBy.city" name="city-filter">
        <!-- <option disabled value="">Where are you going?</option> -->
        <option>London</option>
        <option>Tel Aviv</option>
        <option>Hong Kong</option>
      </select>
    </label>
    {{ filterBy }}
    <button @click="filter">Search</button>
  </section>
</template>

<script>
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
    },
  },
};
</script>
