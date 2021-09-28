<template>
  <div class="portfolio">
    <router-link v-for="project in projects"
                 :key="project.id"
                 :to="{ name: 'Project', params: {uid: project.uid } }"
                 class="portfolio__link">
      <div class="portfolio__link__title" v-if="project.data.title">{{ project.data.title[0].text }}</div>
      <div class="portfolio__link__clients">
        <span v-for="client in project.data.clients" :key="client.uid">
          {{ client.client.data.name }}
        </span>
      </div>
      <div class="portfolio__link__technologies">
        <technology-link v-for="technology in project.data.technologies"
                         :key="technology.id"
                         :technology="technology.technology"/>
      </div>
    </router-link>
  </div>
</template>

<script>
import Prismic from '@prismicio/client'
import TechnologyLink from '@/components/TechnologyLink'

export default {
  components: { TechnologyLink },
  data () {
    return {
      projects: []
    }
  },
  mounted () {
    this.$prismic.query(
      Prismic.Predicates.at('document.type', 'project'),
      { fetchLinks: ['client.name', 'technology.name', 'technology.link'] }
    ).then(response => {
      this.projects = response.results.sort((a, b) => a.first_publication_date < b.first_publication_date ? 1 : -1)
      console.log(this.projects[0])
    })
  }
}
</script>

<style lang="scss">
.portfolio {
  @apply grid place-items-center gap-6 p-6;

  &__link {
    @apply grid place-items-center text-center;

    &__title {
      @apply text-lg font-bold;
    }

    &__technologies {
      @apply flex flex-wrap justify-center items-center;
    }
  }
}
</style>
