<template>
  <div id="app">
    <app-header
      @toggleSignup="toggleSignup"
      @toggleLogin="toggleLogin"
      @logout="logout"
    />
    <router-view />
    <login
      v-if="!loggedInUser && isLogin && !isSignUp"
      @toggleLogin="toggleLogin"
      @changeFormToSignup="changeFormToSignup"
    />
    <signup
      v-if="!loggedInUser && isSignUp && !isLogin"
      @toggleSignup="toggleSignup"
      @changeFormToLogin="changeFormToLogin"
    />
    <app-footer />
  </div>
</template>

<script>
import appHeader from './cmps/app-header.vue';
import login from './cmps/user-login/login.vue';
import signup from './cmps/user-login/signup.vue';
import appFooter from './cmps/app-footer.vue';

export default {
  data() {
    return {
      isSignUp: false,
      isLogin: false,
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    toggleSignup() {
      this.isSignUp = true;
      this.isLogin = false;
    },
    toggleLogin() {
      this.isLogin = true;
      this.isSignUp = false;
    },
    changeFormToSignup() {
      this.isLogin = false;
      this.isSignUp = true;
    },
    changeFormToLogin() {
      this.isLogin = true;
      this.isSignUp = false;
    },
    logout() {
      this.$store.dispatch({ type: 'logout' });
      this.isLogin = false;
      this.isSignUp = false;
    },
  },
  components: {
    appHeader,
    login,
    signup,
    appFooter,
  },
};
</script>
