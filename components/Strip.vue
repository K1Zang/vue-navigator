<script setup>
const props = defineProps({
  scroll: Boolean,
});
</script>

<template>
  <div
    :class="
      ' w-full px-2 flex flex-row items-center ' +
      (scroll ? ' overflow-x-auto hide-scroll-bar ' : '')
    "
    :style="`min-height:${STRIP_HEIGHT_REM}rem;`"
  >
    <slot />
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scroll-bar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
