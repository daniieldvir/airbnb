<template>
  <section class="trip-preview-container">
    <div class="trip-preview">
      <img v-for="(img, idx) in trip.imgUrls" :src="img" :key="idx" />
      <div class="preview-left flex column">
        <strong>{{ trip.stayName }}</strong>
        <span>${{ formattedPrice }}</span>
        <span>{{ capitalCharStatus }}</span>
      </div>
      <div class="preview-right flex column">
        <span>{{ trip.checkInDate }}</span>
        <span>{{ trip.checkOutDate }}</span>
        <span @click="cancelOrder(trip.orderId)" class="btn">Cancel order</span>
      </div>
    </div>
  </section>
</template>

<script>
import confirmModal from '../cmps/confirm-modal.vue';
export default {
  name: 'trip-preview',
  props: { trip: Object },
  data() {
    return {};
  },
  methods: {
    cancelOrder(orderId) {
      this.$emit('cancelOrder', orderId);
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
    capitalCharStatus() {
      const status = this.trip.status;
      return status.charAt(0).toUpperCase() + status.slice(1);
    },
    formattedPrice() {
      const price = this.trip.totalPrice;
      return price.toLocaleString();
    },
  },
  components: {},
};
</script>
