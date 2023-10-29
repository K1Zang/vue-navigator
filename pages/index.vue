<script>
export default {
  // name: 'index',
  // inheritAttrs: false,
  // customOptions: {}
};
</script>

<script setup>
const TIME_TO_LOAD_HUNK = 300;
// definePageMeta({
//   key: route => route.fullPath,
// })

const postsResource = useResource("/posts");
const posts = ref([]);

function loadMore() {
  postsResource
    .more({
      quantity: POST_CHUNK_COUNT_SMALL,
      from: posts.value.length,
    })
    .then((r) => (posts.value = posts.value.concat(r)));
}

// download posts carefully
setTimeout(loadMore, TIME_TO_LOAD_HUNK);
onMounted(() => {
  setTimeout(loadMore, TIME_TO_LOAD_HUNK * 2);
  setTimeout(loadMore, TIME_TO_LOAD_HUNK * 6);
});
</script>

<template>
  <section>
    <InfiniteLoop @ending="loadMore()">
      <Post3Col :posts="posts.length ? posts : Array(18).fill({})" />
    </InfiniteLoop>

    <client-only>
      <BarTop :belongs-to="LANDING_PAGE">
        <TheSearchBar />
      </BarTop>
    </client-only>
  </section>
</template>
