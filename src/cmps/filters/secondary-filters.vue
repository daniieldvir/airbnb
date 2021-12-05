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
        <p>The average nightly price is $ 220</p>
        <el-slider
          @change="dispatchToStore"
          v-model="filterBy.priceRange"
          range
          :min="15"
          :max="850"
        >
        </el-slider>
        <div class="flex">
          <p>
            min price <br /><span>${{ filterBy.priceRange[0] }}</span>
          </p>
          -
          <p>
            max price <br /><span>${{ filterBy.priceRange[1] }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- Property Type -->
    <div class="dropdown">
      <button
        @click="toggleModal('propertyType')"
        v-bind:class="{ active: propertyType.shouldShow }"
      >
        Property Type
      </button>
      <div
        v-bind:class="{ show: propertyType.shouldShow }"
        class="dropdown-content"
      >
        <!-- <div v-for="type in propertyType.types" :key="type"> -->
        <p
          v-for="type in propertyType.types"
          :key="type"
          @click="setPropertyType(type)"
          class="pointer"
        >
          {{ type }}
        </p>
        <!-- </div> -->
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
        class="dropdown-content amenities"
      >
        <button v-if="amenities.shouldShow" @click="dispatchToStore">
          Show results
          <!-- <font-awesome-icon icon="search" /> -->
        </button>
        <div v-for="(type, idx) in amenities.types" :key="idx">
          <input
            type="checkbox"
            :id="type"
            :value="type"
            v-model="filterBy.amenities"
          />
          <label :for="type"
            ><p>{{ type }}</p>
          </label>
        </div>
      </div>
    </div>

    <button @click="clearSearch">Clear search</button>
  </section>
</template>

<script>
export default {
  name: 'secondary-filter',
  data() {
    return {
      filterBy: null,
      previousBtn: '',
      price: {
        shouldShow: false,
      },
      propertyType: {
        types: [
          'Entire home',
          'Entire condo',
          'Entire rental unit',
          'Entire loft',
          'Entire bungalow',
          'Private room in rental unit',
        ],
        shouldShow: false,
      },
      amenities: {
        types: [
          'Kitchen',
          'Wifi',
          'TV',
          'Crib',
          'Smoking allowed',
          'No smoking',
          'Pets allowed',
          'Cooking basics',
          'Air conditioning',
          'Refrigerator',
          'Free parking',
          'Bathub',
          'Elevator',
          'Heating',
          'Pool',
          'Spa',
          'Bath',
          'Accessible',
          'Beach',
          'Long term stays allowed',
        ],
        shouldShow: false,
      },
    };
  },
  created() {
    this.loadFilter();
    // this.showedStays = this.$store.getters.staysToShow;
  },
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
    loadFilter() {
      const filterBy = this.$store.getters.filterBy;
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
    },
    dispatchToStore() {
      this.$store.dispatch({ type: 'setFilter', filterBy: this.filterBy });
      this.loadFilter();
    },
    setPropertyType(type) {
      this.filterBy.propertyType = type;
      this.dispatchToStore();
    },
    clearSearch() {
      this.filterBy.priceRange = [15, 850];
      this.filterBy.amenities = [];
      this.filterBy.propertyType = '';
      this.dispatchToStore();
    },
  },
  computed: {
    // avgPrice() {
    //   const stays = this.$store.getters.staysToShow;
    //   console.log('stays from reduce', stays);
    //   if (stays.length) {
    //     return stays.reduce((acc, stay) => {
    //       (acc + stay.price) / stays.length;
    //     });
    //   } else {
    //     return 220;
    //   }
    // },
  },
};
</script>
