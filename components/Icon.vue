<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
const DEFAULT_SIZE_IN_PX = 26;

const props = defineProps({
  name: String,
  solid: Boolean,
  small: Boolean,
  color: String,
  size: Number,
  parentClass: String,
});

const outlineVersion = ref(null);
const solidVersion = ref(null);

import(`../assets/icons/${props.name?.toLowerCase()}.json`)
  .then((json) => {
    outlineVersion.value = json.outline;
    solidVersion.value = json.solid;
  })
  .catch((e) => null);

const classes = computed(() => {
  let classes = "";

  if (props.solid && !solidVersion.value)
    classes += ` fill-none ${
      props.color ?? " stroke-black dark:stroke-white "
    } stroke-[0.16rem] `;
  else if (props.solid)
    classes += ` ${props.color ?? " fill-black dark:fill-white "} stroke-none `;
  else
    classes += ` fill-none ${
      props.color ?? " stroke-black dark:stroke-white "
    } stroke-[0.08rem] `;

  if (props.small) classes += " h-4 w-4 stroke-[0.1rem]";

  return classes;
});

const computedSize = computed(() =>
  props.small ? remSizeToPx(1) : remSizeToPx(1.625)
);

function remSizeToPx(rem) {
  let px = remToPx(rem);
  return Number.isNaN(px) ? DEFAULT_SIZE_IN_PX : px;
}
</script>

<template>
  <Loading
    :class="parentClass"
    :the="outlineVersion"
    :size="small ? 'h-4 w-4' : 'w-[1.625rem] h-[1.625rem]'"
  >
    <svg
      v-bind="$attrs"
      :class="classes"
      :width="size ?? computedSize"
      :height="size ?? computedSize"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <template v-if="solid && solidVersion">
        <path
          v-for="d in solidVersion"
          fill-rule="evenodd"
          :d="d"
          clip-rule="evenodd"
        />
      </template>

      <template v-else>
        <path
          v-for="d in outlineVersion"
          stroke-linecap="round"
          stroke-linejoin="round"
          :d="d"
        />
      </template>
    </svg>
  </Loading>
</template>

<style scoped></style>
