<template>
  <section v-if="stay" class="stay-details main-container">
    <h2>{{ stay.name }}</h2>
    <a href=""> {{ stay.loc.address }}</a>
    <div class="images-display-container">
      <div class="imgs-content" v-for="(img, idx) in imgs" :key="idx">
        <img :src="img" alt="" />
      </div>
    </div>
    <div class="stay-details-left-container">
      <div class="info-header flex align-center space-between">
        <div>
          <h2>{{ stay.type }} hosted by {{ stay.host.fullname }}</h2>
          <span
            >{{ stay.capacity }} guests &#183; {{ stay.type }} &#183;
            {{ beds }}
          </span>
        </div>
        <img :src="stay.host.imgUrl" alt="" />
      </div>
      <hr />
      <!-- <font-awesome-icon :icon="['fas', 'home']" /> -->
      <div class="assets-container">
        <div class="assets-content">
          <div class="icon"><font-awesome-icon icon="home" /></div>
          <div class="asset-details">
            <h4>Entire home</h4>
            <p>You’ll have the loft to yourself.</p>
          </div>
        </div>
        <div class="assets-content">
          <div class="icon"><font-awesome-icon icon="broom" /></div>
          <div class="asset-details">
            <h4>Enhanced Clean</h4>
            <p>
              This Host committed to Airbnb's 5-step enhanced cleaning process.
              Show more
            </p>
          </div>
        </div>
        <div class="assets-content">
          <div class="icon"><font-awesome-icon icon="door-closed" /></div>
          <div class="asset-details">
            <h4>Self check-in</h4>
            <p>Check yourself in with the lockbox.</p>
          </div>
        </div>
        <div class="assets-content">
          <div class="icon"><font-awesome-icon icon="map-marker-alt" /></div>
          <div class="asset-details">
            <h4>Great location</h4>
            <p>100% of recent guests gave the location a 5-star rating.</p>
          </div>
        </div>
      </div>
      <hr />
      <div class="details-summary-container">
        <p>{{ stay.summary }}</p>
      </div>
      <hr />
      <div class="stay-details-amenities">
        <h2>What this place offers</h2>
        <div>
          <div v-for="(amenity, idx) in stay.amenities" :key="idx">
            <font-awesome-icon :icon="iconToShow(amenity)" />
            {{ amenity }}
          </div>
        </div>
      </div>
    </div>
    <div class="stay-details-right-container"></div>

    <div class="about app-main">
      <GmapMap
        class="map"
        :stay="stay"
        :options="{
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUi: false,
        }"
      />
    </div>
  </section>
</template>

<script>
import { utilService } from '../services/util.service';
import GmapMap from '../cmps/map.vue';

// import '@fortawesome/fontawesome-free/js/all.js';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import {faHome,faWifi,faPaw,} from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'stayDetails',
  data() {
    return {
      isLoading: true,
      stay: null,
      imgs: null,
      // iconToShow:''
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
    beds() {
      return this.stay.capacity + ' ' + 'beds';
    },
    bath() {},
  },
  methods: {
    iconToShow(amenity) {
      return utilService.getIcon(amenity);
      // return 'wifi';
    },
  },
  components: { GmapMap },
};
</script>
