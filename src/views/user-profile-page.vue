<template>
  <section class="user-page-container flex column">
    <nav class="user-profile-nav flex">
      <ul class="clean-list flex">
        <li @click="showSection('Notifications')">Notifications</li>
        <router-link to="/stay/edit">
          <li>Add stay</li>
        </router-link>
        <li @click="showSection('Listed Stays')">Listed Stays</li>
        <li @click="showSection('Orders')">Orders</li>
      </ul>
    </nav>
    <hr />
    <div class="user-section-cont">
      <h1>{{ titleForDisplay }}</h1>
      <!-- NOTIFICATIONS -->
      <section v-show="currSection === 'Notifications'">
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
            <!-- <template v-for="(dataObject, idx) in dataForList">
              <img :key="dataObject.idx" :src="dataObject.imgUrl" alt="" />
              <span :key="dataObject.idx">{{ dataObject.date }}</span>
              <span :key="dataObject.idx">{{ dataObject.user }}</span>
              <span :key="dataObject.idx">{{ dataObject.message }}</span>
              <span :key="dataObject.idx">{{ dataObject.stay }}</span>
            </template> -->
          </div>
        </template>
      </section>

      <!-- LISTED STAYS -->
      <section v-show="currSection === 'Listed Stays'">
        <h3 v-if="!staysToShow.length">
          No {{ titleForDisplay.toLowerCase() }} to display
        </h3>
        <template v-else>
          <div class="data-table">
            <span v-for="(header, idx) in headersToShow" :key="idx">
              <strong>{{ header }}</strong>
            </span>
            <template v-for="stay in staysToShow">
              <img :key="stay._id + 'img'" :src="stay.imgUrls[0]" alt="" />
              <span :key="stay._id + stay.name">{{ stay.name }}</span>
              <span :key="stay._id + stay.type">{{ stay.type }}</span>
              <span :key="stay._id + stay.loc.address">{{
                stay.loc.address
              }}</span>
              <span :key="stay._id + stay.price">{{ stay.price }}</span>
              <span :key="stay._id + stay.avgRate">{{ stay.avgRate }}</span>
              <button @click="editStay(stay._id)" :key="stay._id + 'edit'">
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
            <span v-for="(header, idx) in headersToShow" :key="idx">
              <strong>{{ header }}</strong>
            </span>

            <template v-for="order in ordersToShow">
              <img
                :key="order._id + order.buyer.imgUrl"
                :src="order.buyer.imgUrl"
              />
              <span :key="order._id + order.buyer.fullname">{{
                order.buyer.fullname
              }}</span>
              <span :key="order._id + order.dates.checkInDate">{{
                formateDate(order.dates.checkInDate)
              }}</span>
              <span :key="order._id + order.dates.checkOutDate">{{
                formateDate(order.dates.checkOutDate)
              }}</span>
              <span :key="order._id + order.totalPrice"
                >${{ order.totalPrice }}</span
              >
              <span :key="order._id + order.status">{{ order.status }}</span>
              <button
                :disabled="order.status === 'approved'"
                @click="orderActionBtnClicked(ordersActionBtnTxt, order)"
                :key="order._id"
              >
                {{
                  order.status === 'approved' ? 'Approved' : ordersActionBtnTxt
                }}
              </button>
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
      currSection: 'Orders',
      hostStays: null,
      user: null,
      dataForList: [],
      // REMOVE THIS
    };
  },
  async created() {
    this.loadUser();
    this.loadOrders();
    this.loadHostStays();
  },
  async destroy() {
    this.$store.commit({ type: 'clearAllFilters' });
  },
  methods: {
    async loadUser() {
      this.loggedInUser = this.$store.getters.loggedInUser;
    },
    async loadOrders() {
      const user = {
        userId: this.loggedInUser._id,
        userType: !this.loggedInUser.isHost ? 'user' : 'host',
      };
      console.log('user7777777', user);

      await this.$store.dispatch({ type: 'loadOrders', user });
      this.orders = this.$store.getters.ordersToShow;
    },
    async loadHostStays() {
      if (!this.loggedInUser.isHost) return;
      await this.$store.dispatch({
        type: 'loadHostStays',
        hostId: this.loggedInUser._id,
      });
    },
    showNotifications() {
      // this.dataForList = [];
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
    showSection(section) {
      this.currSection = section;
    },
    upperCaseFirstChar(str) {
      if (typeof str === 'string') {
        return str[0].toUpperCase() + str.substring(1);
      } else {
        return str;
      }
    },
    editStay(stayId) {
      this.$router.push(`/stay/${stayId}/edit`);
    },
    formateDate(date) {
      return new Date(date).toLocaleDateString();
    },
    orderActionBtnClicked(action, orderId) {
      if (action === 'Approve') {
        this.approveOrder(orderId);
      } else if (action === 'Cancel') {
        this.cancelOrder(orderId);
      } else {
        return;
      }
    },
    approveOrder(order) {
      console.log('approve order:', order);
      if (!this.loggedInUser.isHost) return;
      order.status = 'approved';
      this.$store.dispatch({ type: 'updateOrder', order });
    },
    cancelOrder(order) {
      console.log('cancel order:', order);
    },
  },
  computed: {
    titleForDisplay() {
      return this.currSection;
    },
    ordersToShow() {
      return this.$store.getters.ordersToShow;
    },
    staysToShow() {
      if (!this.loggedInUser.isHost) return [];
      return this.$store.getters.hostStays;
    },
    headersToShow() {
      const currSection = this.currSection;
      if (currSection === 'Orders') {
        return ['imgUrl', 'From', 'Start', 'End', 'Total', 'Status', 'Actions'];
      } else if (currSection === 'Listed Stays') {
        return [
          'imgUrl',
          'Name',
          'Type',
          'Address',
          'Price',
          'Rating',
          'Actions',
        ];
      } else if (currSection === 'Notifications') {
        return ['imgUrl', 'User', 'Message', 'Stay', 'Date', 'Actions'];
      }
    },
    ordersActionBtnTxt() {
      if (!this.loggedInUser.isHost) {
        return 'Cancel';
      } else {
        return 'Approve';
      }
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
