<template>
  <section class="home-page main-container">
    <div class="pic full">
      <div class="main-header">
        <section>
          <stayFilter @filtered="setFilter" />
          <h1 class="main-txt">Find a place to stay anywhere, anytime.</h1>
        </section>
      </div>
    </div>
    <section class="top-rated">
      <home-list
        @cardClicked="cardClicked"
        :places="citiesForList"
        :listTitle="'Popular destinations'"
      />
    </section>
  </section>
</template>

<script>
import stayFilter from '../cmps/stay-filter.vue';
import stayList from '../cmps/stay-list.vue';
import homeList from '../cmps/lists/home-list.vue';

export default {
  name: 'home-page',
  data() {
    return {
      topStays: null,
      citiesForList: [
        {
          name: 'London',
          imgUrls: [
            'https://res.cloudinary.com/disku3v4j/image/upload/v1638609791/travel%20posters/itl.cat_london-iphone-wallpaper_248104_tueo1k.jpg',
          ],
        },
        {
          name: 'Paris',
          imgUrls: [
            'https://res.cloudinary.com/disku3v4j/image/upload/v1638609796/travel%20posters/itl.cat_paris-wallpaper_114472_no385z.jpg',
          ],
        },
        // { name: 'Hong Kong', imgUrls:[''] },
        {
          name: 'Bora Bora',
          imgUrls: [
            'https://res.cloudinary.com/disku3v4j/image/upload/v1638609789/travel%20posters/itl.cat_bora-bora-wallpaper_3109400_v7auuh.jpg',
          ],
        },
        {
          name: 'Rome',
          imgUrls: [
            'https://res.cloudinary.com/disku3v4j/image/upload/v1638609793/travel%20posters/itl.cat_rome-wallpaper_2989992_fxkntx.jpg',
          ],
        },
      ],
    };
  },
  created() {
    this.$store.dispatch({ type: 'loadStays' }).then(() => {
      this.topStays = this.$store.getters.staysToShow;

      this.topStays = this.topStays.slice(0, 4);
    });
  },
  methods: {
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy });
      this.$store.dispatch({ type: 'loadStays' });
      this.$router.push('/explore');

      // .then((this.topStays = this.$store.getters.staysToShow));
    },
    cardClicked(cardObject) {
      const filterBy = { city: cardObject.name };
      this.setFilter(filterBy);
    },
  },
  // computed: {
  //   topStays() {
  //     return this.$store.getters.stays;
  //   },
  // },
  components: {
    stayFilter,
    stayList,
    homeList,
  },
};
</script>
