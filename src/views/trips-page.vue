<template>
  <section class="trips-page main-container">
    <h1>Trips</h1>
    <ul class="clean-list flex">
      <li :class="{ active: showUpcoming }">Upcoming</li>
      <li :class="{ active: showPast }">Past</li>
    </ul>
    <section class="trip-list-container">
      <trip-preview v-for="trip in trips" :trip="trip" :key="trip.id" />
    </section>
  </section>
</template>

<script>
import tripPreview from '../cmps/trip-preview.vue';

export default {
  name: 'trips-page',
  data() {
    return {
      loggedInUser: null,
      trips: [],
      showUpcoming: true,
      showPast: false,
      stay: null,
    };
  },
  async created() {
    this.loggedInUser = this.$store.getters.loggedInUser;
    this.createTrips();
  },
  methods: {
    async createTrips() {
      const user = {
        userId: this.loggedInUser._id,
        userType: 'user',
      };
      await this.$store.dispatch({ type: 'loadOrders', user });
      const orders = this.$store.getters.ordersToShow;
      orders.forEach((order) => {
        this.createTrip(order);
      });
    },
    async createTrip(order) {
      const stay = await this.$store.dispatch({
        type: 'getStayById',
        stayId: order.stay._id,
      });
      const { totalPrice, status } = order;
      const trip = {
        imgUrls: stay.imgUrls.slice(0, 3),
        stayName: stay.name,
        checkInDate: new Date(order.dates.checkInDate).toLocaleDateString(),
        checkOutDate: new Date(order.dates.checkOutDate).toLocaleDateString(),
        totalPrice,
        status,
        id: this.createId(),
      };
      this.trips.push(trip);
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
  computed: {},
  mounted() {
    window.scrollTo(0, 0);
  },
  components: {
    tripPreview,
  },
};
</script>
