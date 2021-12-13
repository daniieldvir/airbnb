<template>
  <section class="trip-preview-container">
    <div v-if="order.stay.imgUrls" class="trip-preview">
      <img v-for="(img, idx) in order.stay.imgUrls" :src="img" :key="idx" />
      <div class="preview-left flex column">
        <strong>{{ order.stay.name }}</strong>
        <span>${{ formattedPrice }}</span>
        <span>{{ capitalCharStatus }}</span>
      </div>
      <div class="preview-right flex column">
        <span>{{ formateDate(order.dates.checkInDate) }}</span>
        <span>{{ formateDate(order.dates.checkOutDate) }}</span>
        <span @click="cancelOrder(order._id)" class="btn">Cancel order</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'trip-preview',
  props: { order: Object },
  data() {
    return {};
  },
  created() {
    // this.orderStatus();
  },
  methods: {
    cancelOrder(orderId) {
      this.$emit('cancelOrder', orderId);
    },
    formateDate(date) {
      return new Date(date).toLocaleDateString();
    },

    // },
    // async orderStatus() {
    //   const order = await this.$store.dispatch({
    //     type: 'getOrder',
    //     orderId: this.trip.orderId,
    //   });
    //   console.log(this.trip);
    //   console.log('this.trip.orderId', this.trip.orderId);
    //   console.log(order);
    //   this.status = order.status;
    // },
  },
  computed: {
    capitalCharStatus() {
      const status = this.order.status;
      return status.charAt(0).toUpperCase() + status.slice(1);
    },
    formattedPrice() {
      const price = this.order.totalPrice;
      return price.toLocaleString();
    },
  },
  components: {},
};
</script>
