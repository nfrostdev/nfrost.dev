<template>
  <div class="project__body__column">
    <h2 class="project__body__column__h2">{{ title }}</h2>
    <div v-html="$prismicDom.RichText.asHtml(content)"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: Object
  }
}
</script>

<style lang="scss">
.project__body__column {
  &__h2 {
    @apply text-xl font-bold mt-6;
  }

  p {
    & + p {
      @apply mt-4;
    }
  }
}
</style>
