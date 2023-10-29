<script setup>
const TIMEOUT_TO_SHOW_FLOATER = 10000;
const FLOATER_MIN_HEIGHT_VH = 20;
const FLOATER_MAX_HEIGHT_VH = 60;
const HEIGHT_TOLERANCE = remToPx(9);

const props = defineProps({
  window: Object,
});

const w = props.window ?? inject("window");

const mustShowFloater = ref(true);
const toggleToFloater = ref(false);
const dynamicMaxHeight = ref();
const main = ref();

onMounted(() => {
  setToggleToFloater(true);
  watch(
    () => w.isShow,
    (v) => setToggleToFloater(v)
  );
});

function setToggleToFloater(v) {
  if (v)
    setTimeout(() => {
      toggleToFloater.value = v;
    }, TIMEOUT_TO_SHOW_FLOATER);
  else toggleToFloater.value = v;
}

const height = computed(
  () =>
    window.innerHeight - HEIGHT_TOLERANCE - (w.height ?? w.body.clientHeight)
);

function calculateAndSetMaxHeight() {
  dynamicMaxHeight.value = main.value?.clientHeight;
}
</script>

<template>
  <transition mode="out-in" appear>
    <AdWindowTop_ v-if="toggleToFloater && mustShowFloater" />

    <WindowUserGuide v-else class="mx-auto my-2" />
  </transition>
</template>
