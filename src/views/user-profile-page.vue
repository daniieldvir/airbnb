<template>
  <section class="user-page-container flex column">
    <nav class="user-profile-nav flex">
      <ul class="clean-list flex">
        <li @click="showNotifications">Notifications</li>
        <router-link to="/stay/edit">
          <li>Add stay</li>
        </router-link>
        <li @click="showListedStays">Listed Stays</li>
        <li @click="showOrders">Orders</li>
      </ul>
    </nav>
    <hr />
    <div class="user-section-cont">
      <h1>{{ titleForDisplay }}</h1>
      <!-- NOTIFICATIONS -->
      <section v-if="currSection === 'Notifications'">
        <h3 v-if="!dataForList.length">
          No {{ titleForDisplay.toLowerCase() }} to display
        </h3>
        <template v-else>
          <div class="data-table">
            <span
              v-for="(column, columnHeader, idx) in dataForList[0]"
              :key="idx"
            >
              <strong>{{ upperCaseFirstChar(columnHeader) }}</strong>
            </span>
            <span><strong>Actions</strong></span>
            <template v-for="(dataObject, idx) in dataForList">
              <img :key="dataObject.idx" :src="dataObject.imgUrl" alt="" />
              <span :key="dataObject.idx">{{ dataObject.date }}</span>
              <span :key="dataObject.idx">{{ dataObject.user }}</span>
              <span :key="dataObject.idx">{{ dataObject.message }}</span>
              <span :key="dataObject.idx">{{ dataObject.stay }}</span>
            </template>
          </div>
        </template>
      </section>

      <!-- LISTED STAYS -->
      <section v-if="currSection === 'Listed Stays'">
        <h3 v-if="!dataForList.length">
          No {{ titleForDisplay.toLowerCase() }} to display
        </h3>
        <template v-else>
          <div class="data-table">
            <span
              v-for="(column, columnHeader, idx) in dataForList[0]"
              :key="idx"
            >
              <strong>{{ upperCaseFirstChar(columnHeader) }}</strong>
            </span>
            <span><strong>Actions</strong></span>
            <template v-for="(dataObject, idx) in dataForList">
              <img :key="dataObject.imgUrl" :src="dataObject.imgUrl" alt="" />
              <span :key="dataObject.name">{{ dataObject.name }}</span>
              <span :key="dataObject.address">{{ dataObject.address }}</span>
              <span :key="dataObject.price">{{ dataObject.price }}</span>
              <span :key="dataObject.rating">{{ dataObject.rating }}</span>
              <button @click="editStay(dataObject.name)" :key="idx">
                Edit
              </button>
            </template>
          </div>
        </template>
      </section>

      <!-- ORDERS -->
      <section v-show="currSection === 'Orders'">
        <h3 v-if="!ordersToShow.length">
          No {{ titleForDisplay.toLowerCase() }} to display
        </h3>
        <template v-else>
          <div class="data-table">
            <span v-for="(header, idx) in orderSecHeaders" :key="idx">
              <strong>{{ header }}</strong>
            </span>

            <template v-for="(order, idx) in ordersToShow">
              <img :key="order.buyer.imgUrl" :src="order.buyer.imgUrl" />
              <span :key="order.buyer.fullname">{{
                order.buyer.fullname
              }}</span>
              <span :key="order.dates.checkInDate">{{
                formateDate(order.dates.checkInDate)
              }}</span>
              <span :key="order.dates.checkOutDate">{{
                formateDate(order.dates.checkOutDate)
              }}</span>
              <span :key="order.totalPrice">${{ order.totalPrice }}</span>
              <button :key="order._id">Approve</button>
            </template>
          </div>
        </template>
      </section>
    </div>
  </section>
</template>

