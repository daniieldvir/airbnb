<template>
  <section class="stay-checkout flex column">
    <section class="checkout-container flex">
      <div class="checkout-form-container">
        <div class="checkout-form-header flex space-between align-center">
          <div class="order-price-container">
            <p class="price">${{ stay.price }}<span> / night</span></p>
          </div>
          <div class="check-rating-container flex align-center">
            <font-awesome-icon icon="star" />
            <p>{{ stay.avgRate }}</p>
            <span> {{ formattedReviews }}</span>
          </div>
        </div>

        <!-- <checkout-guest-modal
              class="select-guests-container flex space-between"
              @setGuests="setGuests"
            /> -->

        <!-- <div class="select-guests-container flex space-between"> -->
        <!-- <guest-filter/> -->
        <!-- <guest-filter :currFilterBy="filterBy" @addedGuests="addGuests" /> -->

        <!-- <div class="select-guests-container flex space-between"> -->
        <!-- <guest-filter/> -->
        <!-- <guest-filter @addedGuests="addGuests" /> -->

        <!-- </div> -->
        <!-- <div class="btn-checkout-container">
                            <button class="btn-checkout">Check availability
                            </button>
                        </div> -->
        <div class="form-container">
          <div class="select-form">
            <date-picker />
            <!-- <div class="filter-cont flex"> -->
            <checkoutGuestModal />
            <!-- <span><font-awesome-icon icon="chevron-down" /></span> -->
            <!-- </div> -->
          </div>
          <move> </move>
          <div class="btn-checkout-container">
            <button class="btn-checkout" @click="checkout">
              Check availability
            </button>
          </div>
        </div>
      </div>
    </section>
    <checkout-modal
      class="checkout-modal"
      v-if="isModalOpen"
      @closeModal="closeModal"
    ></checkout-modal>
  </section>
</template>

<script>
import checkoutGuestModal from './checkout-guest-modal.vue';
import datePicker from './filters/date-picker-2.vue';
// import guestFilter from './guest-filter.vue';
import checkoutModal from './checkout-modal.vue';
import move from './move.vue';

export default {
  props: {
    stay: Object,
    dates: Array,
  },

  data() {
    return {
      filterBy: null,
      isModalOpen: false,
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
    setGuests(filterBy) {
      this.filterBy.guests = filterBy.guests;
      this.filterBy.totalGuests = filterBy.totalGuests;
    },
    filter() {
      this.$emit('filtered', this.filterBy);
    },
    checkout() {
      this.isModalOpen = true;
      // Swal.fire({
      //   title: 'Thank you for booking!',
      //   text: 'Press done',
      //   icon: 'success',
      //   confirmButtonText: 'Done',
      // });
      // this.$router.push('/');
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
  components: { datePicker, checkoutGuestModal, checkoutModal, move },
};
</script>
