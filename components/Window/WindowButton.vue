<script setup>
defineProps({
  icon: String,
  color: String,
  solid: Boolean,
});
</script>

<template>
  <InlineButton :class="$attrs.class + ' ' + color">
    <slot />

    <template #left>
      <slot name="left">
        <Icon :name="icon" :solid="solid" :color="color" />
      </slot>
    </template>

    <template #right>
      <slot name="right" />
    </template>
  </InlineButton>
</template>
