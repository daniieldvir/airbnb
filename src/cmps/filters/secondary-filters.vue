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
      <div
        v-bind:class="{ show: price.shouldShow }"
        class="dropdown-content price"
      >
        <p>The average nightly price is ₪519</p>
        <el-slider v-model="price.priceRange" range :min="15" :max="850">
        </el-slider>
        <div class="flex">
          <p>
            min price <br /><span>${{ price.priceRange[0] }}</span>
          </p>
          -
          <p>
            max price <br /><span>${{ price.priceRange[1] }}</span>
          </p>
        </div>
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
          <!-- <p>{{ type }}</p> -->
          <input
            type="checkbox"
            :id="type"
            :value="type"
            v-model="amenities.selectedTypes"
          />
          <label :for="type"
            ><p>{{ type }}</p>
          </label>
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
      previousBtn: '',
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
        selectedTypes: [],
        shouldShow: false,
      },
    };
  },
  created() {},
  methods: {
    toggleModal(currBtn) {
      if (this.previousBtn && this.previousBtn !== currBtn) {
        this[this.previousBtn].shouldShow = false;
        this[currBtn].shouldShow = true;
        this.previousBtn = currBtn;
      } else if (this.previousBtn === currBtn) {
        this[currBtn].shouldShow = false;
        this.previousBtn = '';
      } else {
        this[currBtn].shouldShow = true;
        this.previousBtn = currBtn;
      }
    },
  },
  components: {},
};
</script>
