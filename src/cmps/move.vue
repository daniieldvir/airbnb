<template>
  <section class="moving">
    <div class="coords">{{ x }}:{{ y }}</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  created() {
    document.addEventListener('mousemove', this.onMove);
  },
  methods: {
    onMove(ev) {
      this.x = ev.clientX;
      this.y = ev.clientY;
      console.log('x', ev.clientX);
      console.log('y', ev.clientY);
    },
  },
};
</script>
