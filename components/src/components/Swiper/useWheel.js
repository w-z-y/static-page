import { ref } from "vue";

export default function useWheel({ vertical, onNext, onPrev }) {
  if (!vertical) return {};
  
  const lastWheelTime = ref(0);
  const touchStartY = ref(0);
  const WHEEL_DELAY = 200;
  const MIN_DELTA = 10;
  const TOUCH_MIN_DELTA = 50; // 触摸滑动最小距离阈值

  const handleWheel = (e) => {
    e.preventDefault();

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

  const handleTouchStart = (e) => {
    e.preventDefault(); // 阻止默认行为
    touchStartY.value = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // 阻止默认的滚动行为
  };

  const handleTouchEnd = (e) => {
    e.preventDefault(); // 阻止默认行为
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.value - touchEndY;

    if (Math.abs(deltaY) >= TOUCH_MIN_DELTA) {
      deltaY > 0 ? onNext() : onPrev();
    }
  };

  return {
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
