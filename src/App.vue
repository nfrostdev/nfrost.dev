<template>
  <div class="app">
    <site-header/>
    <main id="main" class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader.vue'

export default {
  components: { SiteHeader }
}
</script>

<style lang="scss">
.main {
  @apply pb-16;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 70ms ease;

  @media (prefers-reduced-motion) {
    transition: none;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(-4rem);
}

.fade-enter-from {
  transform: translateX(4rem);
}
</style>
