<script setup>
const props = defineProps({
  belongsTo: String,
});

const mustShow = computed(() => {
  return nav().path === props.belongsTo;
});
</script>

<template>
  <div v-show="false">
    <client-only>
      <teleport to="#bar">
        <section v-show="mustShow">
          <slot />
        </section>
      </teleport>
    </client-only>
  </div>
</template>
