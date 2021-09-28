<template>
  <div class="app">
    <site-header/>
    <main id="main" class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade-up">
          <component :is="Component"/>
        </transition>
      </router-view>
    </main>
    <footer class="footer">
      &copy;2012 - {{ new Date().getFullYear() }} Nick Frost
    </footer>
  </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader'

export default {
  components: { SiteHeader }
}
</script>

<style lang="scss">
.footer {
  @apply text-xs p-6 pb-24 text-center;
}

.fade-left-enter-active,
.fade-left-leave-active,
.fade-right-enter-active,
.fade-right-leave-active,
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.2s ease;
}

.fade-left-enter-from,
.fade-left-leave-to,
.fade-right-enter-from,
.fade-right-leave-to,
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
}

.fade-left-leave-to {
  transform: translateX(-2rem);
}

.fade-left-enter-from {
  transform: translateX(2rem);
}

.fade-right-leave-to {
  transform: translateX(2rem);
}

.fade-right-enter-from {
  transform: translateX(-2rem);
}

.fade-up-leave-to {
  transform: translateY(2rem);
}

.fade-up-enter-from {
  transform: translateY(2rem);
}
</style>
