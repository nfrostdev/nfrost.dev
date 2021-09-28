<template>
  <div class="portfolio">
    <div v-for="project in projects"
         :key="project.id"
         class="portfolio__project">
      <router-link
        :to="{ name: 'Project', params: {uid: project.uid } }">
        <project-image :image="project.data.image" :title="project.data.title[0].text"/>
      </router-link>
      <div class="portfolio__container">
        <router-link
          :to="{ name: 'Project', params: {uid: project.uid } }"
          class="portfolio__link">
          <div class="portfolio__link__title" v-if="project.data.title">{{ project.data.title[0].text }}</div>
          <div class="portfolio__link__client">
        <span v-for="client in project.data.clients" :key="client.uid" class="portfolio__client">
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
    })
  }
}
</script>

<style lang="scss">
.portfolio {
  @apply grid place-items-center gap-12 p-6 text-center max-w-5xl mx-auto;

  &__project {
    @apply flex flex-col justify-center items-center;
    @apply lg:flex-row-reverse lg:justify-start lg:items-start;
  }

  &__container {
    @apply grid text-center mt-3 w-80;
    @apply lg:text-right lg:place-items-end lg:mt-6 lg:mr-6;
  }

  &__link {
    @apply grid place-items-center;
    @apply lg:place-items-end;

    &__title {
      @apply text-lg font-bold;
      @apply lg:text-3xl;
    }

    &__client {
      @apply mb-2;
      @apply lg:text-lg;
    }

    &__technologies {
      @apply flex flex-wrap justify-center items-center;
      @apply lg:justify-end;
    }
  }
}
</style>
