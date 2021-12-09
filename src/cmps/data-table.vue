<template>
  <section v-if="currSection === 'Notifications'">
    <h2 v-if="!dataForList.length">No {{ titleForDisplay }} to display</h2>
    <template v-else>
      <div class="data-table">
        <span v-for="(column, columnHeader, idx) in dataForList[0]" :key="idx">
          <strong>{{ columnHeader }}</strong>
        </span>
        <template v-for="dataObject in dataForList">
          <img :src="dataObject.imgUrl" alt="" />
          <span>{{ dataObject.Date }}</span>
          <span>{{ dataObject.User }}</span>
          <span>{{ dataObject.Message }}</span>
          <span>{{ dataObject.Stay }}</span>
        </template>
      </div>
    </template>
  </section>
</template>
