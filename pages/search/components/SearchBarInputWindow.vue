<script setup>
const search = useSearchStore();

watch(() => search.value, search.for);
</script>

<template>
  <Window :id="search.window.id">
    <template #trigger>
      <Button
        v-show="false"
        :gray="search.window.isShow"
        name="search"
        icon="magnifying-glass"
      />
    </template>

    <!-- history -->
    <List v-if="!search.hasResultToShow && !search.inputNotEmpty">
      <SearchBarInputWindowHistoryButton
        v-for="string in search.history"
        :name="string"
      />

      <LoadingResource
        small
        icon="clock"
        :the="search.history"
        message="history is empty"
      />
    </List>

    <!-- search.result -->
    <Tabs
      v-else
      upside-down
      :height="search.window.height"
      :tabs="{
        hashtags: '/search/_hashtags',
        shops: '/search/_shops',
      }"
    />
  </Window>
</template>
