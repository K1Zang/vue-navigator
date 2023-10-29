<script setup>
const s = useSearchStore();
</script>

<template>
  <Strip scroll class="-mt-1">
    <div class="text-white flex flex-row shrink-0">
      <SearchBarButtonBlur
        white
        v-show="s.hasFilter"
        name="clear all"
        icon="trash"
        @click="s.resetFilters()"
      />

      <SearchBarButtonBlur
        white
        no-translation
        v-for="t in s.filters.tags"
        :name="t"
        @click="s.removeTag(t)"
      />
    </div>
  </Strip>
</template>
