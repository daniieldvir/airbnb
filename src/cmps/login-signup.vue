<template>
  <main class="login-signup">
    <section v-if="!isSignedUp" class="sign-log-forms">
      <form @submit.prevent="signup">
        <label for=""
          >Full Name:<input type="text" v-model="signupInfo.fullname"
        /></label>
        <label for=""
          >Email: <input type="email" v-model="signupInfo.email"
        /></label>
        <label for=""
          >Username:<input type="text" v-model="signupInfo.username"
        /></label>
        <label for=""
          >Password:<input type="password" v-model="signupInfo.password"
        /></label>
        <button>signup</button>
        <p>Already Signed Up? <span @click="switchForm">Back to Login</span></p>
      </form>
    </section>

    <section v-if="isSignedUp" class="sign-log-forms">
      <div v-if="loggedinUser">
        <h2 class="green">Welcome {{ loggedinUser.username }}</h2>
        <el-button type="danger" @click="logout">Logout</el-button>
      </div>
      <hr />
      <form @submit.prevent="login">
        <label for=""
          >Username:<input
            type="text"
            place="Enter your username"
            v-model="loginInfo.username"
        /></label>
        <label for=""
          >Password:<input
            type="password"
            place="Enter your password"
            v-model="loginInfo.password"
        /></label>
        <button>Login</button>
        <p>
          Don't have an account? <span @click="switchForm">Create One</span>
        </p>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: 'user-login',
  data() {
    return {
      loginInfo: { username: '', password: '' },
      signupInfo: { fullname: '', email: '', username: '', password: '' },
      isSignedUp: true,
      //   loggedinUser: null,
      isAdmin: false,
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    titleLogin() {
      return this.isSignUp ? 'Sign up' : 'Login';
    },
  },
  created() {
    // console.log('this.loggedinUser', this.loggedinUser)
    // this.loggedinUser = this.$store.getters.loggedinUser;
  },
  methods: {
    async login() {
      const cred = this.loginInfo;
      if (!cred.username || !cred.password)
        return (this.msg = 'Please enter user/password');
      await this.$store.dispatch({ type: 'login', userCred: cred });
      this.loginInfo = {};
    },
    logout() {
      this.$store.dispatch({ type: 'logout' });
    },
    signup() {
      const cred = this.signupInfo;
      if (!cred.email || !cred.password || !cred.username)
        return (this.msg = 'Please fill up the form');
      this.$store.dispatch({ type: 'signup', userCred: cred });
      this.$router.push('/');
    },
    switchForm() {
      this.isSignedUp = !this.isSignedUp;
    },
  },
  //   watch : {
  //     loggedInUser() {
  //       this.userToEdit = {...this.loggedInUser}
  //  this.loggedinUser=
  //     }
  //   }
};
</script>
