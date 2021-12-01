<template>
  <ul>
    <li class="clear-list stay-list" v-for="stay in stays" :key="stay._id">
      <stay-preview :stay="stay"> </stay-preview>
    </li>
  </ul>
</template>

<script>
import stayPreview from "./stay-preview.vue";
export default {
  name: "trip-list",
  prop: ["stays"],
  created() {
    this.$store.dispatch({ type: "loadStays" });
    console.log("created app!");
  },

  components: {
    stayPreview,
  },
};
</script>
