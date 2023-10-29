<script setup></script>

<template>
  <div>
    <client-only>
      <TheHeader />
    </client-only>

    <slot />

    <client-only>
      <TheFooter />
    </client-only>
  </div>
</template>