<script>
import dataTable from '../cmps/data-table.vue';
export default {
  name: 'user-profile',
  data() {
    return {
      // loggedInUser: null,
      navList: ['Notifications', 'Add stay', 'Listed Stays', 'Orders'],
      currSection: 'Notifications',
      dataForList: [],
      hostStays: null,
      orders: [],
      user: null,
    };
  },
  created() {
    this.loadUser();
    this.loadOrders();
    // if (this.loggedInUser.isHost){
    //     const filterBy = { hostId: this.loggedInUser._id };
    //     await this.$store.dispatch({ type: 'setFilter', filterBy });
    // }
  },
  destroy() {
    this.$store.commit({ type: 'clearAllFilters' });
  },
  // watch: {
  //   user: {
  //     handler() {
  //       this.$store.dispatch({
  //         type: 'loadAndWatchUser',
  //         userId: this.loggedInUser._id,
  //       });
  //       console.log('watching user');
  //     },
  //     immediate: true,
  //   },
  // },
  methods: {
    async loadUser() {
      const user = this.$store.getters.loggedInUser;
      this.user = {
        userId: user._id,
        userType: !user.isHost ? 'user' : 'host',
      };
    },
    async loadOrders() {
      await this.$store.dispatch({ type: 'loadOrders', user: this.user });
      this.orders = this.$store.getters.ordersToShow;
    },
    showNotifications() {
      this.dataForList = [];
      // const data = [
      //   {
      //     imgUrl:
      //       'https://res.cloudinary.com/disku3v4j/image/upload/v1638965856/bell-icon-line-alarm-symbol-vector-21085810_suwpjf.jpg',
      //     date: '',
      //     user: '',
      //     messsage: '',
      //   },
      // ];
      // this.dataForList = data;
      this.currSection = 'Notifications';
    },
    async showListedStays() {
      // console.log('loggedInUser', this.user);
      if (this.loggedInUser && this.loggedInUser.isHost) {
        this.dataForList = [];
        await this.$store.dispatch({
          type: 'loadHostStays',
          hostId: this.loggedInUser._id,
        });
        const hostStays = this.$store.getters.hostStays;
        this.hostStays = hostStays;

        if (hostStays) {
          const staysToShow = hostStays.map((stay) => {
            const data = {
              imgUrl: stay.imgUrls[0],
              name: stay.name,
              address: stay.loc.address,
              price: stay.price,
              rating: stay.avgRate,
            };
            return data;
          });
          this.dataForList = staysToShow;
        }
      }
      this.currSection = 'Listed Stays';
    },
    async showOrders() {
      // const user = {
      //   userId: this.loggedInUser._id,
      //   userType: 'host',
      // };
      // await this.$store.dispatch({ type: 'loadOrders', user });
      // this.orders = this.$store.getters.ordersToShow;
      // console.log('orderssssssssssssss', this.orders);
      // const orders = this.orders.map((order) => {
      //   console.log(order.buyer.fullname);
      //   let data = {
      //     imgUrl: order.buyer.imgUrl,
      //     name: order.buyer.fullname,
      //     start: new Date(order.dates.checkInDate).toLocaleDateString(),
      //     end: new Date(order.dates.checkOutDate).toLocaleDateString(),
      //     total: order.totalPrice,
      //   };
      //   return data;
      // });
      // this.dataForList = orders;
      this.currSection = 'Orders';
    },
    upperCaseFirstChar(str) {
      if (typeof str === 'string') {
        return str[0].toUpperCase() + str.substring(1);
      } else {
        return str;
      }
    },
    editStay(stayName) {
      const stay = this.hostStays.find((stay) => {
        return stay.name === stayName;
      });
      this.$router.push(`/stay/${stay._id}/edit`);
    },
    formateDate(date) {
      return new Date(date).toLocaleDateString();
    },
    createId() {
      return 'id' + new Date().getTime();
    },
  },
  computed: {
    titleForDisplay() {
      return this.currSection;
    },
    ordersToShow() {
      return this.$store.getters.ordersToShow;
    },
    orderSecHeaders() {
      return ['imgUrl', 'From', 'Start', 'End', 'Total', 'Actions'];
    },

    // loggedUser() {
    //   console.log('loggedUser', loggedUser);
    //   return state.loggedInUser;
    // },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  //   watch: {
  //   userId: {
  //     handler() {
  //       this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId });
  //     },
  //     immediate: true,
  //   },
  // },
  components: {
    dataTable,
  },
};
</script>
