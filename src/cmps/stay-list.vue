<template>
  <section>
    <div class="loader" v-if="isLoading"><img src="../assets/grid.svg"></div>
    <!-- <img v-if="isLoading" src="grid.svg" alt=""> -->
    <ul v-if="!isLoading" class="stay-list">
      <li class="clear-list stay-list" v-for="stay in stays" :key="stay._id">
        <stay-preview :stay="stay"> </stay-preview>
      </li>
    </ul>
  </section>
</template>

<script>
import stayPreview from './stay-preview.vue';
import secondaryFilters from './filters/secondary-filters.vue';

export default {
  name: 'stay-list',
  props: ['stays'],
  data() {
    return {
      // isLoading:false
      // stays: null,
      // city: null,
    };
  },
  created() {
    this.$store.dispatch({ type: 'loadStays' });
  },
  computed:{
    isLoading(){
      return this.$store.getters.isLoading;
    }
  },
  components: {
    stayPreview,
    secondaryFilters,
  },
};
</script>
<style></style>
