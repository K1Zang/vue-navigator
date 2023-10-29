<script setup>
const props = defineProps({
  explorer: {
    required: true,
    type: Object,
  },
});

const hasBack = computed(() => props.explorer.isNotBeginning);
const hasNext = computed(() => props.explorer.isNotEnd);
const hasHistory = computed(() => props.explorer.history.length > 1);
</script>

<template>
  <div>
    <slot />

    <WindowFooter
      v-if="
        explorer?.window &&
        (hasHistory || $slots.footer || $slots['window-footer'])
      "
      :no-spacing="Boolean($slots['window-footer'])"
      :window="explorer.window"
    >
      <slot name="window-footer">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <template v-if="hasHistory">
              <Button
                quiet
                name="back"
                :disabled="!hasBack"
                @click="explorer.backward()"
              />
              <Button
                quiet
                name="next"
                v-show="hasNext"
                :disabled="!hasNext"
                @click="explorer.forward()"
              />
            </template>
          </div>

          <div class="w-full flex gap-2 justify-end">
            <slot name="footer" />
          </div>
        </div>
      </slot>
    </WindowFooter>
  </div>
</template>
