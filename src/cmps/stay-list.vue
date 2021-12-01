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

  components: {
    stayPreview,
  },
};
</script>
