<template>
  <div class="portfolio">
    <router-link v-for="project in projects"
                 :key="project.uid"
                 :to="{ name: 'Project', params: {uid: project.uid } }"
                 class="portfolio__link">
      <div>{{ project.data.title[0].text }}</div>
    </router-link>
  </div>
</template>

<script>
import Prismic from '@prismicio/client'

export default {
  data () {
    return {
      projects: []
    }
  },
  mounted () {
    this.$prismic.query(
      Prismic.Predicates.at('document.type', 'project')
    ).then(response => {
      this.projects = response.results.sort((a, b) => a.first_publication_date < b.first_publication_date ? 1 : -1)
    })
  }
}
</script>

<style lang="scss">
.portfolio {
  @apply grid place-items-center;
}
</style>
