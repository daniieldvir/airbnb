<template>
  <div id="app" class="container main-container full">
    <div id="nav" class="nav-bar">
      <router-link class="router-link" to="/">
        <div class="logo">
          Rent<span>Me<i class="fab fa-airbnb"></i></span>
        </div>
      </router-link>

      <div class="navigation-routs">
        <router-link class="router-link router-main" to="/explore"
          >Explore</router-link
        >
        <router-link class="router-link" to="/become-host"
          >Become A Host</router-link
        >
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>
