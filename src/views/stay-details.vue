<template>
  <section class="header main-container">
    <div class="details">
      <h2>{{ stay.name }}</h2>
    </div>
  </section>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      isLoading: true,
      stay: null,
    };
  },
  created: {
    loadStay() {
      const { stayId } = this.$route.params;
      this.$store.dispatch({ type: 'getStayById', stayId }).then((stay) => {
        console.log(stay);
        this.stay = JSON.parse(JSON.stringify(stay));
      });
      // this.$store.dispatch.loadStay();
    },
  },
  computed: {
    stay() {
      return this.$store.getters.currStay;
    },
  },
  methods: {},
};
</script>
