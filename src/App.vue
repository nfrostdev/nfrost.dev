<template>
  <div class="app">
    <site-header/>
    <router-view/>
  </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader'

export default {
  components: { SiteHeader }
}
</script>
