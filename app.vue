<script setup>
if (process.client) app().boot();

onMounted(() => {
  document.addEventListener("error", () =>
    Notice("there was an error you may need to reload the app.", {
      buttons: [new Button("reload", location.reload())],
    })
  );
});

onBeforeMount(navigatorHooks);

useHead({
  bodyAttrs: {
    class:
      "dark:bg-black dark:text-white text-base font-normal font-sans max-w-[50rem] mx-auto select-none",
  },
  meta: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
    },
  ],
});

// const transition = computed(() => ({
//   name: nav().transition,
//   mode: "out-in",
// }));
/**
 * setting transition conflict with scroll and
 * toggling transition to undefined reload the page!
 */
</script>

<template>
  <NuxtLayout>
    <TheAppLoadingCover />

    <ThePrefetchTheNavigators />

    <client-only>
      <TheWideScreenNotSupported />

      <!-- :transition="
        nav().transition !== AsyncTransition.None ? transition : undefined
      " -->
      <NuxtPage :keepalive="{ exclude: '' }" />
    </client-only>
  </NuxtLayout>
</template>

<style>
.backward-enter-active,
.backward-leave-active,
.forward-enter-active,
.forward-leave-active {
  transition: all 0.2s ease;
}

/* .backward-leave-to, */
.forward-enter-from {
  translate: 100%;
}

/* .forward-leave-to, */
.backward-enter-from {
  translate: -100%;
}

/* .none-enter-active,
.none-leave-active {
  transition: all 0s ease;
}
.none-enter-from {
  opacity: 0;
}

.none-enter-from {
  opacity: 0;
} */

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

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
