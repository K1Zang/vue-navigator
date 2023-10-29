<script setup>
const props = defineProps({});
</script>

<template>
  <BarTop>
    <Blur class="p-1">
      <Strip v-bind="$attrs">
        <slot />
      </Strip>
    </Blur>
  </BarTop>
</template>
