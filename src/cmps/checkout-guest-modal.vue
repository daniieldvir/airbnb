<template>
  <section class="checkout-guest-modal">
    <div class="toggle-btn" @click="toggleGuests">
      <label
        >Guests
        <span class="add-guests-input">Add Guests</span>
      </label>
      <font-awesome-icon icon="chevron-down" />
    </div>
    <!-- <button @click="toggleGuests">Add Guests</button> -->
    <div v-if="shouldShow" @blur="toggleGuests" class="add-guests">
      <div
        class="guest-item flex space-between align-center"
        v-for="(value, name, idx) in filterBy.guests"
        :key="idx"
      >
        <div>
          <h3>{{ name[0].toUpperCase() + name.substring(1) }}</h3>
          <h4>{{ msgs[idx] }}</h4>
        </div>
        <div class="action-btns flex align-center justify-center">
          <button class="reduce-btn" @click="addGuest(-1, name)">
            &ndash;
          </button>
          <div class="counter">{{ value }}</div>
          <button class="add-btn" @click="addGuest(1, name)">+</button>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </section>
</template>

<script>
export default {
  name: 'checkout-guest-modal',
  props: {},
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
      this.$emit('setGuests', this.filterBy);
    },
  },
  computed: {},
  components: {},
};
</script>
