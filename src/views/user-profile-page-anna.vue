<template>
  <div class="container home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <ul class="order-list">
      <li v-for="(order,idx) in orders" :key="idx">
        <h3>{{ order._id }}</h3>
        {{ order.status }}

        <hr />
      </li>
    </ul>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      user:null
    };
  },
  computed: {
    orders() {
      console.log(
        'this.$store.getters.ordersToShow;',
        this.$store.getters.ordersToShow
      );
      return this.$store.getters.ordersToShow;
    },

    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  async created() {
    // this.$store.dispatch({type: 'loadUsers'})
    this.loadUser();
    await this.$store.dispatch({ type: 'loadOrders', user: this.user });
  },
  methods: {
    async loadUser() {
      const user = this.$store.getters.loggedInUser;
      this.user = {
        userId: user._id,
        userType: !user.isHost ? 'user' : 'host',
      };
    },
    // async addReview() {
    //   await this.$store.dispatch({type: 'addReview', review: this.reviewToEdit})
    //   this.reviewToEdit = {txt: '', aboutUserId: null}
    // }
  },
};
</script>
