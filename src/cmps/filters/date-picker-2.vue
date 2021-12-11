<template>
  <section class="date-picker-cont">
    <div class="block checkIn flex column">
      <label>Check in</label>
      <el-date-picker
        @blur="copyFilter"
        v-model="filterBy.dates.checkInDate"
        type="date"
        :placeholder="dateToStr(filterBy.dates.checkInDate) || 'Add date'"
      >
      </el-date-picker>
    </div>
    <div class="block checkOut flex column">
      <label>Check out</label>
      <el-date-picker
        @blur="copyFilter"
        v-model="filterBy.dates.checkOutDate"
        type="date"
        :placeholder="dateToStr(filterBy.dates.checkOutDate) || 'Add date'"
      >
      </el-date-picker>
    </div>
  </section>
</template>

<script>
export default {
  name: 'datePicker2',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            },
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            },
          },
        ],
      },
      filterBy: null,
    };
  },
  created() {
    this.loadFilter();
  },
  methods: {
    loadFilter() {
      const filterBy = this.$store.getters.filterBy;
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
    },
    filtered(filterBy) {
      this.$emit('filterClicked');
      this.$emit('filtered', filterBy.dates);
      // const filterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$store.dispatch({
        type: 'setFilter',
        filterBy: filterBy.dates,
      });
    },
    copyFilter() {
      const filterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.filtered(filterBy);
    },
    dateToStr(date) {
      return date.toString();
    },
  },
};
</script>
