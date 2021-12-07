<template>
  <div id="app">
    <app-header @toggleSignup="toggleSignup" @toggleLogin="toggleLogin" @logout="logout"/>
    <router-view />
    <login v-if="!loggedInUser && isLogin && !isSignUp" @toggleLogin="toggleLogin" @changeFormToSignup="changeFormToSignup"/>
    <signup v-if="!loggedInUser && isSignUp && !isLogin" @toggleSignup="toggleSignup" @changeFormToLogin="changeFormToLogin"/>
  </div>
</template>

<script>
import appHeader from './cmps/app-header';
// import loginSignup from './cmps/login-signup.vue';
import login from './cmps/login.vue';
import signup from './cmps/signup.vue';

export default {
data(){
  return{
    isSignUp: false,
    isLogin:false
  }
},
computed:{
  loggedInUser() {
      return this.$store.getters.loggedInUser;
  }, 
},
methods:{
  toggleSignup(){
    this.isSignUp = true;
    this.isLogin = false;
  },
  toggleLogin(){
      this.isLogin = true;
      this.isSignUp = false;
  },
  changeFormToSignup(){
    this.isLogin = false;
    this.isSignUp = true;
  },
  changeFormToLogin(){
    this.isLogin = true;
    this.isSignUp = false;
  },
  logout(){
    this.$store.dispatch({type: 'logout'})
    this.isLogin = false;
    this.isSignUp = false;
  }

},
  components: {
    appHeader,
    login,
    signup
  },
};
</script>
