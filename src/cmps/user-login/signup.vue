<template>
  <section @click.stop class="signup-modal">
    <div class="signup-header">
      <button class="close-btn" @click.stop="close"><span>✕</span></button>
      <p>Sign up</p>
    </div>
    <div class="signup-input">
      <form @submit.prevent="signup">
        <input
          ref="fullname"
          type="text"
          placeholder="Enter fullname"
          v-model="userCred.fullname"
        />
        <input
          type="text"
          placeholder="Enter username"
          v-model="userCred.username"
        />
        <input
          type="email"
          placeholder="Enter email"
          v-model="userCred.email"
        />
        <input
          type="password"
          placeholder="Enter password"
          v-model="userCred.password"
        />
        <button class="checkout-btn" ref="myBtn">
          <span>Continue</span>
        </button>
      </form>
      <div class="change-login-button">
        <small
          >Already have an account? Back to
          <button @click.stop="changeFormToLogin">login</button></small
        >
      </div>
    </div>
  </section>
</template>

<script>
import { showMsg } from '@/services/event-bus.service';
export default {
  name: 'signup',
  data() {
    return {
      userCred: {
        username: '',
        fullname: '',
        email: '',
        password: '',
      },
      msg: '',
      isLoading: false,
    };
  },
  created() {
    // this.$refs.fullname.focus()
    this.$nextTick(() => this.$refs.fullname.focus());
  },
  methods: {
    // toggleSignUp() {
    //   this.$emit('toggleSignUp', false)
    // },
    async signup() {
      try {
        this.isLoading = true;
        if (
          !this.userCred.email ||
          this.userCred.fullname ||
          !this.userCred.password ||
          !this.userCred.username
        )
          return (this.msg = 'Please fill up the form');
        await this.$store.dispatch({ type: 'signup', userCred: this.userCred });

        if (this.$route.name !== 'Home') {
          this.$router.push('/');
        }
        showMsg('Signed up successfully!');
      } catch (err) {
        showMsg('Sign up failed!', 'error');
      }
    },
    changeFormToLogin() {
      this.$emit('changeFormToLogin');
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
