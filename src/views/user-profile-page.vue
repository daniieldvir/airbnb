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
            <template v-for="dataObject in dataForList">
              <img :src="dataObject.imgUrl" alt="" />
              <span>{{ dataObject.date }}</span>
              <span>{{ dataObject.user }}</span>
              <span>{{ dataObject.message }}</span>
              <span>{{ dataObject.stay }}</span>
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
            <template v-for="dataObject in dataForList">
              <img :src="dataObject.imgUrl" alt="" />
              <span>{{ dataObject.name }}</span>
              <span>{{ dataObject.address }}</span>
              <span>{{ dataObject.price }}</span>
              <span>{{ dataObject.rating }}</span>
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
  name: 'stay-app',
  data() {
    return {
      user: null,
      navList: ['Notifications', 'Add stay', 'Listed Stays', 'Orders'],
      currSection: 'Notifications',
      dataForList: [],
    };
  },
  created() {
    this.user = this.$store.getters.user;
  },
  methods: {
    showNotifications() {
      // let data={
      //   imgUrl:'https://res.cloudinary.com/disku3v4j/image/upload/v1638965856/bell-icon-line-alarm-symbol-vector-21085810_suwpjf.jpg',
      //   date:'',
      //   user:'',
      //   messsage:'',
      // }
      this.currSection = 'Notifications';
    },
    async showListedStays() {
      const filterBy = { hostId: this.user._id };
      await this.$store.dispatch({ type: 'setFilter', filterBy });
      if (!this.user.isHost) return;
      const stays = this.$store.getters.staysToShow;

      stays.forEach((stay) => {
        let data = {
          imgUrl: stay.imgUrls[0],
          name: stay.name,
          address: stay.loc.address,
          price: stay.price,
          rating: stay.avgRate,
        };
        this.dataForList.push(data);
      });

      this.currSection = 'Listed Stays';
    },
    showOrders() {
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
      return str[0].toUpperCase() + str.substring(1);
    },
  },
  computed: {
    titleForDisplay() {
      return this.currSection;
    },
  },
  components: {
    dataTable,
  },
};
</script>
