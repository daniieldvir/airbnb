<template>
  <section class="stay-checkout">
    <section class="checkout-container">
      <div class="checkout-form-container">
        <div class="checkout-form-header flex space-between align-center">
          <div class="order-price-container">
            <p class="price">${{ stay.price }}<span> / night</span></p>
          </div>
          <div class="check-rating-container flex align-center">
            <font-awesome-icon icon="star" />
            <p>{{ avgRate }}</p>
            <span> {{ formattedReviews }}</span>
          </div>
        </div>
        <div class="form-container">
          <div class="select-form">
            <date-picker @filtered="setDates" />
            <checkoutGuestModal @addedGuests="setGuests" :stay="stay" />
            <!-- <span><font-awesome-icon icon="chevron-down" /></span> -->
            <!-- </div> -->
          </div>
          <span :class="{ 'show-alert': userAlert }" class="user-alert">{{
            userAlert
          }}</span>
          <div class="btn-checkout-container">
            <button
              class="btn-checkout"
              @mousemove="changeBtnColor"
              @click="checkOut"
              :disabled="btnTxt === 'Reserved!'"
            >
              <span>{{ btnTxt }}</span>
            </button>
          </div>
        </div>
        <!-- OUTPUT -->
        <template v-if="showOrderPreview">
          <section class="order-preview flex column">
            <span>You won't be charged yet</span>
            <div class="flex">
              <span>${{ stay.price }} x {{ totalNights }} nights</span>
              <span>${{ totalPrice }}</span>
            </div>
            <div class="flex">
              <span>Service fee</span>
              <span>$0</span>
            </div>
            <hr />
            <div class="flex">
              <span>Total</span>
              <span>${{ totalPrice }}</span>
            </div>
          </section>
        </template>
      </div>
    </section>

    <section class="section-checkout">
      <checkout-modal
        :txt="userAlert"
        class="checkout-modal"
        v-if="isModalOpen"
        @closeModal="closeModal"
      ></checkout-modal>
    </section>
  </section>
</template>

<script>
import checkoutGuestModal from '../details/checkout-guest-modal.vue';
import datePicker from '../filters/date-picker-2.vue';
import checkoutModal from '../details/checkout-modal.vue';

export default {
  name: 'stay-checkout',
  props: {
    stay: Object,
  },

  data() {
    return {
      filterBy: null,
      isModalOpen: false,
      order: null,
      showOrderPreview: false,
      isOrderReady: false,
      btnTxt: 'Check availability',
      userAlert: 0,
    };
  },

  created() {
    this.loadFilter();
    this.loadEmptyOrder();
  },
  computed: {
    formattedReviews() {
      if (!this.stay.reviews.length) return `(new)`;
      if (this.stay.reviews.length === 1)
        return `(${this.stay.reviews.length} review)`;
      else if (this.stay.reviews.length > 1)
        return `(${this.stay.reviews.length} reviews)`;
    },
    totalPrice() {
      return this.order.totalPrice.toLocaleString();
    },
    totalNights() {
      return this.order.totalNights;
    },
    avgRate() {
      if (!this.stay.reviews.length) return 0;
      const sum = this.stay.reviews.reduce((acc, review) => {
        return acc + review.rate;
      }, 0);
      return (sum / this.stay.reviews.length).toFixed(1);
    },
  },

  methods: {
    loadFilter() {
      const filterBy = this.$store.getters.filterBy;
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
    },
    setDates(selectedDates) {
      this.filterBy.dates = selectedDates;
      this.order.dates = this.filterBy.dates;
    },
    setGuests(numOfGuests) {
      this.order.totalGuests = numOfGuests;
    },
    changeBtnColor(e) {
      const x = e.offsetX - e.target.offsetLeft;
      const y = e.offsetY - e.target.offsetLeft;
      e.target.style.setProperty('--x', `${x}px`);
      e.target.style.setProperty('--y', `${y}px`);
    },
    // checkout() {
    //   Swal.fire({
    //     title: 'Thank you for booking!',
    //     text: 'Press done',
    //     icon: 'success',
    //     confirmButtonText: 'Done',
    //   });
    // },
    checkOut() {
      this.order.dates = this.filterBy.dates;
      const { checkInDate, checkOutDate } = this.order.dates;
      if (!this.isOrderReady) {
        if (checkInDate && checkOutDate) {
          this.prepareOrder();
        } else {
          this.userAlert = 'Please enter dates';
        }
      } else {
        this.btnTxt = 'Reserved!';
        this.showCheckOutModal('Thank you for booking!');
        this.$emit('orderReady', this.order);
      }
    },
    prepareOrder() {
      let { checkInDate, checkOutDate } = this.order.dates;
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      const difference = checkOut.getTime() - checkIn.getTime();
      const nights = Math.ceil(difference / (1000 * 3600 * 24));
      const totalPrice = this.stay.price * nights;
      if (totalPrice <= 0) {
        this.userAlert = 'Please enter valid dates';
        return;
      }

      this.btnTxt = 'Reserve';
      this.order.totalPrice = totalPrice;
      this.order.totalNights = nights;

      this.isOrderReady = true;
      this.userAlert = '';
      this.showOrderPreview = true;
    },
    // filter() {
    //   this.$emit('filtered', this.filterBy);
    // },
    showCheckOutModal() {
      this.isModalOpen = true;
      setTimeout(this.closeModal, 5000);
    },
    closeModal() {
      // this.btnTxt = 'Check availability';
      this.isModalOpen = false;
      this.showOrderPreview = false;
    },
    loadEmptyOrder() {
      const emptyOrder = this.$store.getters.getEmptyOrder;
      this.order = JSON.parse(JSON.stringify(emptyOrder));
    },
  },
  components: { datePicker, checkoutGuestModal, checkoutModal },
};
</script>
