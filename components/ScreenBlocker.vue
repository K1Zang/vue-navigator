<script setup></script>

<template>
  <transition>
    <div class="fixed top-0 left-0 right-0 w-[100vw] h-[100vh]">
      <slot />
      <!-- cover area -->
    </div>
  </transition>
</template>
