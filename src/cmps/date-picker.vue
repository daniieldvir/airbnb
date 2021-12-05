<template>
  <div class="date-picker block">
    <div class="date-picker-label">
      <label>Check in </label>

      <label>Check out </label>
    </div>
    <div class="date-picker-table">
      <el-date-picker
        @blur="filtered"
        v-model="dates"
        type="daterange"
        range-separator=""
        start-placeholder="Add dates"
        end-placeholder="Add dates"
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
      dates: '',
      //   value2: '',
    };
  },
  methods: {
    filtered() {
      this.$emit('filterClicked');
      this.$emit('filtered', this.dates);
    },
  },
};
</script>
