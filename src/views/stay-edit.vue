<template>
  <section v-if="stay" class="stay-details edit main-container">
    <label for="">
      <input class="stay-name" type="text" v-model="stay.name" />
    </label>
    <!-- <h2>{{ formattedName }}</h2> -->
    <div class="review-details">
      <template>
        <font-awesome-icon icon="star" />
        <span class="rate">{{ stay.avgRate }}</span>
        <span class="reviews">{{ formattedReviews }}</span
        >&#183;
      </template>
      <label for="">
        <input class="" type="text" v-model="stay.loc.address" />
      </label>

      <!-- <span class="details-location">{{ stay.loc.address }}</span> -->

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
            <p>
              <label for="">
                <input class="" type="text" v-model="stay.capacity" />
              </label>
              guests <span> &#183; </span>
              <label for="">
                <input class="" type="text" v-model="stay.type" />
              </label>

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
            <div class="icon"><font-awesome-icon icon="map-marker-alt" /></div>
            <div class="asset-details">
              <h4>Great location</h4>
              <p>100% of recent guests gave the location a 5-star rating.</p>
            </div>
          </div>
        </div>
        <hr />
        <div class="details-summary-container">
          <label for="summary">
            <textarea
              name="summary"
              id=""
              cols="100"
              rows="10"
              v-model="stay.summary"
            ></textarea>
          </label>
        </div>
        <hr />
        <div class="stay-details-amenities">
          <h2>What this place offers</h2>
          <div class="amenities-content">
            <div v-for="(amenity, idx) in amenities" :key="idx">
              <label for="">
                <input
                  type="checkbox"
                  :id="amenity"
                  :value="amenity"
                  v-model="stay.amenities"
                />
                <span class="amenity"></span>
              </label>
              <!-- <font-awesome-icon
                class="font-amenity-icon"
                :icon="iconToShow(amenity)"
              /> -->
              {{ amenity }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from '@/services/util.service';
// import stayCheckout from '../cmps/details/stay-checkout.vue';
// import reviewList from '../cmps/details/review-list.vue';
// import stayRating from '../cmps/details/stay-rating.vue';
import longText from '../cmps/details/long-text.vue';
// import reviewAdd from '../cmps/details/review-add.vue';
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
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'Coffee',
        'Crib',
        'Smoking allowed',
        'No smoking',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Refrigerator',
        'Free parking',
        'Bathub',
        'Heating',
        'Pool',
        'Accessible',
        'Long term stays allowed',
      ],
    };
  },
  created() {
    console.log('stay edit');
    const { stayId } = this.$route.params;
    if (stayId) {
      this.$store
        .dispatch({ type: 'getStayById', stayId: stayId })
        .then((stay) => {
          this.stay = JSON.parse(JSON.stringify(stay));
          const imgs = this.$store.getters.imgsToShow;
          console.log('imgs', imgs);
          this.imgs = imgs;
          this.reviews = this.stay.reviews;
        });
    }
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
    placeOrder(order) {
      const { _id, name, price } = this.stay;
      order.stay = { _id, name, price };

      order.hostId = this.stay.host._id;
      this.$store.dispatch({ type: 'addOrder', order });
    },
    iconToShow(amenity) {
      return utilService.getIcon(amenity);
      // return 'wifi';
    },
  },

  mounted() {
    window.scrollTo(0, 0);
  },
  components: {
    longText,
  },
};
</script>
