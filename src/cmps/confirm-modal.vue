<template>
  <section :class="{ 'show-modal': shouldShow }" class="confirm-modal">
    <h2>{{ message }}</h2>
    <div class="confirm-btns flex">
      <button class="confirm-btn" @click="$emit('confirm')">Confirm</button>
      <button class="closeModal" @click="$emit('closeModal')">Back</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'confirm-modal',
  props: {
    message: String,
    shouldShow: Boolean,
  },
  methods: {},
};
</script>
