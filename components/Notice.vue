<script setup>
const props = defineProps({
  notice: Object,
});
</script>

<template>
  <Blur
    gray
    v-if="notice.seen().isShow"
    class="p-1 m-4 rounded-2xl overflow-hidden"
    style="z-index: 10000"
    @click="notice.hide()"
  >
    <P class="m-4">
      {{ __c(notice.message) }}
    </P>

    <div
      v-if="notice.buttons?.length"
      class="p-1 px-2 gap-2 flex items-center justify-end"
    >
      <Button
        blue
        v-for="b in notice.buttons"
        :click-once="b.handle"
        :name="b.name"
      />
    </div>
  </Blur>
</template>
