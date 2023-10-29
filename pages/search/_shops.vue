<script setup>
const s = useSearchStore();

function select(unique_name) {
  s.addInputValueToHistory();
  to("/shops/" + unique_name);
}
</script>

<template>
  <div class="my-9">
    <InlineButton
      v-for="shop in s.result.shops"
      @click="select(shop.unique_name)"
    >
      <ShopSmall :shop="shop" />
    </InlineButton>

    <LoadingResource
      :the="s.result.shops"
      small
      class="absolute inset-0 m-auto"
      message="no shops where found by this unique name."
    >
      `{{ s.value }}`
    </LoadingResource>
  </div>
</template>
