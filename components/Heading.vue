<script setup>
const props = defineProps({
  disableAutoHide: Boolean,
});
const DEBOUNCE_TIME = 50;
const SCROLL_SENSITIVITY_TOLERANCE = 20; //px
const TIME_BETWEEN_SCROLL_SAMPLES = 20;

const isShow = ref(true);

let scrollYStart = 0;
let routePath;
const toggleIsShow = debounce((e) => {
  isShow.value = !(
    window.scrollY !== 0 &&
    window.scrollY +
      (isShow.value
        ? -SCROLL_SENSITIVITY_TOLERANCE
        : SCROLL_SENSITIVITY_TOLERANCE) >
      scrollYStart
  );

  setTimeout(
    () => (scrollYStart = window.scrollY),
    TIME_BETWEEN_SCROLL_SAMPLES
  );
}, DEBOUNCE_TIME);

onMounted(() => {
  routePath = useRoute().path;
  if (!props.disableAutoHide) {
    document.addEventListener("scroll", toggleIsShow);
    document.addEventListener("navigate", (e) => {
      if (routePath === e.detail.to)
        document.addEventListener("scroll", toggleIsShow);
      else document.removeEventListener("scroll", toggleIsShow);
    });
  }
});
</script>

<template>
  <Sticky
    :class="'z-20 transition-all duration-300 '"
    :style="`translate: 0 ${isShow ? 0 : -300}%`"
  >
    <slot name="strip-blur-top" />

    <StripBlur class="justify-between">
      <slot />
    </StripBlur>
  </Sticky>
</template>
