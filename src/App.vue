<template>
  <div id="app container main-container">
    <div id="nav">
      <div class="logo">Rent<span>Me</span></div>
      <router-link to="/explore">Explore</router-link>
      <router-link to="/become-host">Become A Host</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
  created() {
    this.$store.dispatch({ type: 'loadStays' });
    console.log('created app!');
  },
};
</script>
