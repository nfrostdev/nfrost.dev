<template>
  <div class="project__attribute" v-if="attributes.length">
    <div class="project__attribute__title">{{ attributes.length > 1 ? plural : title }}</div>
    <div class="project__attribute__values">
      <span v-for="(attribute, index) in attributes" :key="attribute[type].id">
        <span v-if="type === 'client' || type === 'language'">
          <span>{{ attribute[type].data.name }}</span>
          <span v-if="index !== attributes.length - 1">, </span>
        </span>
        <span v-if="type === 'contributor'">
          <a v-if="attribute[type].data.link" :href="attribute[type].data.link.url"
             target="_blank"
             rel="noopener"
             class="project__attribute__link">{{ attribute[type].data.name }}</a>
          <span v-else>{{ attribute[type].data.name }}</span>
          <span v-if="index !== attributes.length - 1">, </span>
        </span>
        <technology-link v-if="type === 'technology'" :technology="attribute[type]"/>
      </span>
    </div>
  </div>
  <div v-if="type === 'location' && attributes.url">
    <div class="project__attribute__title">{{ title }}</div>
    <a :href="attributes.url" class="project__attribute__link"
       target="_blank"
       rel="noopener">{{ attributes.url }}</a>
  </div>
</template>

<script>
import TechnologyLink from '@/components/TechnologyLink.vue'

export default {
  components: { TechnologyLink },
  props: {
    title: String,
    plural: String,
    attributes: null,
    type: String
  }
}
</script>

<style lang="scss">
.project__attribute {
  &__title {
    @apply font-bold mt-4;
  }

  &__link {
    @apply text-nf-blue underline font-semibold;
  }
}
</style>
