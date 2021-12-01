<template>
  <div id="app container main-container">
    <div id="nav">
      <div class="logo">Rent<span>Me</span></div>
      <router-link to="/explore">Explore</router-link>
      <router-link to="/become-host">Become A Host</router-link>
      <router-link to="/stay-app/">details</router-link>

    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
};
</script>
