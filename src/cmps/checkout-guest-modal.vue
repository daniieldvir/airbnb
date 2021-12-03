<template>
  <section class="guest-filter">
    <label>Guests</label>
    <!-- <button @click="toggleGuests">Add Guests</button> -->
    <div class="toggle-btn" @click="toggleGuests">Add Guests
    <div v-if="shouldShow" @blur="toggleGuests" class="add-guests">
      <div v-for="(value, name, idx) in filterBy.guests" :key="idx">
        <div class="selection">
          <h3>{{ name[0].toUpperCase() + name.substring(1) }}</h3>
          <h4>{{ msgs[idx] }}</h4>
        </div>
        <div class="flex multi-choice">
          <button class="reduce-btn" @click="addGuest(-1, name)">-</button>
          <h2 class="counter">{{ value }}</h2>
          <button class="add-btn" @click="addGuest(1, name)">+</button>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'guest-filter',
  props: {  },
  data() {
    return {
      filterBy: this.currFilterBy,
      msgs: ['Ages 13 or above', 'Ages 2-12', 'Under 2', ''],
      shouldShow: false,
    };
  },
  created() {
    // this.loadFilter();
  },
  methods: {
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




    // position: absolute;
    // display: flex;
    // flex-direction: column;
    // background-color: white;
    // border: 1px solid #dfdfde;
    // border-radius: 30px;
    // font-size: 0.875rem;
    // width: 300px;
    // z-index: 9999;
    // transform: translate(-2%, 15%);
    // max-width: 500px;