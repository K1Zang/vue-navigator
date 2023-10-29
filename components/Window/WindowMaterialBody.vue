<script setup>
const props = defineProps({
  window: Object,
});

const window = props.window ?? inject("window");

// todo swipe-down for reload
function hold(event) {
  // if (event.touches?.length >= 1) ontouchmove = chase;
  if (event.touches?.length >= 1) addEventListener("touchmove", chase);
  // else onmousemove = chase;
}

function chase(event) {
  let isSwipingDownWhenItsAlreadyAtTop =
    !window.body.scrollTop && event.movementY > WINDOW_MOUSE_CATCH_TOLERANCE;

  holdEventOnSwipeDown.value = isSwipingDownWhenItsAlreadyAtTop ? event : null;
}

function drop() {
  holdEventOnSwipeDown.value = null;
}

onMounted(() => window.onBodyMountedCallbacks.forEach((c) => c(window)));
</script>

<template>
  <div class="overflow-y-auto scroll-smooth">
    <!-- :style="`height:${window.height}px;`" -->
    <!-- @touchstart="hold"
    @touchend="drop" -->
    <slot />
  </div>
</template>
