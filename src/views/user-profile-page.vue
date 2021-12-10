<template>
  <section class="user-page-container flex column">
    <nav class="user-profile-nav flex">
      <ul class="clean-list flex">
        <li @click="showNotifications">Notifications</li>
        <router-link to="/stay/61ae2083033a3647ed7811ff/edit">
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
            <template v-for="(dataObject, idx) in dataForList">
              <img :key="dataObject.idx" :src="dataObject.imgUrl" alt="" />
              <span :key="dataObject.idx">{{ dataObject.name }}</span>
              <span :key="dataObject.idx">{{ dataObject.address }}</span>
              <span :key="dataObject.idx">{{ dataObject.price }}</span>
              <span :key="dataObject.idx">{{ dataObject.rating }}</span>
            </template>
          </div>
        </template>
      </section>

      <!-- ORDERS -->
      <section v-if="currSection === 'Orders'">
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
            <template v-for="dataObject in dataForList">
              <img :key="dataObject.imgUrl" :src="dataObject.imgUrl" />
              <span :key="dataObject.user">{{ dataObject.user }}</span>
              <span :key="dataObject.start">{{ dataObject.start }}</span>
              <span :key="dataObject.end">{{ dataObject.end }}</span>
              <span :key="dataObject.total">${{ dataObject.total }}</span>
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
      loggedInUser: null,
      navList: ['Notifications', 'Add stay', 'Listed Stays', 'Orders'],
      currSection: 'Notifications',
      dataForList: [],
    };
  },
  async created() {
    this.loggedInUser = this.$store.getters.loggedInUser;
    // if (this.loggedInUser.isHost){
    //     const filterBy = { hostId: this.loggedInUser._id };
    //     await this.$store.dispatch({ type: 'setFilter', filterBy });
    // }
  },
  async destroy() {
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
      const user = {
        userId: this.loggedInUser._id,
        userType: 'user',
      };
      await this.$store.dispatch({ type: 'loadOrders', user });
      this.orders = this.$store.getters.ordersToShow;
      console.log('orderssssssssssssss', this.orders);
      // getUserByID for img url
      // const user=this.$store.getters.userById
      // const orders=this.$store.getters.ordersFromHost
      // orders.forEach(order => {
      //   let data={
      //     imgUrl: user.imgUrl,
      //     name: order.buyer.fullName,
      //     start: order.dates.checkInDate,
      //     end: order.dates.checkOutDate,
      //     total: order.totalPrice
      //   }
      //   this.dataForList.push(data);
      // });
      this.currSection = 'Orders';
    },
    upperCaseFirstChar(str) {
      if (typeof str === 'string') {
        return str[0].toUpperCase() + str.substring(1);
      } else {
        return str;
      }
    },
  },
  computed: {
    titleForDisplay() {
      return this.currSection;
    },
    // user() {
    //   return this.$store.getters.watchedUser;
    // },
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
