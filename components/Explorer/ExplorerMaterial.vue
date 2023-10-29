<script setup>
/**
 * for switching between components use
 * "explorer store" helpers
 *
 * note: "explorer store" automatically
 * passed to next component and can be
 * received by accepting it as incoming prop.
 *
 */

const props = defineProps({ id: String | Number });

const window = useWindow(props.id);
const explorer = ref();

const componentProps = computed(() => {
  if (
    explorer.value.module &&
    explorer.value.module.Component.name !== "AsyncComponentWrapper"
  )
    return {
      // include module specific props
      ...explorer.value.module.props,
      // pass the store to all sub-components
      explorer: explorer.value,
    };
});

const include = computed(() =>
  explorer.value?.history
    .map((module) => {
      if (!module.isDisposable) return module.uri;
    })
    .filter((item) => item !== undefined)
);

function bootUp() {
  explorer.value = useExplorer(props.id);
}

function bootDown() {
  if (!explorer.value) window.close();
  else explorer.value.close();
}
</script>

<template>
  <WindowMaterial :window="window" @open="bootUp()" @close="bootDown()">
    <Async
      v-if="explorer"
      :keepAlive="include"
      :id="explorer.id"
      :module="explorer.module"
      :componentProps="componentProps"
      :transition="explorer.transition"
    />
  </WindowMaterial>
</template>
