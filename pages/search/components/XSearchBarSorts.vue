<script setup>
const s = useSearchStore();
</script>

<template>
  <Window :id="s.sorts.window.id">
    <template #trigger>
      <SearchBarButtonBlur name="sort" icon="adjustments-horizontal" />
    </template>

    stuffs: date price quantity
  </Window>
</template>
