<template>
  <section class="home-page main-container">
    <div class="pic full">
      <div class="main-header">
        <section>
          <stayFilter @filtered="setFilter" />
          <h1 class="main-txt">Find a place to stay anywhere. Anytime.</h1>
        </section>
      </div>
    </div>
    <section class="top-rated">
      <home-list
        @cardClicked="cardClicked"
        :places="citiesForList"
        :listTitle="'Popular destinations'"
      />
      <home-list
        @cardClicked="cardClicked"
        :places="topStays"
        :listTitle="'Top Rated'"
      />
      <section>
        <div class="become-a-host">
          <h4>Become a host</h4>
          <p>
            earn extra income and unlock new opportunities by sharing your
            space.
          </p>

          <router-link class="main-router-link" to="/become-host">
            <button onclick="window.location.href=/'become-host'">
              Learn more
            </button>
          </router-link>
        </div>
      </section>
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
      filterBy: null,
      topStays: null,
      citiesForList: [
        {
          name: 'London',
          imgUrls: [
            'https://res.cloudinary.com/disku3v4j/image/upload/v1638609791/travel%20posters/itl.cat_london-iphone-wallpaper_248104_tueo1k.jpg',
          ],
        },
        {
          name: 'Hong Kong',
          imgUrls: [
            'https://res.cloudinary.com/disku3v4j/image/upload/v1638618156/travel%20posters/mark-billante-vtuVWgtSYzo-unsplash_noeiqn.jpg',
          ],
        },
        {
          name: 'Tel Aviv',
          imgUrls: [
            'https://res.cloudinary.com/disku3v4j/image/upload/v1638700827/tel-aviv/wp6537669_pa56s3.jpg',
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
    this.clearAllFilters();
    this.loadFilter();
    this.$store.dispatch({ type: 'loadStays' }).then(() => {
      const stays = this.$store.getters.staysToShow;
      this.topStays = stays.filter((stay) => stay.avgRate >= 4.5).slice(0, 4);
    });
  },
  methods: {
    setFilter(filterBy) {
      this.$router.push('/explore');
      this.$store.dispatch({ type: 'setFilter', filterBy });
    },
    cardClicked(cardObject) {
      this.filterBy.city = cardObject.name;
      if (cardObject._id) {
        this.$router.push('/stay/' + cardObject._id);
      } else {
        // const filterBy = { city: cardObject.name };
        // this.setFilter({ ...filterBy });
        this.setFilter(this.filterBy);
      }
    },
    loadFilter() {
      const filterBy = this.$store.getters.filterBy;
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
    },
    clearAllFilters() {
      this.$store.commit({ type: 'clearAllFilters' });
    },
  },
  components: {
    stayFilter,
    stayList,
    homeList,
  },
};
</script>
