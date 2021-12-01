<template>
  <section v-if="stay" class="stay-preview">
    <router-link class="router-link" :to="'/stay/' + stay._id">
      <img class="preview_img" :src="stay.imgUrls[0]" alt="" />
      <p>{{ stay.name }}</p>
      <p>{{ stay.capacity }} guests</p>
      <p>{{ stay.amenities.join(',') }}</p>
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'stay-preview',
  props: ['stay'],
};
</script>
