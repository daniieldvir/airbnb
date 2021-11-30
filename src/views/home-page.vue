<template>
  <div class="home-page"></div>
</template>

<script>
// TODO REMOVE SERV
import stayService from "../services/stay.service.js";
import userService from "../services/user.service.js";

export default {
  name: "home-page",
  data() {
    return {
      stays: null,
    };
  },
  created() {},
  components: {},
};
</script>
