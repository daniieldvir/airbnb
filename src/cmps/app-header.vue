<template>
  <header v-bind:class="{ onExplore: isOnExplorePage }" class="main-container">
    <nav class="main-nav main-container">
      <router-link class="main-router-link" to="/">
        <div class="logo">RentMe</div>
      </router-link>
      <!-- FILTERS -->
      <secondary-filters v-if="isOnExplorePage" />

      <div class="navigation-routs">
        <router-link class="main-router-link" to="/explore"
          >Explore</router-link
        >
        <router-link class="main-router-link" to="/become-host"
          >Become A Host</router-link
        >
        <router-link class="main-router-link" to="/login"
          >Login / Signup</router-link
        >
      </div>
    </nav>
    <!-- <section class="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`"> {{}} </router-link>
      <span>{{ loggedInUser.score }}</span>
    </section> -->
  </header>
</template>
<script>
import secondaryFilters from '../cmps/filters/secondary-filters.vue';
export default {
  data() {
    return {
      onExplorePage: false,
    };
  },
  methods: {
    // this.onExplorePage=this.$store.getters.isOnExplorePage
  },
  computed: {
    isOnExplorePage() {
      console.log('isOnExplorePage?', this.$store.getters.isOnExplorePage);
      return this.$store.getters.isOnExplorePage;
    },
  },
  components: {
    secondaryFilters,
  },
};
</script>
