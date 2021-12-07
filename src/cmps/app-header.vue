<template>
  <header
    v-bind:class="{ 'white-header': !onHomePage, 'nav-scrolled': !topOfPage }"
    class="main-container"
  >
    <nav class="main-nav main-container">
      <div class="flex column">
        <router-link class="main-router-link" to="/">
          <!-- <div class="logo">RentMe<font-awesome-icon class="icon" icon="airbnb" /></div> -->
          <div class="logo">
            <font-awesome-icon :icon="['fab', 'airbnb']" />
            <span>rentme</span>
          </div>
        </router-link>
        <!-- FILTERS -->
        <secondary-filters v-if="onExplorePage" />
      </div>

      <div class="flex nav-content">
        <router-link class="main-router-link" to="/explore"
          >Explore</router-link
        >
        <router-link class="main-router-link" to="/become-host"
          >Become A Host</router-link
        >

        <!-- <router-link class="main-router-link" to="/login"></router-link> -->
        <div class="dropdown" v-click-outside="onClickOutside">
          <button
            @click="toggleUserModal"
            class="flex align-center user-btn dropbtn"
          >
            <font-awesome-icon icon="bars" class="bars" />
            <!-- <font-awesome-icon icon="user-circle" /> -->
            <div class="user-logo"><img v-if="loggedInUser" :src="imgUrl" alt="user image" />
                <font-awesome-icon v-else icon="user-circle" />
            </div>
          </button>
          <div
            id="myDropdown" :class="{ show: showUserModal }" class="dropdown-content">
              <!-- <router-link v-if="isLoggedInUser" :to="'/profile/' + userId" >
              Profile
                <span v-if="notifications"></span>
              </router-link> -->
              <!-- <router-link v-if="isLoggedInUser" :to="'/wishlist/' + userId" >
                  <span>Wishlist</span>
              </router-link> -->
            <a @click.stop="toggleSignup">Sign up</a>
            <a @click.stop="toggleLogin">Log in</a>
            <a v-if="loggedInUser" @click.stop="logout">Log out</a>
            <hr />
            <a href="#">Host your home</a>
          </div>
        </div>
        <!-- <login-signup v-if="showLogin"></login-signup> -->
      </div>
    </nav>
    <!-- <section class="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`"> {{}} </router-link>
      <span>{{ loggedInUser.score }}</span>
    </section> -->
  </header>
</template>
<script>
import secondaryFilters from '../cmps/filters/secondary-filters.vue';
// import loginSignup from './login-signup.vue';
export default {
  data() {
    return {
      onHomePage: false,
      onExplorePage: false,
      showUserModal: false,
      topOfPage: true,
      showLogin:false
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
      },
      immediate: true,
    },
  },
  computed:{
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }, 
    imgUrl() {
			const user = this.$store.getters.loggedInUser;
			if (user && user?.imgUrl) {
				return user.imgUrl
			} else {
				return ''
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
      // console.log('test');
      if (window.pageYOffset > 0) this.topOfPage = false;
      else this.topOfPage = true;
    },
    toggleLogin(){
      this.$emit('toggleLogin');
      this.showUserModal = false;
    },
    toggleSignup(){
      this.$emit('toggleSignup');
      this.showUserModal = false;
    },
    logout(){
      this.$emit('logout');
      this.showUserModal = false;
    }
  },
  components: {
    secondaryFilters,
    // loginSignup,
  },
};
</script>
