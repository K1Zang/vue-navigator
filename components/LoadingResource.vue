<script setup>
const props = defineProps({
  icon: String,
  message: String,
  small: Boolean,
  the: null,
});

const isLoading = computed(() => !Boolean(props.the || props.the === 0));
</script>

<template>
  <div
    v-if="isLoading || !the.length"
    :class="
      'm-8 flex flex-col items-center justify-center ' +
      (small ? '' : 'mt-[20vh] ')
    "
  >
    <Spinner v-if="isLoading" />

    <div
      v-else-if="!the.length"
      class="flex flex-col items-center justify-center"
    >
      <Icon
        v-if="icon"
        :name="icon"
        style="width: 12rem; height: 12rem; stroke-width: 0.01rem"
      />

      <H
        capital
        :text="message"
        class="m-4 p-2 px-4 bg-neutral-500/20 rounded-lg"
      />

      <slot />
    </div>
  </div>
</template>
