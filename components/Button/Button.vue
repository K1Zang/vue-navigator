<script setup>
const props = defineProps({
  name: String | Number,
  icon: String,

  clickOnce: Function | Array,

  disabled: Boolean,
  loud: Boolean,
  quiet: Boolean,

  center: Boolean,
  noP: Boolean,
  inline: Boolean,

  gray: Boolean,
  blue: Boolean,
  wide: Boolean,

  noCapitalize: Boolean,
  noTranslation: Boolean,
  // smoky, bordered,
});

const a = app();

const classes = computed(() => {
  let classes = "";
  classes += props.inline ? " inline-block" : " flex flex-row";

  if (!props.noP) classes += " p-1 h-6";
  if (!props.noCapitalize) classes += " capitalize";
  if (props.gray) classes += " bg-neutral-500/20";
  if (props.blue) classes += " text-sky-600";
  if (props.center) classes += " justify-center";
  if (props.wide) classes += " px-4";

  if (props.disabled) classes += " opacity-50 cursor-not-allowed";
  if (props.clickOnce && a.tasks.length)
    classes += " bg-neutral-500/20 opacity-50 cursor-progress";

  if (props.quiet) classes += " text-neutral-500";
  if (props.loud) classes += " font-semibold";

  return classes;
});

function handle() {
  if (!props.disabled && props.clickOnce && !a.tasks.length) {
    typeof props.clickOnce === "function"
      ? props.clickOnce()
      : props.clickOnce?.shift()(...props.clickOnce);
  }
}
</script>

<template>
  <button
    :class="'items-center rounded ' + classes"
    @click="handle"
    type="button"
  >
    <slot>
      <slot name="icon">
        <Icon v-if="icon" small :name="icon" class="mr-1" />
      </slot>
      {{ noTranslation ? name : __(name) }}
    </slot>
  </button>
</template>
