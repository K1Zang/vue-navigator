<script setup>
const props = defineProps({
  module: Object,
  componentProps: Object,
  keepAlive: Array,
  transition: String | null,
});
</script>

<template>
  <Loading :the="module">
    <keep-alive :include="keepAlive" :max="10">
      <transition :name="transition" mode="out-in">
        <suspense>
          <component
            v-if="module"
            :key="
              module.isDisposable ? `${module.id}.${Math.random()}` : module.id
            "
            :is="module.Component"
            v-bind="componentProps"
          />

          <template #fallback>
            <AsyncLoading class="m-16" />
          </template>
        </suspense>
      </transition>
    </keep-alive>
  </Loading>
</template>
