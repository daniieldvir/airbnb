<template>
  <section class="map">
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="15"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
    <el-button
      v-for="(marker, idx) in markers"
      :key="idx"
      @click="moveTo(marker.position)"
      >{{ marker.city }}</el-button
    >
  </section>
</template>

<script>
export default {
  name: 'map',
  props: ['stay'],
  data() {
    return {
      markers: [{ position: { lat: 0, lng: 0 } }],
      center: { lat: 0, lng: 0 },
    };
  },
  created() {
    console.log('dis stay', this.stay);
    this.center = this.markers[0].position;

    this.markers[0].position.lat = this.stay.loc.lat;
    this.markers[0].position.lng = this.stay.loc.lng;
  },
  methods: {
    moveTo(position) {
      const { lat, lng } = position;
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({ lat, lng });
      });
    },
  },
};
</script>
