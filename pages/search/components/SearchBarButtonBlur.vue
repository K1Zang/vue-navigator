<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
const props = defineProps({
  icon: String,
  select: Boolean,
});
</script>

<template>
  <transition appear>
    <Blur neutral class="rounded-full mr-1">
      <Button
        :class="
          'p-2 rounded-full' +
          (select ? ' text-white bg-black dark:text-black dark:bg-white' : '')
        "
        v-bind="$attrs"
      >
        <template #icon>
          <Icon
            v-if="icon"
            :color="select ? 'stroke-white  dark:stroke-black ' : undefined"
            :name="icon"
            small
            class="mr-1"
          />
        </template>
      </Button>
    </Blur>
  </transition>
</template>
