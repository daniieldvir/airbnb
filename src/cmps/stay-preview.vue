<template>
  <section v-if="stay" class="stay-preview">
    <p>{{ stay.name }}</p>
  </section>
</template>

<script>
export default {
  name: "stay-preview",
  props: ["stay"],
};
</script>
