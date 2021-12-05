<template>
  <header v-bind:class="{ 'white-header': !onHomePage }" class="main-container">
    <nav class="main-nav main-container">
      <div class="flex column">
        <router-link class="main-router-link" to="/">
          <!-- <div class="logo">RentMe<font-awesome-icon class="icon" icon="airbnb" /></div> -->
          <div class="logo">
            RentMe<font-awesome-icon :icon="['fab', 'airbnb']" />
          </div>
        </router-link>
        <!-- FILTERS -->
        <secondary-filters v-if="onExplorePage" />
      </div>

      <div class="flex nav-content">
        <router-link class="main-router-link" to="/explore"
          >Explore</router-link
        >
        <router-link class="main-router-link" to="/become-host"
          >Become A Host</router-link
        >
        <!-- <router-link class="main-router-link" to="/login"> -->
        <button class="flex align-center user-btn">
          <font-awesome-icon icon="bars" class="bars" />
          <font-awesome-icon icon="user-circle" />
        </button>
        <!-- </router-link> -->
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
      onHomePage: false,
      onExplorePage: false,
    };
  },
  watch: {
    $route: {
      handler() {
        this.onHomePage = this.$route.name !== 'Home' ? false : true;
        this.onExplorePage = this.$route.name === 'Explore' ? true : false;
      },
      immediate: true,
    },
  },
  components: {
    secondaryFilters,
  },
};
</script>
