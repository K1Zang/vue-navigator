<script setup>
const MIN_HASHTAG_COUNT = 6;
const hashtagRes = res("/hashtags");
const hashtags = hashtagRes.indexRef();

// function useTag(t) {
//   s.addTag(t);

//   hashtags.value = hashtags.value.filter((h) => h.tag !== t);

//   if (hashtags.value.length < MIN_HASHTAG_COUNT)
//     hashtagRes.more().then((r) => (hashtags.value = hashtags.value.concat(r)));
// }
</script>

<template>
  <SearchBarButtonBlur
    v-for="h in hashtags"
    no-translation
    no-capitalize
    :key="h.tag"
    :name="h.tag"
    icon="hashtag"
    @click="to('/hashtags/' + h.tag)"
  />
</template>
