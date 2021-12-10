<template>
  <section @click.stop class="signup-modal">
    <div class="signup-header">
      <button @click.stop="close"><span>X</span></button>
      <p>Sign up</p>
    </div>
    <div class="signup-input">
      <form @submit="signup">
        <input
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
          <span>Signup</span>
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
        // this.toggleSignUp()
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
