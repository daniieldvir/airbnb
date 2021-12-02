<template>
  <section class="secondary-filters">
    <!-- PRICE RANGE -->
    <div class="dropdown">
      <button
        @click="toggleModal('price')"
        v-bind:class="{ active: price.shouldShow }"
      >
        Price
      </button>
      <div v-bind:class="{ show: price.shouldShow }" class="dropdown-content">
        <el-slider v-model="price.priceRange" range :min="15" :max="850">
        </el-slider>
      </div>
    </div>
    <!-- Property Type -->
    <div class="dropdown">
      <button
        @click="toggleModal('typePlace')"
        v-bind:class="{ active: typePlace.shouldShow }"
      >
        Property Type
      </button>
      <div
        v-bind:class="{ show: typePlace.shouldShow }"
        class="dropdown-content"
      >
        <div v-for="type in typePlace.types" :key="type">
          <p>{{ type }}</p>
        </div>
      </div>
    </div>
    <!-- Amenities -->
    <div class="dropdown">
      <button
        @click="toggleModal('amenities')"
        v-bind:class="{ active: amenities.shouldShow }"
      >
        Amenities
      </button>
      <div
        v-bind:class="{ show: amenities.shouldShow }"
        class="dropdown-content"
      >
        <div v-for="(type, idx) in amenities.types" :key="idx">
          <p>{{ type }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'secondary-filter',
  data() {
    return {
      activeBtn: '',
      shouldShow: false,
      price: {
        priceRange: [15, 850],
        shouldShow: false,
      },
      typePlace: {
        types: [
          'Entire home',
          'Entire condo',
          'Entire rental unit',
          'Entire loft hosted',
        ],
        selectedType: '',
        shouldShow: false,
      },
      amenities: {
        types: [
          'Kitchen',
          'Wifi',
          'TV',
          'Washer',
          'Dryer',
          'Crib',
          'Smoking allowed',
          'Pets allowed',
          'Cooking basics',
          'Air conditioning',
          'Heating',
          'Essentials',
          'Hair dryer',
        ],
        selectedType: '',
        shouldShow: false,
      },
    };
  },
  created() {},
  methods: {
    toggleModal(name) {
      this[name].shouldShow = !this[name].shouldShow;
    },
  },
  components: {},
};
</script>
