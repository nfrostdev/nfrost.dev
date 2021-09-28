<template>
  <a :href="technology.data.link.url"
     target="_blank"
     rel="noopener"
     class="technology-link">{{ technology.data.name }}</a>
</template>

<script>
export default {
  props: {
    technology: Object
  }
}
</script>

<style lang="scss">
.technology-link {
  @apply bg-white shadow-sm rounded-sm px-2 py-1 text-sm m-1 transition duration-200;

  &:hover, &:focus {
    @apply bg-nf-blue text-white;
  }
}
</style>
