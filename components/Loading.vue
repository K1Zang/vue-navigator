<script setup>
const props = defineProps({
  the: null,
  title: Boolean,
  size: String,
});

const classes = computed(() => {
  let classes;

  let isLoading = !Boolean(props.the || props.the === 0);
  let isNotLoading = !isLoading;

  classes = " bg-neutral-500/50 ";

  if (isLoading) {
    classes += " rounded animate-pulse ";
    classes += props.size ? props.size : " min-w-[1rem] min-h-[1rem] ";
    if (props.title) classes += " w-20 ";
  }

  if (isNotLoading) classes = "";

  return classes;
});
</script>

<template>
  <div :class="classes">
    <slot v-if="the || the === 0" />
  </div>
</template>
