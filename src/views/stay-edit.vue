<template>
  <section v-if="stay" class="stay-details edit main-container">
    <label for="">
      <input class="stay-name" type="text" v-model="stay.name" />
    </label>
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
    </div>
    <img-upload :imgUrls="imgs" @save="saveImg" />
    <!-- <img-upload :imgUrls="imgUrls" @save="saveImg" /> -->

    <!-- <div v-if="imgs" class=>
     <img v-for="(img, idx) in imgs" :key="idx" :src="img" />
      <img-upload @save="saveImg" /> 
      

    </div> -->
    <img-list :imgUrls="imgUrls" />

    <div class="details-main-container flex">
      <div class="stay-details-left-container">
        <div class="info-header flex align-center space-between">
          <div>
            <h2>{{ stay.type }} hosted by {{ stay.host.fullname }}</h2>
            <p>
              <label for="">
                <input class="" type="number" v-model="stay.capacity" />
              </label>
              guests <span> &#183; </span>
              <label for="">
                StayType:
                <select v-model="stay.type">
                  <option value="Entire home">Entire home</option>
                  <option value="Entire condo">Entire condo</option>
                  <option value="Entire rental unit">Entire rental unit</option>
                  <option value="Entire loft">Entire loft</option>
                  <option value="Entire bungalow">Entire bungalow</option>
                  <option value="Private Room">
                    Private room in rental unit
                  </option>
                </select>
              </label>

              <span> &#183;</span>
              {{ beds }}
              <span> &#183;</span>

              <label for="">
                price:
                <input class="" type="number" v-model="stay.price" />
              </label>
              <span>/ night </span>
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
      <div class="stay-details-right-container">
        <button class="save-stay" @sava="saveEdit">Save</button>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from '@/services/util.service';
import longText from '../cmps/details/long-text.vue';
import imgUpload from '../cmps/img-upload.vue';
import imgList from '../cmps/img-list.vue';
import { stayService } from '../services/stay.service.new';

export default {
  name: 'edit-stay',
  data() {
    return {
      imgUrls: [],

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
    const { stayId } = this.$route.params;
    if (stayId) {
      this.$store
        .dispatch({ type: 'getStayById', stayId: stayId })
        .then((stay) => {
          this.stay = JSON.parse(JSON.stringify(stay));
          const imgs = this.$store.getters.imgsToShow;
          this.imgs = imgs;
          this.reviews = this.stay.reviews;
        });
    }
  },
  computed: {
    // stay() {
    //   return this.$store.getters.currStay;
    // },
    beds() {
      return this.stay.capacity === 1
        ? this.stay.capacity + ' bed'
        : this.stay.capacity + ' beds';
    },
    formattedReviews() {
      if (!this.stay.reviews.length) return 'New';
      if (this.stay.reviews.length === 1)
        return `(${this.stay.reviews.length} review)`;
      else if (this.stay.reviews.length > 1)
        return `(${this.stay.reviews.length} reviews)`;
    },
  },
  methods: {
    saveImg(imgUrl) {
      // var newImg = this.stay.imgUrls = this.imgUrl;
      this.stay.imgUrls = this.imgUrl;

      this.imgUrls.push(imgUrl);
    },
    mounted() {
      window.scrollTo(0, 0);
    },
    saveEdit() {
      stayService.save(this);
    },
  },
  components: {
    longText,
    imgUpload,
    imgList,
  },
};
</script>
