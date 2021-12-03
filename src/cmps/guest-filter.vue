<template>
  <section class="guest-filter">
    <label>Guests</label>
    <!-- <button @click="toggleGuests">Add Guests</button> -->
    <div class="toggel-btn" @click="toggleGuests">Add Guests</div>
    <ul v-if="shouldShow" @blur="toggleGuests" class="clear-list add-guests">
      <li v-for="(value, name, idx) in filterBy.guests" :key="idx">
        <div class="selection">
          <h3>{{ name[0].toUpperCase() + name.substring(1) }}</h3>
          <h4>{{ msgs[idx] }}</h4>
        </div>
        <div class="flex multi-choice">
          <button class="reduce-btn" @click="addGuest(-1, name)">-</button>
          <h2>{{ value }}</h2>
          <button class="add-btn" @click="addGuest(1, name)">+</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'guest-filter',
  props: {
    // currFilterBy: Object,
  },
  data() {
    return {
      filterBy: this.currFilterBy,
      msgs: ['Ages 13 or above', 'Ages 2-12', 'Under 2', ''],
      shouldShow: false,
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
    toggleGuests() {
      this.shouldShow = !this.shouldShow;
    },
    addGuest(val, name) {
      if (!this.filterBy.guests[name] && val === -1) return;
      this.filterBy.guests[name] += val;
      if (name === 'adults' || name === 'children')
        this.filterBy.totalGuests += val;
      this.$emit('addedGuests', this.filterBy);
    },
  },
  computed: {},
  components: {},
};
</script>
