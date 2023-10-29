<script setup>
// const SHOW_TIMEOUT = 3000;
// const mustShow = ref(true);
// const hide = debounce(() => (mustShow.value = false), SHOW_TIMEOUT);

// watch(
//   () => app().hasTask,
//   (v) => {
//     if (v) mustShow.value = true;
//     else hide();
//   }
// );
</script>
<template>
  <svg
    class="animate-spin w-8 h-8 dark:text-white text-black"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    style="animation: spin 0.5s linear infinite"
  >
    <!-- v-show="mustShow" -->
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</template>
