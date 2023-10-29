<script setup>
const props = defineProps({
  option: Object,
});
</script>

<template>
  <Loading :the="app()?.hasLoaded">
    <!--navigator trigger-->
    <Button
      center
      class="w-12 h-8"
      v-if="option.isNavigator"
      @click="useNavigator(option.uri).trigger()"
    >
      <Icon :name="option.icon" :solid="useNavigator(option.uri).isActive" />
    </Button>

    <!--explorer trigger-->
    <Button
      center
      class="w-12 h-8"
      v-else-if="option.isNavigator !== undefined"
      @click="useExplorer(option.uri).trigger(option.uri)"
    >
      <Icon
        :name="option.icon"
        :solid="useExplorer(option.uri).window.isShow"
      />
    </Button>
  </Loading>
</template>
