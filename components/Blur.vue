<script setup>
const props = defineProps({
  gray: Boolean,
  neutral: Boolean,
  soft: Boolean,
  border: Boolean,
});

let classes = props.soft ? " backdrop-blur " : " backdrop-blur-xl ";

// if (!props.neutral) classes += "bg-white/70 dark:bg-black/70 border border-neutral-500/10 "
// if (!props.neutral) classes += "bg-neutral-100/80 dark:bg-[#0F0F0F]/80 bg-[#F0F0F0]/80 "

if (props.gray) classes += "dark:bg-[#1f1f1f]/60 bg-[#f5f5f5]/75 ";
if (!props.neutral) classes += "dark:bg-[#000]/75 bg-[#fff]/75 ";
if (props.border)
  classes += " border-2 dark:border-neutral-100/10 border-neutral-900/10 ";
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
