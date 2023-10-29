<script setup>
const props = defineProps({
  window: Object,
});

const window = props.window ?? inject("window");
</script>

<template>
  <Blur
    border
    class="overflow-hidden rounded-[2.6rem] flex flex-col"
    :style="`
      min-height:${WINDOW_MIN_HEIGHT_REM}rem; 
      max-height:${WINDOW_MAX_HEIGHT_REM}rem;
      transition: all .3s ease-in-out; 
      scale:${window.hasSqueezed ? 0.9 : 1};
      `"
  >
    <slot />
  </Blur>
</template>
