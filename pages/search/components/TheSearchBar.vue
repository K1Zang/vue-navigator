<script setup>
const props = defineProps({});

const s = useSearchStore();
</script>

<template>
  <StripBlur :scroll="!s.isTyping" class="gap-2">
    <SearchBarInput />

    <transition name="slide" mode="in-out">
      <div class="flex" v-show="!s.isTyping">
        <SearchBarTrendingHashtags />
      </div>
    </transition>
  </StripBlur>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in;
}

.slide-enter-from {
  translate: 100%;
}

.slide-leave-to {
  translate: 100%;
}
</style>
