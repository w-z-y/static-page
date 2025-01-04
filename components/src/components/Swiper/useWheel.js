import { ref } from "vue";

export default function useWheel({ vertical, onNext, onPrev }) {
  if (!vertical) return {};
  const lastWheelTime = ref(0);
  const WHEEL_DELAY = 200; // 滚轮事件节流时间
  const MIN_DELTA = 10; // 最小滚动距离阈值

  const handleWheel = (e) => {
    e.preventDefault(); // 阻止默认滚动行为

    const now = Date.now();
    if (now - lastWheelTime.value < WHEEL_DELAY) {
      return;
    }
    lastWheelTime.value = now;

    const delta = e.deltaY;

    if (Math.abs(delta) < MIN_DELTA) {
      return; // 忽略微小的滚动
    }

    // 根据滚动方向触发对应事件
    delta > 0 ? onNext() : onPrev();
  };

  return {
    handleWheel,
  };
}
