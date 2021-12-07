<template>
  <section class="checkout-guest-modal">
    <div class="toggle-btn" @click="toggleGuests">
      <label
        >Guests
        <span class="add-guests-input">{{ guestsAdded }}</span>
      </label>
      <font-awesome-icon icon="chevron-down" />
    </div>
    <!-- <button @click="toggleGuests">Add Guests</button> -->
    <div v-if="shouldShow" v-click-outside="onClickOutside" class="add-guests">
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
          <button
            class="reduce-btn"
            @click="addGuest(-1, name)"
            :class="{
              'not-allowed': !value || (name === 'adults' && value === 1),
              'added-guests': value > 0,
            }"
          >
            &ndash;
          </button>
          <div class="counter">{{ value }}</div>
          <button
            class="add-btn"
            @click="addGuest(1, name)"
            :class="{ 'disabled-btn': disabledBtns[name] }"
          >
            +
          </button>
        </div>
      </div>
      <a @click="toggleGuests">Close</a>
    </div>
    <!-- </div> -->
  </section>
</template>

<script>
export default {
  name: 'checkout-guest-modal',
  props: { stay: Object },
  data() {
    return {
      filterBy: this.currFilterBy,
      msgs: ['Age 13 +', 'Ages 2-12', 'Under 2', ''],
      shouldShow: false,
      disabledBtns: {
        adults: false,
        children: false,
        infants: false,
        pets: false,
      },
    };
  },
  created() {
    this.loadFilter();
    this.addGuest(1, 'adults');
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
      this.toggleDisabledBtns(val, name);
      if (
        val === 1 &&
        this.filterBy.totalGuests + 1 > this.stay.capacity &&
        (name === 'adults' || name === 'children')
      ) {
        return;
      }
      if (!this.filterBy.guests[name] && val === -1) return;
      if (this.filterBy.guests.adults === 1 && name === 'adults' && val === -1)
        return;
      if (name === 'infants' && val === 1 && this.filterBy.guests.infants > 4)
        return;

      this.filterBy.guests[name] += val;
      if (name === 'adults' || name === 'children')
        this.filterBy.totalGuests += val;

      this.$emit('addedGuests', this.filterBy.totalGuests);
    },
    toggleDisabledBtns(val, name) {
      if (val === 1 && this.filterBy.totalGuests + 1 > this.stay.capacity) {
        if (name !== 'pets') {
          this.disabledBtns[name] = true;
        }
      } else {
        this.disabledBtns[name] = false;
      }
      if (name === 'infants') {
        if (this.filterBy.guests.infants > 3) {
          this.disabledBtns.infants = true;
        } else {
          this.disabledBtns.infants = false;
        }
      }
    },
    onClickOutside() {
      this.shouldShow = false;
    },
  },
  computed: {
    guestsAdded() {
      const totalGuests = this.filterBy.totalGuests;
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
