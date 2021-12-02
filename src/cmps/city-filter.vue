<template>
  <section class="city-filter">
    <div class="dropdown">
      <button @click="toggleModal()">Where are you going?</button>
      <div v-bind:class="{ show: shouldShow }" class="dropdown-content">
        <!-- <select
          v-model="filterBy.city"
          @change="filteredCity"
          name="city-filter"
        > -->
        <option value="GB">London</option>
        <option value="IS">Tel Aviv</option>
        <option value="HK">Hong Kong</option>
        <!-- </select> -->
      </div>
    </div>

    <!-- <label for="city-filter"
      >Where are you going?
      <select v-model="filterBy.city" @change="filteredCity" name="city-filter">
        <option value="GB">London</option>
        <option value="IS">Tel Aviv</option>
        <option value="HK">Hong Kong</option>
      </select>
    </label> -->
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
      shouldShow: false,
    };
  },
  created() {
    // this.loadFilter();
  },
  methods: {
    filteredCity() {
      this.$emit('filteredCity', this.filterBy);
    },
    toggleModal() {
      this.shouldShow = !this.shouldShow;
    },
  },
  computed: {},
  components: {},
};
</script>
