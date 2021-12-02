<template>
  <section class="side-filters">
    <!-- PRICE RANGE -->
    <div class="dropdown">
      <button @click="toggleModal('price')">Price</button>
      <div v-bind:class="{ show: price.shouldShow }" class="dropdown-content">
        <el-slider v-model="price.priceRange" range :min="15" :max="850">
        </el-slider>
      </div>
    </div>
    <!-- Property Type -->
    <div class="dropdown">
      <button @click="toggleModal('typePlace')">Property Type</button>
      <div
        v-bind:class="{ show: typePlace.shouldShow }"
        class="dropdown-content"
      >
        <div v-for="type in typePlace.types" :key="type">
          <span>{{ type }}</span>
        </div>
      </div>
    </div>
    <!-- Amenities -->
    <div class="dropdown">
      <button @click="toggleModal('amenities')">Amenities</button>
      <div
        v-bind:class="{ show: amenities.shouldShow }"
        class="dropdown-content"
      >
        <div v-for="(type, idx) in amenities.types" :key="idx">
          <span>{{ type }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'side-filter',
  data() {
    return {
      shouldShow: false,
      price: {
        priceRange: [15, 850],
        shouldShow: false,
      },
      typePlace: {
        types: ['Entire home', 'Entire condo', 'Entire rental unit'],
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
  created() {
    // this.loadFilter();
  },
  methods: {
    toggleModal(name) {
      console.log(name);
      this[name].shouldShow = !this[name].shouldShow;
    },
    toggletypePlace() {},
  },
  components: {},
};
</script>
