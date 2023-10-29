<script setup>
const MIN_WINDOW_TO_KEEP_SHOW_REM = 10;
const minToShow = remToPx(MIN_WINDOW_TO_KEEP_SHOW_REM);

const props = defineProps({
  window: Object,
  noSpacing: Boolean,
});
</script>

<template>
  <div class="pt-14">
    <transition>
      <Blur
        v-show="window.height > minToShow || !window.height"
        neutral
        :class="
          ' absolute bottom-0 left-0 right-0 z-30' +
          (noSpacing ? '' : ' min-h-[2.5rem] ')
        "
      >
        <div v-bind="$attrs" :class="noSpacing ? '' : ' my-4 mx-6 '">
          <slot />
        </div>
      </Blur>
    </transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: translate 0.2s;
}

.v-enter-from,
.v-leave-to {
  translate: 0 4rem;
}
</style>
