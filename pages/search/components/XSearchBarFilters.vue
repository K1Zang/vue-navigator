<script setup>
const s = useSearchStore();
</script>

<template>
  <Window :id="s.filters.window.id">
    <template #trigger>
      <SearchBarButtonBlur name="filter" icon="funnel" class="stroke-black" />
    </template>

    stuffs:
    <!-- 
    * only verified 
    only supplies 
    only auctions 
    only hot discounts 
    price less than
    price more than
    quantity more than -->
  </Window>
</template>
