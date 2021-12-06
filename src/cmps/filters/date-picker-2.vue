<template>
  <section class="date-picker-cont">
    <div class="block checkIn flex column">
      <label>Check in</label>
      <el-date-picker
        @blur="filtered"
        v-model="filterBy.dates.checkInDate"
        type="date"
        placeholder="Add dates"
      >
      </el-date-picker>
    </div>
    <div class="block checkOut flex column">
      <label>Check out</label>
      <el-date-picker
        @blur="filtered"
        v-model="filterBy.dates.checkOutDate"
        type="date"
        placeholder="Add dates"
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
    console.log('creatred date 2', this.filterBy);
    console.log();
  },
  methods: {
    loadFilter() {
      const filterBy = this.$store.getters.filterBy;
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
      console.log(this.filterBy);
    },
    filtered() {
      this.$emit('filterClicked');
      console.log('from date picker sending', this.filterBy.dates);
      this.$emit('filtered', this.filterBy.dates);
    },
  },
};
</script>
