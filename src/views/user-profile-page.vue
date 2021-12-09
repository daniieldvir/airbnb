<template>
  <section class="user-page-container flex column main-container">
    <nav class="user-profile-nav flex">
      <ul class="clean-list flex">
        <li
          v-for="sectionName in navList"
          class="user-nav-item pointer"
          @click="showSection(sectionName)"
          :key="sectionName"
        >
          {{ sectionName }}
        </li>
      </ul>
    </nav>
    <hr />
    <div class="user-section-cont">
      <h1>{{ titleForDisplay }}</h1>
      <!-- notifications-->
      <section>
        <data-table />
        <!-- <ul class="user-list-container">
          <li class="flex section-list" v-for="header in headers" :key="header">
            <strong>{{ header }}</strong>
          </li>
          <li class="flex section-list" v-for="item in test" :key="item">
            <span>{{ item }}</span>
          </li>
        </ul> -->
        <!-- <ul>
    <li v-for="stay in stays"></li>
</ul> -->
      </section>
      <section class="user-list-container"></section>
      <section class="user-list-container"></section>
      <section class="user-list-container"></section>
    </div>
  </section>
</template>

<script>
import dataTable from '../cmps/data-table.vue';
export default {
  name: 'stay-app',
  data() {
    return {
      navList: ['Notifications', 'Add stay', 'Listed Stays', 'Orders'],
      currSection: 'Notifications',
      //       listContent:{
      //           imgUrl:'https://res.cloudinary.com/disku3v4j/image/upload/v1638965794/bell-icon-line-alarm-symbol-vector-21085810_suwpjf.jpg',
      // listItems:[],
      // subHeaders:[],
      headers: ['user', 'checkin', 'checkout', 'price'],
      test: ['fsdjkgskjdfghsjkfghsjkfgsjfg', 'isdghsjkdghssdgsdg', '5634'],
      //       }
    };
  },
  created() {},
  methods: {
    showSection(sectionName) {
      this.currSection = sectionName;
      //   console.log(this.currSection);
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
