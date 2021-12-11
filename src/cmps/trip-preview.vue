<template>
  <section class="trip-preview-container">
    <div class="trip-preview">
      <img v-for="(img, idx) in trip.imgUrls" :src="img" :key="idx" />
      <div class="preview-left flex column">
        <strong>{{ trip.stayName }}</strong>
        <span>${{ returnLocaleString(trip.totalPrice) }}</span>
        <span>{{ trip.status }}</span>
      </div>
      <div class="preview-right flex column">
        <span>{{ trip.checkInDate }}</span>
        <span>{{ trip.checkOutDate }}</span>
        <span class="btn">Cancel order</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'trip-preview',
  props: { trip: Object },
  data() {
    return {};
  },
  methods: {
    upperCaseFirstChar(str) {
      if (typeof str === 'string') {
        return str[0].toUpperCase() + str.substring(1);
      } else {
        return str;
      }
    },
    returnLocaleString(num) {
      return num.toLocaleString();
    },
  },
  computed: {
    //   DO FORMATED DATE
    // FORMATE PRICE
  },
  components: {},
};
</script>
