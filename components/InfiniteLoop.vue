<script setup>
// const BOTTOM_TO_TRIGGER_DISTANCE_VH = 200;
const BOUNCE_TIME = 1000;
const SPINNER_SHOW_TIMEOUT = 1000;
const VIEW_PORT_HEIGHT = window.innerHeight;
const DEFAULT_RED_ZONE = 4 * VIEW_PORT_HEIGHT;
const NAVIGATOR_IDS_TO_CHASE_SCROLL = ["/workspace", "/home", "/"];
const emit = defineEmits(["ending"]);

const props = defineProps({
  tolerance: Number, //px
});

const space = ref();
const triggerEl = ref();
const hasSpinner = ref(true);
const redZone = props.tolerance ?? DEFAULT_RED_ZONE;

const loop = debounce(() => {
  let zone = document.documentElement.offsetHeight;
  let safeZone = zone - (redZone ?? 0);
  let traveled = document.documentElement.scrollTop + VIEW_PORT_HEIGHT;

  const hasPassed = (destination) => traveled > destination;
  // traveled > destination || triggerEl.value.getBoundingClientRect().top > 0;
  if (zone !== traveled) spin();

  if (hasPassed(safeZone)) {
    emit("ending");

    // if (traveled === zone )
    stopSpin();
  }
}, BOUNCE_TIME);

function stopSpin() {
  setTimeout(() => (hasSpinner.value = false), SPINNER_SHOW_TIMEOUT);
}

function spin() {
  hasSpinner.value = true;
}

// clear/apply event when leaving/entering the page
onMounted(() => {
  document.addEventListener("scroll", loop);

  document.addEventListener("navigate", (e) => {
    if (NAVIGATOR_IDS_TO_CHASE_SCROLL.includes(e.detail.to))
      document.addEventListener("scroll", loop);
    else document.removeEventListener("scroll", loop);
  });

  loop();
});
</script>

<template>
  <div ref="space" class="relative">
    <!-- <span
      class="absolute"
      ref="triggerEl"
      :style="`top:${BOTTOM_TO_TRIGGER_DISTANCE_VH}vh`"
    > -->
    <!-- floating hidden trigger -->
    <!-- </span> -->
    <slot />

    <div
      v-show="hasSpinner"
      class="p-8 flex items-center justify-center w-full"
    >
      <Spinner id="workspace_posts_spinner" />
    </div>
  </div>
</template>
