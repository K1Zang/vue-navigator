<script setup>
const s = useSearchStore();

const hashtags = computed(() => s.result.hashtags);

function select(tag) {
  to("/hashtags/" + tag);
  s.addInputValueToHistory();
}
</script>

<template>
  <div class="my-9">
    <!-- flex flex-col-reverse -->
    <InlineButton v-for="h in hashtags" @click="select(h.tag)">
      <Hashtag :tag="h.tag" />

      <template #right>
        <Abbreviation :number="h.count" />
      </template>
    </InlineButton>

    <LoadingResource
      :the="hashtags"
      small
      class="absolute inset-0 m-auto"
      message="no hashtags where found by this name."
    >
      `{{ s.value }}`
    </LoadingResource>
  </div>
</template>
