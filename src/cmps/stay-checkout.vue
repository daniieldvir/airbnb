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
            />
            
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
            <date-picker @filtered="setDates" />
            <checkoutGuestModal @addedGuests="setGuests" :stay="stay" />
            <!-- <span><font-awesome-icon icon="chevron-down" /></span> -->
            <!-- </div> -->
          </div>
          <span :class="{ 'show-alert': userAlert }" class="user-alert">{{
            userAlert
          }}</span>
          <div class="btn-checkout-container">
            <!-- <button class="btn-checkout" @mousemove="changeBtnColor" @click="checkout">
              <span>Check availability</span> -->
            <button class="btn-checkout" @mousemove="changeBtnColor" @click="checkOut">
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
    <checkout-modal
      :txt="userAlert"
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
    // dates: Array,
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
    // btnTxt() {},
    totalPrice() {
      return this.order.totalPrice;
    },
    totalNights() {
      return this.order.totalNights;
    },
  },

  methods: {
    loadFilter() {
      const filterBy = this.$store.getters.filterBy;
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
    },
    setDates(selectedDates) {
      this.order.dates = selectedDates;
    },
    setGuests(numOfGuests) {
      console.log(numOfGuests);
      this.order.totalGuests = numOfGuests;
    },
    changeBtnColor(e){
      // const x = e.pageX - e.target.offsetLeft
      // const y = e.pageY - e.target.offsetTop
       const x = e.offsetX - e.target.offsetLeft
      const y = e.offsetY - e.target.offsetLeft
      e.target.style.setProperty('--x', `${x}px`)
      e.target.style.setProperty('--y', `${y}px`)
      // e.target.style.setProperty('--x', `${ x }px`)
      // e.target.style.setProperty('--y', `${ y }px`)
      console.log('e', e);
      console.log('x,y',x,y);
    },
    checkout() {
      Swal.fire({
        title: 'Thank you for booking!',
        text: 'Press done',
        icon: 'success',
        confirmButtonText: 'Done',
      });
    },
    checkOut() {
      const { checkInDate, checkOutDate } = this.order.dates;
      if (!this.isOrderReady) {
        if (checkInDate && checkOutDate) {
          this.prepareOrder();
        } else {
          this.userAlert = 'Please enter dates';
        }
      } else {
        this.userAlert = 'Thank you for booking!';
        this.showCheckOutModal('Thank you for booking!');
        this.$emit('orderReady', this.order);
      }
      // const { totalGuests } = this.order;
    },
    prepareOrder() {
      const { checkInDate, checkOutDate } = this.order.dates;
      const difference = checkOutDate.getTime() - checkInDate.getTime();
      const nights = Math.ceil(difference / (1000 * 3600 * 24));
      const totalPrice = this.stay.price * nights;
      if (totalPrice < 0) {
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
      this.isModalOpen = false;
    },
    loadEmptyOrder() {
      const emptyOrder = this.$store.getters.emptyOrder;
      this.order = JSON.parse(JSON.stringify(emptyOrder));
    },
  },
  components: { datePicker, checkoutGuestModal, checkoutModal, move },
};
</script>
