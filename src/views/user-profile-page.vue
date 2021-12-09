<template>
  <section class="user-page-container flex column">
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
      <!-- NOTIFICATIONS -->
      <template>
        <section v-if="currSection === 'Notifications'">
          <h2 v-if="!dataForList.length">
            No {{ titleForDisplay }} to display
          </h2>
          <template v-else>
            <div class="data-table">
              <span
                v-for="(column, columnHeader, idx) in dataForList[0]"
                :key="idx"
              >
                <strong>{{ columnHeader }}</strong>
              </span>
              <template v-for="dataObject in dataForList">
                <img :src="dataObject.imgUrl" alt="" />
                <span>{{ dataObject.Date }}</span>
                <span>{{ dataObject.User }}</span>
                <span>{{ dataObject.Message }}</span>
                <span>{{ dataObject.Stay }}</span>
              </template>
            </div>
          </template>
        </section>
      </template>
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
      dataForList: [
        {
          imgUrl:
            'https://res.cloudinary.com/disku3v4j/image/upload/v1638965856/bell-icon-line-alarm-symbol-vector-21085810_suwpjf.jpg',
          Date: 'today',
          User: 'username',
          Message: 'booked stay',
          Stay: 'pukiland',
        },
        {
          imgUrl:
            'https://res.cloudinary.com/disku3v4j/image/upload/v1638965856/bell-icon-line-alarm-symbol-vector-21085810_suwpjf.jpg',
          Date: 'today',
          User: 'username',
          Message: 'booked stay',
          Stay: 'pukiland',
        },
      ],
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
