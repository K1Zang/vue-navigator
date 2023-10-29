<script setup>
const props = defineProps({
  title: String,
  icon: String,
  next: { type: String, default: "next" },
  to: String,
  noCapitalize: Boolean,
});
</script>

<template>
  <Heading disable-auto-hide class="z-30">
    <Button no-p @click="back()">
      <Icon name="chevron-left" />
    </Button>

    <H
      :class="'text-lg font-semibold' + (noCapitalize ? '' : ' capitalize')"
      id="navigator_center_slot"
      :text="title"
    >
      <slot name="center" />
    </H>

    <div class="min-w-[2rem]" id="navigator_right_slot">
      <slot>
        <Button
          blue
          v-if="to"
          @click="to === 'root' ? nav().toRoot() : nav().to(to)"
          :name="next"
        />
      </slot>
    </div>
  </Heading>
</template>
