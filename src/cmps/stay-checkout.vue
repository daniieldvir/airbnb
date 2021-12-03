<template>
  <section class="stay-checkout flex column">
    <section class="checkout-container flex">
      <div class="checkout-form-container">
        <div class="checkout-form-header flex space-between align-center">
          <div class="order-price-container">
            <p class="price">
              <span>${{ stay.price }}</span
              >/night
            </p>
          </div>
          <div class="check-rating-container flex align-center">
            <font-awesome-icon icon="star" />{{ stay.avgRate }}
            <span> {{ formattedReviews }}</span>
          </div>
        </div>

        <div class="form-container">
          <div class="select-form">
            <div class="select-dates-container">
              <el-date-picker
                style="width: 100%"
                v-model="dates"
                type="daterange"
                range-separator=""
                start-placeholder="CHECK-IN"
                end-placeholder="CHECKOUT"
                ref="myDatePicker"
              ></el-date-picker>
            </div>
            <!-- <checkout-guest-modal class="select-guests-container flex space-between" @setGuests="setGuests" /> -->

            <!-- <div class="select-guests-container flex space-between"> -->
            <!-- <guest-filter/> -->
            <!-- <guest-filter :currFilterBy="filterBy" @addedGuests="addGuests" /> -->

            <!-- </div> -->
            <!-- <div class="btn-checkout-container">
                            <button class="btn-checkout">Check availability
                            </button>
                        </div> -->
          </div>
          <div class="btn-checkout-container">
            <button class="btn-checkout" @click="checkout">
              Check availability
            </button>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import checkoutGuestModal from './checkout-guest-modal.vue';
export default {
  props: {
    stay: Object,
    dates: Array,
  },

  data() {
    return {
      filterBy: null,
      // guestShouldShow: false,
    };
  },

  created() {
    this.loadFilter();
  },
  computed: {
    formattedReviews() {
      //maybe 0 reviews
      if (!this.stay.reviews.length) return `(new)`;
      if (this.stay.reviews.length === 1)
        return `(${this.stay.reviews.length} review)`;
      else if (this.stay.reviews.length > 1)
        return `(${this.stay.reviews.length} reviews)`;
    },
  },

  methods: {
    loadFilter() {
      const filterBy = this.$store.getters.filterBy;
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
    },
    // setDates(selectedDates) {
    //   this.filterBy.dates = selectedDates;
    // },
    addGuests(filterBy) {
      this.filterBy.guests = filterBy.guests;
      this.filterBy.totalGuests = filterBy.totalGuests;
    },
    filter() {
      this.$emit('filtered', this.filterBy);
    },
    checkout() {},
  },
  components: { checkoutGuestModal },
};
</script>
