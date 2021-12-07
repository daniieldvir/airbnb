<template>
  <div>
    <div class="double-picker-cont">
      <el-date-picker
        @blur="filtered"
        v-model="dates"
        type="daterange"
        range-separator=""
        start-placeholder="Add dates"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: 'Last week',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: 'Last month',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
      dates: [],
    };
  },
  methods: {
    filtered() {
      const dates = { checkInDate: this.dates[0], checkOutDate: this.dates[1] };
      console.log(dates);
      this.$emit('filterClicked');
      this.$emit('filtered', dates);
    },
  },
};
</script>
