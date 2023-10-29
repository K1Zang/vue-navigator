<script setup>
const SCROLL_TO_CLOSE_REM = 10;
const search = useSearchStore();
const mustCloseInput = ref(false);
let scrollTracker;

watch(() => search.value, search.for);

function startTyping() {
  search.rawStartTyping();
  document.addEventListener("scroll", autoCloseIfScrolling);
}

function doneTyping() {
  search.rawDoneTyping();
  document.removeEventListener("scroll", autoCloseIfScrolling);
  scrollTracker = null;
}

const autoCloseIfScrolling = debounce(() => {
  scrollTracker ??= window.scrollY;

  if (remToPx(SCROLL_TO_CLOSE_REM) - (scrollTracker - window.scrollY) < 0)
    manuallyCloseInput();
});

function manuallyCloseInput() {
  mustCloseInput.value = true; // force close input by deleting it
  setTimeout(() => (mustCloseInput.value = false), 1);
  doneTyping();
}

function closeEverything() {
  doneTyping();
  search.value = "";
  search.window.hide();
}
</script>

<template>
  <div :class="search.isTyping ? ' w-full ' : ''">
    <ScreenBlocker
      @click="doneTyping"
      v-show="search.isTyping && !search.window.isShow"
    />

    <SearchBarInputWindow />

    <div
      class="h-12 flex items-center relative shrink-0"
      :style="`height: ${STRIP_HEIGHT_REM}rem;`"
    >
      <div class="w-full">
        <Button
          v-show="!search.isTyping || !search.value?.length"
          name="search"
          :icon="search.isTyping ? '' : 'magnifying-glass'"
        />
      </div>

      <div class="flex items-center">
        <Input
          v-if="!mustCloseInput"
          v-model="search.value"
          @click="startTyping"
          @focus="startTyping"
          @focusin="startTyping"
          @focusout="doneTyping"
          @blur="doneTyping"
          @change="doneTyping"
          @keyup.enter="doneTyping"
          no-p
          :class="
            'py-4 px-1 w-full h-full m-auto absolute inset-0 bg-transparent ' +
            (search.isTyping ? '' : ' text-transparent')
          "
        />

        <transition name="slide">
          <Button
            center
            no-p
            class="rounded-full z-10"
            @click="closeEverything"
            v-show="search.isTyping"
          >
            <Icon name="x-mark" />
          </Button>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter-from {
  translate: -100;
  opacity: 0;
}

.slide-leave-to {
  translate: -20vw;
  opacity: 0;
}
</style>
