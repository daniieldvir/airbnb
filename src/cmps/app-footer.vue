<template>
  <section class="main-footer main-container">
    <section class="footer">
      <p class="footer-header">Inspiration for future getaways</p>

      <div class="top-rated">
        <footer-list
          @cardClicked="cardClicked"
          :places="topStays"
          :listTitle="'Top Rated'"
        />
      </div>

      <div class="top-nearby">
        <footer-list
          @cardClicked="cardClicked"
          :places="topStays"
          :listTitle="'Nearby'"
        />
      </div>

      <div class="top-cities">
        <footer-list
          @cardClicked="cardClicked"
          :places="citiesForList"
          :listTitle="'Cities'"
        />
      </div>

      <div class="copy-rights">
        <p>@2021 rentme, Inc</p>
        <span>·</span>
        <router-link class="main-router-link" to="/">
          <span>About</span>
        </router-link>
        <span>·</span>

        <router-link class="main-router-link" to="/">
          <span>Login</span>
        </router-link>
        <span>·</span>

        <router-link class="main-router-link host-link" to="/become-host"
          >Become A Host</router-link
        >
      </div>
    </section>
  </section>
</template>

<script>
import footerList from '../cmps/lists/footer-list.vue';

export default {
  name: 'app-footer',
  data() {
    return {
      topStays: null,
      citiesForList: [
        {
          name: 'London',
          address: 'England',
        },
        {
          name: 'Hong Kong',
          address: 'China',
        },
        {
          name: 'Tel Aviv',
          address: 'Israel',
        },
        {
          name: 'Rome',
          address: 'Italy',
        },
        {
          name: 'Bora Bora',
          address: 'Italy',
        },
        {
          name: 'Maureillas-las-Illas',
          address: 'France',
        },
      ],
    };
  },
  created() {
    this.$store.dispatch({ type: 'loadStays' }).then(() => {
      const stays = this.$store.getters.staysToShow;
      this.topStays = stays.filter((stay) => stay.avgRate >= 4.5).slice(0, 4);
    });
  },
  methods: {
    cardClicked(cardObject) {
      this.filterBy.city = cardObject.name;
      if (cardObject._id) {
        this.$router.push('/stay/' + cardObject._id);
      } else {
        this.setFilter(this.filterBy);
      }
    },
  },
  components: {
    footerList,
  },
};
</script>

<style></style>
