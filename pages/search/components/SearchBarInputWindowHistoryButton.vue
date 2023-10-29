<script setup>
const props = defineProps({
  name: String,
});

const s = useSearchStore();
</script>

<template>
  <InlineButton @click="s.value = name">
    <div class="flex gap-4 items-center">
      <Icon color="stroke-neutral-500" name="clock" />

      <P gray>{{ name }}</P>
    </div>
  </InlineButton>
</template>
