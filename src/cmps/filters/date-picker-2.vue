<template>
  <section class="date-picker-cont">
    <div class="block flex column">
      <label>Check in</label>
      <el-date-picker
        v-model="dates.checkInDate"
        type="date"
        placeholder="Add dates"
      >
      </el-date-picker>
    </div>
    <div class="block flex column">
      <label>Check out</label>
      <el-date-picker
        v-model="dates.checkOutDate"
        type="date"
        placeholder="Add dates"
      >
      </el-date-picker>
    </div>
  </section>
</template>

<script>
export default {
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
      dates: {
        checkInDate: '',
        checkOutDate: '',
      },
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
