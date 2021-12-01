<template>
  <section v-if="stay" class="stay-details">
    <h2>{{ stay.name }}</h2>
    <a href=""> {{ stay.loc.address }}</a>
    <div class="imgs-display-container" v-for="(img, idx) in imgs" :key="idx">
      <img :src="img" alt="" />
    </div>
    <pre>
        Entire home
        You’ll have the loft to yourself.
        Enhanced Clean
        This Host committed to Airbnb's 5-step enhanced cleaning process. Show more
        Self check-in
        Check yourself in with the lockbox.
        Great location
        100% of recent guests gave the location a 5-star rating.
      </pre
    >
  </section>
</template>

<script>
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
