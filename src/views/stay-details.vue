<template>
  <section v-if="stay" class="stay-details main-container">
    <h2>{{ stay.name }}</h2>
    <a href=""> {{ stay.loc.address }}</a>
    <div class="images-display-container">
      <div class="imgs-content"  v-for="(img, idx) in imgs" :key="idx">
              <img :src="img" alt="" />
      </div>
    </div>
        <!-- <font-awesome-icon :icon="['fas', 'home']" /> -->
        <div class="assets-container">
            <div class="assets-content">
              <div class="icon"> <font-awesome-icon icon="home" /> </div>
              <div class="asset-details">
                <h4>Entire home</h4>
                <p>You’ll have the loft to yourself.</p>
              </div>
            </div>
            <div class="assets-content">
                <div class="icon"> <font-awesome-icon icon="broom" /> </div>
                <div class="asset-details">
                  <h4>Enhanced Clean</h4>
                  <p>This Host committed to Airbnb's 5-step enhanced cleaning process. Show more</p>
                </div>
            </div>
            <div class="assets-content">
              <div class="icon"> <font-awesome-icon icon="door-closed" /> </div>
              <div class="asset-details">
                <h4>Self check-in</h4>
                <p>Check yourself in with the lockbox.</p>
              </div>
            </div>
            <div class="assets-content">
              <div class="icon"> <font-awesome-icon icon="map-marker-alt" /> </div>
              <div class="asset-details">
                <h4>Great location</h4>
                <p>100% of recent guests gave the location a 5-star rating.</p>
              </div>
            </div>
          </div>
    </section>
</template>

<script>
// import '@fortawesome/fontawesome-free/js/all.js';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import {
//   faHome,
// 	faWifi,
// 	faPaw,
// 	faSnowflake,
// 	faUserShield,
// 	faShieldAlt,
// } from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'stayDetails',
  data() {
    return {
      isLoading: true,
      stay: null,
      imgs: null,
    };
  },
  created() {
    const { stayId } = this.$route.params;
    this.$store
      .dispatch({ type: 'getStayById', stayId: stayId })
      .then((stay) => {
        this.stay = JSON.parse(JSON.stringify(stay));
        const imgs = this.$store.getters.imgsToShow;
        console.log('imgs', imgs);
        this.imgs = imgs;
      });
  },
  // this.$store.dispatch.loadStay();
  computed: {
    // stay() {
    //   return this.$store.getters.currStay;
    // },
  },
  methods: {},
};
</script>
