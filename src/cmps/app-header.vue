<template>
  <header class="main-container">
    <nav class="main-nav main-container">
      <router-link class="main-router-link" to="/">
        <div class="logo">RentMe</div>
      </router-link>

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
export default {
  computed: {
    // loggedInUser() {
    //   return this.$store.getters.loggedinUser;
    // },
  },
};
</script>
