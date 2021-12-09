<template>
  <div class="data-table">
    <span v-for="(columnHeader, idx) in data.headers" :key="idx">
      <strong>{{ columnHeader }}</strong>
    </span>
    <template v-for="dataObject in dataForList">
      <img :src="dataObject.imgUrl" alt="" />
      <span>{{ dataObject.header1 }}</span>
      <span>{{ dataObject.header2 }}</span>
      <span>{{ dataObject.header3 }}</span>
      <span>{{ dataObject.header4 }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'data-table',
  props: { data: Array },
  data() {
    return {};
  },
};
</script>
