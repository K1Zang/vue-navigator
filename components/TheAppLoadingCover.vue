<script setup>
const TIMEOUT_TO_HIDE = 1000; // from when app fully loaded and mounted
const isShow = ref(true);

watch(
  () => app().hasLoaded,
  (v) => v && hide()
);
// or
onMounted(hide);

function hide() {
  setTimeout(() => (isShow.value = false), TIMEOUT_TO_HIDE);
}
</script>

<template>
  <transition>
    <Blur
      v-show="isShow"
      class="fixed z-50 inset-0 w-[100vw] h-[100vh] flex items-center justify-center"
    >
      <!-- todo: in covering fixed el ro be dom ezafe kon va 
      onLoaded get it ba id va hazfesh kon az dom -->
      <div class="-mt-20 absolute p-8 rounded-full">
        <!-- little shadow under blur -->
      </div>

      <Blur neutral class="-mt-20 p-8 rounded-full" @click="to(LANDING_PAGE)">
        <transition name="scaled">
          <Logo :size="4" v-show="isShow" />
        </transition>
      </Blur>
    </Blur>
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.scaled-enter-active,
.scaled-leave-active {
  transition: all 0.2s ease;
}

.scaled-enter-from {
  scale: 1.2;
}

.scaled-leave-to {
  scale: 0.8;
}
</style>
