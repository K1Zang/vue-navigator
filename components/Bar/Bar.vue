<script setup>
const bar = useBarStore();

const a = app();
</script>

<template>
  <section :class="bar.mustShow ? 'mt-12' : ''">
    <div class="fixed bottom-0 left-0 right-0 max-w-[50rem] mx-auto z-20">
      <div id="windows" class="mb-1">
        <client-only>
          <!-- <transition-group name="window-slide" appear> -->
          <ExplorerMaterial
            v-for="explorer in a.explorers"
            :key="'explorer_' + explorer.id"
            :id="explorer.id"
          />
          <!-- </transition-group> -->
        </client-only>
      </div>

      <div id="bar" class="bottom-10"></div>

      <transition name="window-slide" mode="out-in">
        <Blur class="p-1 py-2" v-if="a.hasLoaded" v-show="bar.mustShow">
          <nav class="flex gap-8 place-content-around items-center">
            <BarOption
              v-for="option in bar.options ?? [{}, {}, {}, {}]"
              :key="option.icon"
              :option="option"
            />
          </nav>

          <SafeAreaInsetBottom />
        </Blur>
      </transition>
    </div>
  </section>
</template>
