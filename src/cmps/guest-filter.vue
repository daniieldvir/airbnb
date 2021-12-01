<template>
  <section class="guestsFilter">
    <ul class="clear-list">
      <li v-for="(value, name, idx) in filterBy.guests" :key="idx">
        <div class="flex column">
          <h3>{{ name[0].toUpperCase() + name.substring(1) }}</h3>
          <h4>{{ msgs[idx] }}</h4>
        </div>
        <div class="flex">
          <button @click="add(-1, name)">-</button>
          <h2>{{ value }}</h2>
          <button @click="add(1, name)">+</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'guest-filter',
  props: {
    currFilterBy: Object,
  },
  data() {
    return {
      filterBy: this.currFilterBy,
      msgs: ['Ages 13 or above', 'Ages 2-12', 'Under 2', ''],
    };
  },
  created() {
    // this.loadFilter();
  },
  methods: {
    // filter() {
    //   console.log(this.filterBy);
    //   this.$emit('filtered', this.filterBy);
    // },
    // loadFilter() {
    //   const filterBy = this.$store.getters.filterBy;
    //   this.filterBy = JSON.parse(JSON.stringify(filterBy));
    // },
    add(val, name) {
      if (!this.filterBy.guests.adults && val === -1) return;
      this.filterBy.guests[name] += val;
      if (name === 'adults' || name === 'children')
        this.filterBy.totalGuests += val;
      this.$emit('addedGuests', this.filterBy);
    },
    // toggleGuests() {
    //   this.$emit('toggleGuests');
    // },
  },
  computed: {
    // guestTypes() {
    //   const keys = this.filterBy.guests.keys();
    //   return keys;
    // },
    // guests() {
    //   return this.filterBy.guests;
    // },
    // upperCase(str) {
    //   return str.toUpperCase();
    // },
    // currFilterBy() {
    //   return this.$store.getters.filterBy.guests;
    // },
  },
  components: {},
};
</script>
