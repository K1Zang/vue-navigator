<script setup>
const MOVE_DEBOUNCE = 5;

const props = defineProps({
  window: Object,
  close: Function,
  holdEvent: Object, // event/null
});
const window = props.window ?? inject("window");

const MAX_HEIGHT = remToPx(WINDOW_MAX_HEIGHT_REM);
const MIN_HEIGHT = remToPx(WINDOW_MIN_HEIGHT_REM);

let [newHeight, height] = [null];
const [startY, triggerAreaEl, isHolding] = [ref(0), ref(null), ref(false)];

function hold(event) {
  window.initialize().disableAutoHide();
  height = window.body.offsetHeight;

  isHolding.value = true;
  startY.value = y(event);

  if (event.touches?.length >= 1) addEventListener("touchmove", chaseFinger);
  else onmousemove = addEventListener("mousemove", chaseMouse);
}

function chaseFinger(event) {
  move(event.touches[0].clientY);
}

function chaseMouse(event) {
  move(event.clientY);
}

const move = debounce((position) => {
  const content = window.body;

  if (isHolding.value) {
    newHeight =
      (newHeight ?? content.offsetHeight) +
      (startY.value - (startY.value = position));

    const isNotThatLarge =
      MAX_HEIGHT > window.initialHeight && window.initialHeight < newHeight;
    if (isNotThatLarge) newHeight = window.initialHeight;

    const hasHeightChanged = window.initialHeight < height;
    if (hasHeightChanged) newHeight = height;

    if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;

    window.setHeight(newHeight).setHasSqueezed(isAboutToClose());
  }
}, MOVE_DEBOUNCE);

function drop() {
  isHolding.value = false;

  if (isAboutToClose() && window.hasSqueezed) {
    props.close();
    newHeight = null;
  }

  newHeight = null;
  window.enableAutoHide();
}

function y(event) {
  if (event.touches?.length >= 1) {
    return event.touches[0].clientY;
  } else {
    event.preventDefault && event.preventDefault();
    return event.clientY;
  }
}

onMounted(() => {
  document.addEventListener("click", function (event) {
    const didNotClicked = (el) =>
      !(el === event.target || el?.contains(event.target));

    if (didNotClicked(triggerAreaEl.value)) drop();
  });
});

function isAboutToClose() {
  return newHeight && newHeight < window.closingHeight && newHeight !== height;
}

// watch(
//   () => props.holdEvent,
//   (value) => (value ? hold(value) : drop())
// );
</script>

<template>
  <div class="relative">
    <div
      class="mt-3 absolute top-0 left-0 right-0 flex flex-col place-items-center justify-center"
    >
      <div
        ref="triggerAreaEl"
        @mousedown="hold"
        @mouseup="drop"
        @touchstart="hold"
        @touchend="drop"
        class="h-[2.5rem] z-50 w-full absolute bottom-[-0.75rem] overflow-auto"
      >
        <!--the background area-->
      </div>

      <Blur soft neutral class="p-2 -mt-2 rounded-full flex flex-col z-40">
        <span
          class="rounded-full border-t-[0.3rem] border-neutral-400 dark:border-neutral-600 w-[4rem]"
        >
          <!--trigger line-->
        </span>
      </Blur>
    </div>
  </div>
</template>
