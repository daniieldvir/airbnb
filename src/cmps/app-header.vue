<template>
  <header v-bind:class="{ onExplore: onExplorePage }" class="main-container">
    <nav class="main-nav main-container">
      <router-link class="main-router-link" to="/">
        <!-- <div class="logo">RentMe<font-awesome-icon class="icon" icon="airbnb" /></div> -->
        <div class="logo">
          RentMe<font-awesome-icon :icon="['fab', 'airbnb']" />
        </div>
      </router-link>
      <!-- FILTERS -->
      <secondary-filters v-if="onExplorePage" />

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
  watch: {
    $route: {
      handler() {
        this.onExplorePage = this.$route.path === '/explore' ? true : false;
      },
      // deep: true,
      immediate: true,
    },
  },
  components: {
    secondaryFilters,
  },
};
</script>
