<template>
  <a :href="technology.data.link.url"
     target="_blank"
     rel="noopener"
     class="technology-link">
    <img v-if="technology.data.icon"
         :src="technology.data.icon.url"
         :alt="technology.data.icon.alt"
         class="technology-link__icon"
         width="16" height="16" loading="lazy"/>
    <span>{{ technology.data.name }}</span>
  </a>
</template>

<script>
export default {
  props: {
    technology: Object
  },
  mounted () {
    console.log(this.technology)
  }
}
</script>

<style lang="scss">
.technology-link {
  @apply inline-flex justify-center items-center bg-white shadow-sm rounded-sm px-2 py-1 text-sm m-1 transition duration-200;

  &:hover, &:focus {
    @apply bg-blue-50;
  }

  &__icon {
    @apply mr-1 h-4;
  }
}
</style>
