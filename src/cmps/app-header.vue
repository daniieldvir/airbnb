<template>
  <header
    v-bind:class="{
      'white-header': !onHomePage,
      'nav-scrolled': !topOfPage,
      'details-page': onDetailsPage,
    }"
    class="main-container"
  >
    <main-filters
      v-if="onExplorePage || (onHomePage && !topOfPage)"
      @filtered="goToExplorePage"
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
            <!-- <font-awesome-icon icon="user-circle" /> -->
            <div class="user-logo">
              <img v-if="loggedInUser" :src="imgUrl" alt="user image" />
              <font-awesome-icon v-else icon="user-circle" />
            </div>
          </button>
          <div
            id="myDropdown"
            :class="{ show: showUserModal }"
            class="dropdown-content"
          >
            <!-- <router-link v-if="isLoggedInUser" :to="'/profile/' + userId" >
              Profile
                <span v-if="notifications"></span>
              </router-link> -->
            <router-link v-if="loggedInUser" :to="'/wishlist/' + userId">
              <span>Wishlist</span>
            </router-link>
            <template v-if="!loggedInUser">
              <a @click.stop="toggleLogin">Log in</a>
              <a @click.stop="toggleSignup">Sign up</a>
              <hr />
              <router-link :to="'/stay/edit'">
                <span>Host your home</span>
              </router-link>
              <!-- <a href="/stay/edit">Host your home</a> -->
            </template>
            <template v-else>
              <router-link v-if="loggedInUser" :to="'/user-profile'">
                <span>Notifications</span>
              </router-link>
              <!-- <a href="/user-profile">Notifications</a> -->
              <router-link v-if="loggedInUser" :to="'/trips'">
                <span>Trips</span>
              </router-link>
              <!-- <a href="/trips">Trips</a> -->
              <!-- <a>Wishlist</a> -->
              <hr />
              <router-link v-if="loggedInUser" :to="'/stay/edit'">
                <span>Host your home</span>
              </router-link>
              <!-- <a href="/stay/edit">Host your home</a> -->
              <!-- <a href="/user-profile">User profile</a> -->
              <router-link v-if="loggedInUser" :to="'/user-profile'">
                <span>User profile</span>
              </router-link>
              <hr />
              <a @click.stop="logout">Log out</a>
            </template>
          </div>
        </div>
        <!-- <login-signup v-if="showLogin"></login-signup> -->
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
// import loginSignup from './login-signup.vue';
export default {
  name: 'app-header',
  data() {
    return {
      onHomePage: false,
      onExplorePage: false,
      showUserModal: false,
      topOfPage: true,
      showLogin: false,
      showMainFilters: false,
      onDetailsPage: false,
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
        this.onDetailsPage = this.$route.name === 'stayDetails' ? true : false;
      },
      immediate: true,
    },
  },
  computed: {
    userId() {
      return this.$store.getters.loggedInUser._id;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    imgUrl() {
      const user = this.$store.getters.loggedInUser;
      if (user && user?.imgUrl) {
        return user.imgUrl;
      } else {
        return '';
      }
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
      if (window.pageYOffset > 0) this.topOfPage = false;
      else this.topOfPage = true;
    },
    toggleLogin() {
      this.$emit('toggleLogin');
      this.showUserModal = false;
    },
    toggleSignup() {
      this.$emit('toggleSignup');
      this.showUserModal = false;
    },
    logout() {
      this.$emit('logout');
      this.showUserModal = false;
    },
    goToExplorePage() {
      this.$router.push('/explore');
    },
  },
  components: {
    mainFilters,
    secondaryFilters,
    // loginSignup,
  },
};
</script>
