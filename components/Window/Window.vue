<script setup>
const props = defineProps({
  id: String | Number,
  icon: String,
});

const window = useWindow(props.id);
</script>

<template>
  <div>
    <WindowMaterial v-bind="$attrs" :window="window">
      <slot />

      <WindowFooter v-if="$slots.footer" :window="window">
        <slot name="footer" />
      </WindowFooter>
    </WindowMaterial>

    <div @click="window.toggleShow()">
      <slot name="trigger">
        <transition>
          <Button v-if="icon" :gray="window.isShow">
            <Icon :name="icon" />
          </Button>
        </transition>
      </slot>
    </div>
  </div>
</template>
