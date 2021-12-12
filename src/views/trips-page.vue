<template>
  <section class="trips-page main-container">
    <h1>Trips</h1>
    <ul class="clean-list flex">
      <li :class="{ active: showUpcoming }">Upcoming</li>
      <li :class="{ active: showPast }">Past</li>
    </ul>
    <section class="trip-list-container">
      <trip-preview
        @cancelOrder="confirmCancellation"
        v-for="order in ordersToShow"
        :order="order"
        :key="order._id"
      />
    </section>
    <confirm-modal
      :message="'Cancel order?'"
      @confirm="cancelOrder"
      @closeModal="closeConfirmModal"
      :shouldShow="showConfirmModal"
    />
  </section>
</template>

<script>
import tripPreview from '../cmps/trip-preview.vue';
import confirmModal from '../cmps/confirm-modal.vue';

export default {
  name: 'trips-page',
  data() {
    return {
      loggedInUser: null,
      trips: [],
      showUpcoming: true,
      showPast: false,
      stay: null,
      showConfirmModal: false,
      orderIdToCancel: '',
    };
  },
  async created() {
    this.loggedInUser = this.$store.getters.loggedInUser;
    this.loadOrders();
    // this.createTrips();
  },
  methods: {
    async loadOrders() {
      const user = {
        userId: this.loggedInUser._id,
        userType: !this.loggedInUser.isHost ? 'user' : 'host',
      };
      await this.$store.dispatch({ type: 'loadOrders', user });
      // this.orders = this.$store.getters.ordersToShow;
    },
    // async createTrips() {
    //   this.trips = [];
    //   const user = {
    //     userId: this.loggedInUser._id,
    //     userType: 'user',
    //   };
    //   await this.$store.dispatch({ type: 'loadOrders', user });
    //   const orders = this.$store.getters.ordersToShow;
    //   //   orders.forEach((order) => {
    //   //     this.createTrip(order);
    //   //   });
    // },
    // async createTrip(order) {
    //   const stay = await this.$store.dispatch({
    //     type: 'getStayById',
    //     stayId: order.stay._id,
    //   });
    //   const { totalPrice, status } = order;
    //   const trip = {
    //     imgUrls: stay.imgUrls.slice(0, 3),
    //     stayName: stay.name,
    //     checkInDate: new Date(order.dates.checkInDate).toLocaleDateString(),
    //     checkOutDate: new Date(order.dates.checkOutDate).toLocaleDateString(),
    //     totalPrice,
    //     status,
    //     id: this.createId(),
    //     orderId: order._id,
    //   };
    //   this.trips.push(trip);
    // },
    confirmCancellation(orderId) {
      this.orderIdToCancel = orderId;
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
    },
    cancelOrder() {
      this.showConfirmModal = false;
      // console.log('asking to remove order component',);
      this.$store.dispatch({
        type: 'removeOrder',
        orderId: this.orderIdToCancel,
      });
      const orderId = this.orderIdToCancel;
      const tripIdx = this.trips.findIndex((trip) => {
        return trip.orderId === orderId;
      });
      if (tripIdx > -1) {
        this.trips.splice(tripIdx, 1);
      }
      this.orderIdToCancel = '';
    },
    createId() {
      return 'id' + new Date().getTime();
    },
    upperCaseFirstChar(str) {
      if (typeof str === 'string') {
        return str[0].toUpperCase() + str.substring(1);
      } else {
        return str;
      }
    },
  },
  computed: {
    tripsToShow() {
      return this.trips;
      // console.log('this.$store.getters.trips;', this.$store.getters.trips);
      // return this.$store.getters.trips;
    },
    ordersToShow() {
      return this.$store.getters.ordersToShow;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  components: {
    tripPreview,
    confirmModal,
  },
};
</script>
