<script setup>
const followings = res("/followings").indexRef();
</script>

<template>
  <section>
    <Navigator title="following" />

    <List>
      <InlineButton v-for="shop in followings">
        <ShopSmall :shop="shop" />

        <template #right>
          <ShopFollowButton :shop="shop" />
        </template>
      </InlineButton>
    </List>
  </section>
</template>
