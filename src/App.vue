<template>
  <div class="app">
    <site-header/>
    <main id="main" class="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader'

export default {
  components: { SiteHeader }
}
</script>
