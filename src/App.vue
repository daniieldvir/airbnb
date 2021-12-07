<template>
  <div id="app">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import appHeader from './cmps/app-header';
import appFooter from './cmps/app-footer.vue';

export default {
  components: {
    appHeader,
    appFooter,
  },
};
</script>
