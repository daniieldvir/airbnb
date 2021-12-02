<template>
  <section class="city-filter">
    <label for="city-filter"
      >Where are you going?
      <select v-model="filterBy.city" @change="filteredCity" name="city-filter">
        <option value="GB">London</option>
        <option value="IS">Tel Aviv</option>
        <option value="HK">Hong Kong</option>
      </select>
    </label>
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
    };
  },
  created() {
    // this.loadFilter();
  },
  methods: {
    filteredCity() {
      this.$emit('filteredCity', this.filterBy);
    },
  },
  computed: {},
  components: {},
};
</script>
