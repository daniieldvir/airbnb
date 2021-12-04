<template>
  <section v-if="stay" class="stay-details main-container">
    <h2>{{ formattedName }}</h2>
    <div>
      <p>
        <span>
          <!-- <span v-if="stay.reviews.length"> -->
          <font-awesome-icon icon="star" />{{ stay.avgRate }}
          <span class="details-reviews">{{ formattedReviews }}</span
          >&middot;
        </span>
        <a class="details-location" href=""> {{ stay.loc.address }}</a>
        <!-- <span class="details-location">{{ stay.loc.address }}</span> -->
      </p>
      <!-- <a href=""> {{ stay.loc.address }}</a> -->
    </div>
    <div class="images-display-container">
      <img v-for="(img, idx) in imgs" :key="idx" :src="img" alt="" />
    </div>

    <div class="details-main-container flex">
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
                This Host committed to Airbnb's 5-step enhanced cleaning
                process. Show more
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
          <div class="amenities-content">
            <div v-for="(amenity, idx) in stay.amenities" :key="idx">
              <font-awesome-icon
                class="font-amenity-icon"
                :icon="iconToShow(amenity)"
              />
              {{ amenity }}
            </div>
          </div>
        </div>
      </div>
      <div class="stay-details-right-container">
        <stay-checkout :stay="stay"></stay-checkout>
      </div>
    </div>
    <div className="reviews-section-container">
      <!-- <review-ratings :reviews="stay.reviews" /> -->
      <!-- <el-button v-if="loggedInUser" @click.stop="toggleReview">Add Review</el-button> -->
      <!-- <review-add v-if="isScreenOpen" @addReview="addReview" @toggleReview="toggleReview" /> -->
      <review-list v-if="stay.reviews.length" :reviews="stay.reviews" />
    </div>

    <!-- <div class="about">
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
    </div> -->
  </section>
</template>

<script>
import { utilService } from '@/services/util.service';
import GmapMap from '@/cmps/map.vue';
import stayCheckout from '@/cmps/stay-checkout.vue';
import reviewList from '@/cmps/review-list.vue';
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
      // iconToShow:'',
      // reviews:[]
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
      return this.stay.capacity === 1
        ? this.stay.capacity + ' bed'
        : this.stay.capacity + ' beds';
    },
    bath() {},
    formattedReviews() {
      //maybe 0 reviews
      if (!this.stay.reviews.length) return '(new)';
      if (this.stay.reviews.length === 1)
        return `(${this.stay.reviews.length} review)`;
      else if (this.stay.reviews.length > 1)
        return `(${this.stay.reviews.length} reviews)`;
    },
    formattedName() {
      const txt = this.stay.name;
      const txtWithCapitalFirstLetter =
        txt.charAt(0).toUpperCase() + txt.slice(1);
      // if (txt.length > 25 < 50) return txt.slice(0, 22) + '...';
      return txtWithCapitalFirstLetter;
    },
  },
  methods: {
    iconToShow(amenity) {
      return utilService.getIcon(amenity);
      // return 'wifi';
    },
  },
  components: { GmapMap, stayCheckout, reviewList },
};
</script>
