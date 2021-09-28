<template>
  <div class="portfolio">
    <div v-for="project in projects"
         :key="project.id">
      <router-link
        :to="{ name: 'Project', params: {uid: project.uid } }"
        class="portfolio__link">
        <project-image :image="project.data.image" :title="project.data.title[0].text"/>
      </router-link>
      <router-link
        :to="{ name: 'Project', params: {uid: project.uid } }"
        class="portfolio__link">
        <div class="portfolio__link__title" v-if="project.data.title">{{ project.data.title[0].text }}</div>
        <div class="portfolio__link__clients">
        <span v-for="client in project.data.clients" :key="client.uid">
          {{ client.client.data.name }}
        </span>
        </div>
      </router-link>

      <div class="portfolio__link__technologies">
        <technology-link v-for="technology in project.data.technologies"
                         :key="technology.id"
                         :technology="technology.technology"/>
      </div>
    </div>
  </div>
</template>

<script>
import Prismic from '@prismicio/client'
import TechnologyLink from '@/components/TechnologyLink'
import ProjectImage from '@/components/ProjectImage'

export default {
  components: {
    ProjectImage,
    TechnologyLink
  },
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
