<template>
  <div class="project__attribute" v-if="attributes.length">
    <div class="project__attribute__title">{{ attributes.length > 1 ? plural : title }}</div>
    <div class="project__attribute__values">
      <span v-for="(attribute, index) in attributes" :key="attribute[type].id">
        <span v-if="type === 'client' || type === 'language'">
          <span>{{ attribute[type].data.name }}</span>
          <span v-if="index !== attributes.length - 1">, </span>
        </span>
        <a v-if="type === 'contributor'" :href="attribute[type].data.link.url" target="_blank" rel="noopener">
          {{ attribute[type].data.name }}
        </a>
        <technology-link v-if="type === 'technology'" :technology="attribute[type]"/>
      </span>
    </div>
  </div>
</template>

<script>
import TechnologyLink from '@/components/TechnologyLink'

export default {
  components: { TechnologyLink },
  props: {
    title: String,
    plural: String,
    attributes: Array,
    type: String
  }
}
</script>

<style lang="scss">
.project__attribute {
  &__title {
    @apply font-bold mt-4 mb-1;
  }
}
</style>
