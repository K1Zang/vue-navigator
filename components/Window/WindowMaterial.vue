<script setup>
const emit = defineEmits(["open", "close"]);

const props = defineProps({
  window: {
    required: true,
    type: Object,
  },
});

provide("window", props.window);

function close() {
  [emit("close"), props.window.close()];
}
function mustOpen() {
  emit("open");
  return props.window.open().isOpen;
}
</script>

<template>
  <client-only>
    <teleport to="#windows">
      <transition :name="window.hasTransition ? 'window-slide' : 'none'">
        <section
          v-if="mustOpen()"
          :id="window.id"
          :class="'m-2 transition bg-' + window.color + '/20 rounded-[2.6rem]'"
        >
          <!-- <ScreenBlocker v-show="window.isShow && window.isAutoHide" @click="window.onClickAway()" /> -->
          <ScreenBlocker
            v-show="window.isShow"
            @click="window.onClickAway()"
            class="bg-white/50 dark:bg-black/50"
          />

          <transition :name="window.hasTransition ? 'window-slide' : 'none'">
            <div v-show="window.isShow">
              <WindowMaterialFloatingTop />

              <WindowMaterialShell>
                <WindowMaterialKnob :close="close" />

                <WindowMaterialBody class="pt-8">
                  <slot />
                </WindowMaterialBody>
              </WindowMaterialShell>
            </div>
          </transition>
        </section>
      </transition>
    </teleport>
  </client-only>
</template>

<style>
.window-slide-move,
.window-slide-enter-active,
.window-slide-leave-active {
  transition: translate 0.3s ease;
}

.window-slide-enter-from,
.window-slide-leave-to {
  translate: 0 200%;
}
</style>
