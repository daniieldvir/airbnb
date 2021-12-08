<template>
  <header
    v-bind:class="{ 'white-header': !onHomePage, 'nav-scrolled': !topOfPage }"
    class="main-container"
  >
    <main-filters
      v-if="onExplorePage || (onHomePage && !topOfPage)"
      :onExplorePage="onExplorePage"
      :onHomePage="onHomePage"
      :topOfPage="topOfPage"
    />

    <nav class="main-nav">
      <router-link class="main-router-link" to="/">
        <div class="logo">
          <font-awesome-icon :icon="['fab', 'airbnb']" />
          <span>rentme</span>
        </div>
      </router-link>
      <!-- </div> -->
      <!-- FILTERS -->
      <div class="flex nav-content">
        <router-link class="main-router-link" to="/explore"
          >Explore</router-link
        >
        <router-link class="main-router-link" to="/user-profile"
          >Become A Host</router-link
        >

        <div class="dropdown" v-click-outside="onClickOutside">
          <button
            @click="toggleUserModal"
            class="flex align-center user-btn dropbtn"
          >
            <font-awesome-icon icon="bars" class="bars" />
            <font-awesome-icon icon="user-circle" />
          </button>
          <div
            id="myDropdown"
            v-bind:class="{ show: showUserModal }"
            class="dropdown-content"
          >
            <a href="#">Sign up</a>
            <a href="#">Log in</a>
            <hr />
            <a href="#">Host your home</a>
          </div>
        </div>
      </div>
      <!-- <button class="btn-menu" onclick="toggleMenu()">☰</button> -->
    </nav>

    <!-- <section class="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`"> {{}} </router-link>
      <span>{{ loggedInUser.score }}</span>
    </section> -->
    <section>
      <secondary-filters v-if="onExplorePage" />
    </section>
  </header>
</template>
<script>
import mainFilters from '../cmps/stay-filter.vue';
import secondaryFilters from '../cmps/filters/secondary-filters.vue';
export default {
  data() {
    return {
      onHomePage: false,
      onExplorePage: false,
      showUserModal: false,
      topOfPage: true,
      showMainFilters: false,
    };
  },
  beforeMount() {
    window.addEventListener('scroll', this.handelScroll);
  },
  watch: {
    $route: {
      handler() {
        this.onHomePage = this.$route.name !== 'Home' ? false : true;
        this.onExplorePage = this.$route.name === 'Explore' ? true : false;
        console.log(this.onHomePage);
      },
      immediate: true,
    },
  },
  methods: {
    toggleUserModal() {
      this.showUserModal = !this.showUserModal;
    },
    onClickOutside() {
      this.showUserModal = false;
    },
    handelScroll() {
      // console.log('test');
      if (window.pageYOffset > 0) this.topOfPage = false;
      else this.topOfPage = true;
    },
  },
  components: {
    mainFilters,
    secondaryFilters,
  },
};
</script>
