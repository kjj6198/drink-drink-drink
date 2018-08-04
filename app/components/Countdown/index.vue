<script>
import getRemainTime from '@/utils/getRemainTime';

export default {
  name: 'Countdown',
  mounted() {
    this.startCountdown();
  },
  updated() {
    if (!this.isEnded && this.endTime < new Date(Date.now())) {
      this.isEnded = true;
      clearInterval(this.timer);
    }
  },
  data: () => ({
    isEnded: false,
    timer: null,
  }),
  props: {
    endTime: { type: Date, required: true },
  },
  computed: {
    remain() {
      return () => {
        const remainTime = getRemainTime(this.endTime);
        return `${remainTime.hours}:${remainTime.minutes}:${remainTime.secs}`;
      };
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    startCountdown() {
      this.timer = setInterval(() => this.$forceUpdate(), 1000);
    },
  },
};
</script>

<template>
  <div :class="{ countdown: true, 'will-end': (endTime.getTime() - Date.now()) / 1000 / 60 <= 5 }">
    {{ isEnded ? '已結束' : remain() }}
  </div>
</template>

<style scoped>
.countdown {
  letter-spacing: 0.8px;
  text-align: center;
  font-size: 1.1em;
  font-family: 'Oswald', Times, serif;
}

.countdown.will-end {
  color: #fe6565;
}
</style>

