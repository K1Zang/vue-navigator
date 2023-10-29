<script setup></script>
<template>
  <Heading>
    <Logo :size="2" />

    <div class="grid grid-cols-2 gap-1">
      <!-- <Button>
        <Icon name="envelope" class="col-span-1" />
      </Button> -->

      <Button @click="to('/cart')">
        <Icon name="shopping-cart" class="col-span-1" />
      </Button>
      <HomeMenuButton />
    </div>
    <!-- dark:mix-blend-difference  -->
  </Heading>
</template>
