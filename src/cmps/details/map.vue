<template>
  <section class="myMap">
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="15"
      map-type-id="terrain"
      style="height: 400px"
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
  </section>
</template>

<script>
export default {
  name: 'myMap',
  props: ['stay'],
  data() {
    return {
      markers: [{ position: { lat: 0, lng: 0 } }],
      center: { lat: 0, lng: 0 },
    };
  },
  created() {
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
