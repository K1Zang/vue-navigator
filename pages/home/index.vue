<script setup>
const AD_COUNT_PER_POST = 5;
const AD_START_AFTER = 5;

definePageMeta({ key: (route) => route.fullPath });

const posts = ref([]);

const postsResource = useResource("/posts");

function loadMore() {
  postsResource
    .more({
      quantity: POST_CHUNK_COUNT_LARGE,
      from: posts.value.length,
    })
    .then((r) => (posts.value = posts.value.concat(r)));
}

loadMore();
</script>

<template>
  <section class="h-full">
    <HomeHeader />

    <InfiniteLoop @ending="loadMore()">
      <template
        v-for="(post, i) in posts.length ? posts : Array(5).fill({})"
        :key="'home_post_' + post.id"
      >
        <PostLarge :post="post" class="mb-12" />

        <AdHome_
          v-if="i >= AD_START_AFTER && !(i % AD_COUNT_PER_POST)"
          class="mb-12 m-8"
        />
      </template>
    </InfiniteLoop>
  </section>
</template>
