<template>
  <section>
    <h2>Thank you for booking!</h2>
    <button class="closeModal" @click="$emit('closeModal')">Done</button>
  </section>
</template>

<script>
export default {
  name: 'checkout-modal',
  methods: {},
};
</script>
