<script setup>
const props = defineProps({});
const a = app();
</script>

<template>
  <header id="header">
    <TheProgressIndicator />
    <TheZoomedAlert />

    <transition>
      <div v-if="a.hasLoaded">
        <!-- <TheInviteToDownloadApp /> -->
        <TheSelectLocale v-if="!auth().setting?.hasSelectedLocale" />
      </div>
    </transition>

    <div
      id="notices"
      class="mt-12 max-w-[50rem] mx-auto fixed top-0 left-0 right-0 z-40"
    >
      <transition-group>
        <Notice
          class="m-1"
          v-for="notice in a.notices ?? []"
          :key="notice.message"
          :notice="notice"
        />
      </transition-group>
    </div>
  </header>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-move,
.v-enter-active,
.v-leave-active {
  transition: translate 0.3s;
}

.v-enter-from,
.v-leave-to {
  translate: 0 -200%;
}
</style>
