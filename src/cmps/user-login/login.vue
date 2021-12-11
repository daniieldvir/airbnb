<template>
  <section class="login-modal" @click.stop>
    <div class="login-header">
      <button class="close-btn" @click="close"><span>X</span></button>

      <h3>Login</h3>
    </div>
    <div class="login-input">
      <form action="" @submit.prevent="login">
        <input
          type="text"
          placeholder="Enter username"
          v-model="userCred.username"
          ref="usernameInputRef"
        />
        <input
          type="password"
          placeholder="Enter password"
          v-model="userCred.password"
        />
        <button class="checkout-btn" @mousemove="changeBtnColor">
          <span>Login</span>
        </button>
      </form>
      <div class="change-signup-button">
        <small
          >Don't have an account? Go to
          <button @click.stop="changeFormToSignup">Signup</button></small
        >
      </div>
    </div>
  </section>
</template>

<script>
import { showMsg } from '@/services/event-bus.service.js';
export default {
  name: 'login',
  data() {
    return {
      userCred: {
        username: '',
        password: '',
      },
      msg: '',
      isLoading: false,
    };
  },
  methods: {
    async login() {
      try {
        console.log('userCred', this.userCred);
        if (!this.userCred.username || !this.userCred.password)
          return (this.msg = 'Please enter username/password');
        await this.$store.dispatch({ type: 'login', userCred: this.userCred });
        this.$router.push('/');
        showMsg('Logged in successfully');
        this.userCred = {};
      } catch (err) {
        showMsg('Logged in failed', 'error');
        console.log('err', err);
      }
    },
    changeFormToSignup() {
      this.$emit('changeFormToSignup');
    },
    close() {
      this.$emit('close');
    },
    changeBtnColor(e) {
      const x = e.offsetX - e.target.offsetLeft;
      const y = e.offsetY - e.target.offsetLeft;
      e.target.style.setProperty('--x', `${x}px`);
      e.target.style.setProperty('--y', `${y}px`);
      // console.log('e', e);
      // console.log('x,y', x, y);
    },
  },

  computed: {},
};
</script>
