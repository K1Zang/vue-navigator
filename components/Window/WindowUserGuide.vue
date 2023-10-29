<script setup>
const ANIMATION_TIME_OUT = 4000;
const props = defineProps({});
const hasAnim = ref(true);

setTimeout(() => (hasAnim.value = !hasAnim.value), ANIMATION_TIME_OUT);

function flipCoin() {
  return Math.random() < 0.5;
}

const closeOrHide = flipCoin();
</script>

<template>
  <transition appear>
    <div class="w-fit" v-show="app().hasVisibleWindow">
      <!-- how to close guide -->
      <Blur
        v-if="closeOrHide"
        neutral
        class="p-2 px-4 w-fit max-w-[20rem] rounded-lg"
      >
        <P
          sm
          :class="
            'font-semibold opacity-50' + (hasAnim ? ' animate-pulse' : '')
          "
          text="swipe down to close"
        />
      </Blur>

      <!-- how to hide guide -->
      <Blur
        v-if="!closeOrHide"
        neutral
        class="p-2 px-4 w-fit max-w-[20rem] rounded-lg"
      >
        <P
          sm
          :class="
            'font-semibold opacity-50' + (hasAnim ? ' animate-pulse' : '')
          "
          text="tap away to hide"
        />
      </Blur>
    </div>
  </transition>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.2;
  }
}
</style>
