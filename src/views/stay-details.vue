<template>
  <section>
    <div class="loader" v-if="isLoading"><img src="../assets/grid.svg" /></div>
    <section v-if="stay && !isLoading" class="stay-details main-container">
      <h2>{{ formattedName }}</h2>
      <div class="review-details">
        <template>
          <font-awesome-icon icon="star" />
          <span class="rate">{{ avgRate }}</span>
          <span class="reviews">{{ formattedReviews }}</span
          >&#183;
        </template>
        <a class="details-location" href=""> {{ stay.loc.address }}</a>
        <!-- <span class="details-location">{{ stay.loc.address }}</span> -->

        <!-- <a href=""> {{ stay.loc.address }}</a> -->
      </div>
      <div class="images-display-container">
        <label v-for="(img, idx) in imgs" :key="idx">
          <img :src="img" alt="" />
        </label>
      </div>

      <div class="details-main-container flex">
        <div class="stay-details-left-container">
          <div class="info-header">
            <div class="info">
              <h2>{{ stay.type }} hosted by {{ stay.host.fullname }}</h2>
              <p>
                {{ stay.capacity }} guests <span> &#183; </span> {{ stay.type }}
                <span> &#183;</span>
                {{ beds }}
              </p>
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
              <div class="icon">
                <font-awesome-icon icon="map-marker-alt" />
              </div>
              <div class="asset-details">
                <h4>Great location</h4>
                <p>100% of recent guests gave the location a 5-star rating.</p>
              </div>
            </div>
          </div>
          <hr />
          <div class="details-summary-container">
            <long-text :summary="stay.summary"></long-text>
            <!-- <p>{{ stay.summary }}</p> -->
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
          <stay-checkout @orderReady="placeOrder" :stay="stay"></stay-checkout>
        </div>
      </div>
      <div v-if="stay.reviews.length" class="reviews-section-container">
        <hr />
        <stay-rating :reviews="reviews" />
        <review-list :reviews="reviews" />
        <!-- <el-button @click.stop="toggleReview">Add Review</el-button> -->
        <!-- <review-add @saveReview="addReview" @toggleReview="toggleReview" /> -->
      </div>

      <div class="map-section">
        <hr />
        <h2>Where you’ll be</h2>
        <div class="about">
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
      </div>
    </section>
  </section>
</template>

<script>
import { utilService } from '@/services/util.service';
import GmapMap from '../cmps/details/map.vue';
import stayCheckout from '../cmps/details/stay-checkout.vue';
import reviewList from '../cmps/details/review-list.vue';
import stayRating from '../cmps/details/stay-rating.vue';
import longText from '../cmps/details/long-text.vue';
import reviewAdd from '../cmps/details/review-add.vue';
import { showMsg } from '../services/event-bus.service.js';
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
      reviews: [],
      explorePage: true,
      onDetailsPage: true,
    };
  },
  async created() {
    try {
      const { stayId } = this.$route.params;
      if (stayId) {
        const stay = await this.$store.dispatch({
          type: 'getStayById',
          stayId: stayId,
        });
        this.isLoading = false;
        this.stay = JSON.parse(JSON.stringify(stay));
        const imgs = this.$store.getters.imgsToShow;
        this.imgs = imgs;
        this.reviews = this.stay.reviews;
      }
    } catch (err) {
      console.log('Cannot get stay with id:', stayId);
    }
  },
  // this.$store.dispatch.loadStay();
  computed: {
    // stay() {
    //   return this.$store.getters.currStay;
    // },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
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
    avgRate() {
      if (!this.stay.reviews.length) return 0;
      const sum = this.stay.reviews.reduce((acc, review) => {
        return acc + review.rate;
      }, 0);
      return (sum / this.stay.reviews.length).toFixed(1);
    },
  },
  methods: {
    async placeOrder(order) {
      try {
        const { _id, name, price } = this.stay;
        order.stay = { _id, name, price };
        order.stay.imgUrls = this.stay.imgUrls.slice(0, 3);
        order.hostId = this.stay.host._id;
        if (!this.loggedInUser) {
          showMsg('You must login first');
          this.$emit('toggleLogin');
          return;
        }
        const newOrder = await this.$store.dispatch({
          type: 'addOrder',
          order: order,
        });
        // this.createTrip(newOrder.insertedId, order);
        showMsg('The order was sent for approval');
      } catch (err) {
        showMsg('The order failed', 'error');
      }
    },
    async createTrip(orderId, order) {
      console.log('creatring trip gor order', order);
      const trip = {
        imgUrls: this.stay.imgUrls.slice(0, 3),
        stayName: this.stay.name,
        checkInDate: new Date(order.dates.checkInDate).toLocaleDateString(),
        checkOutDate: new Date(order.dates.checkOutDate).toLocaleDateString(),
        totalPrice: order.totalPrice,
        status: order.status,
        tripId: this.createId(),
        orderId,
      };
      this.$store.commit({ type: 'addTrip', trip });
    },
    iconToShow(amenity) {
      return utilService.getIcon(amenity);
      // return 'wifi';
    },
    createId() {
      return 'id' + new Date().getTime();
    },
  },

  mounted() {
    window.scrollTo(0, 0);
  },
  components: {
    GmapMap,
    stayCheckout,
    reviewList,
    stayRating,
    longText,
    reviewAdd,
    showMsg,
  },
};
</script>
