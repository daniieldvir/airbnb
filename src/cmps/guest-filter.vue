<template>
  <section class="guest-filter flex">
    <div class="toggel-btn" @click="toggleGuests">
      <label>Guests</label>
      <span>{{ guestsAdded }}</span>
    </div>
    <ul
      v-click-outside="onClickOutside"
      v-if="shouldShow"
      @blur="toggleGuests"
      class="clear-list add-guests"
    >
      <li v-for="(value, name, idx) in currGuests" :key="idx">
        <div class="selection">
          <h3>{{ name[0].toUpperCase() + name.substring(1) }}</h3>
          <h4>{{ msgs[idx] }}</h4>
        </div>
        <div class="multi-choice flex">
          <button
            v-bind:class="{ 'not-allowed': !value, 'added-guests': value > 0 }"
            class="reduce-btn"
            @click="addGuest(-1, name)"
          >
            &ndash;
          </button>

          <div class="counter">{{ value }}</div>
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
    currGuests: Object,
    currTotalGuests: Number,
  },
  data() {
    return {
      localFilterBy: {
        guests: {},
        totalGuests: 0,
      },
      msgs: ['Ages 13 or above', 'Ages 2-12', 'Under 2', ''],
      shouldShow: false,
    };
  },
  created() {
    this.localFilterBy.guests = this.currGuests;
    this.localFilterBy.totalGuests = this.currTotalGuests;
  },
  methods: {
    toggleGuests() {
      this.$emit('filterClicked');
      this.shouldShow = !this.shouldShow;
    },
    addGuest(val, name) {
      if (!this.currGuests[name] && val === -1) return;
      this.localFilterBy.guests[name] += val;
      if (name === 'adults' || name === 'children')
        this.localFilterBy.totalGuests += val;
      this.$emit('addedGuests', this.localFilterBy);
    },
    onClickOutside() {
      this.shouldShow = false;
    },
  },
  computed: {
    guestsAdded() {
      const totalGuests = this.localFilterBy.totalGuests;
      let res;
      if (totalGuests) {
        const str = totalGuests > 1 ? 'Guests' : 'Guest';
        res = `${totalGuests} ${str} `;
      } else {
        res = 'Add guests';
      }
      return res;
    },
  },
  components: {},
};
</script>
