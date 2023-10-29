<script setup></script>

<template>
  <Window id="home-menu" icon="bars-2">
    <List title="home">
      <WindowButton
        name="settings"
        icon="cog-6-tooth"
        @click="to('/settings')"
        description="setting options mostly related to personal account and not the shop, personalize and manage your account."
      />
      <Line light class="my-2" />

      <WindowButton
        name="wallet"
        icon="wallet"
        @click="to('/wallet')"
        description="all personal purchases and transactions are stored in personal wallet including balance and credits."
      />
      <Line light class="my-2" />

      <WindowButton
        name="favorites"
        icon="bookmark"
        description="categorize and group favorite items across the platform so can be found easily later, no matter is a post or supply or an auction!"
      />
      <WindowButton
        name="following"
        icon="radio"
        @click="to('/home/following')"
        description="follow the shops to not miss any updates and keep track of any new product and opportunity."
      >
        <template #right> <P text="0" class="m-2" /> </template>
      </WindowButton>
    </List>
  </Window>
</template>
