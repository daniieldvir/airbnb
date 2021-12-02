<template>
  <div class="price-slider">
    <span
      >from <input type="number" value="5000" min="0" max="120000" /> to
      <input type="number" value="50000" min="0" max="120000"
    /></span>
    <input value="25000" min="0" max="120000" step="500" type="range" />
    <input value="50000" min="0" max="120000" step="500" type="range" />
    <svg width="100%" height="24">
      <line
        x1="4"
        y1="0"
        x2="300"
        y2="0"
        stroke="#212121"
        stroke-width="12"
        stroke-dasharray="1 28"
      ></line>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
