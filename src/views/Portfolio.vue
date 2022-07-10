<template>
  <div v-if="projects.length" class="portfolio">
    <h1 class="sr-only">Portfolio</h1>
    <div v-for="project in projects"
         :key="project.id"
         class="portfolio__project">
      <router-link
          :to="{ name: 'Project', params: {uid: project.uid } }"
          class="portfolio__link--image">
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
import TechnologyLink from '@/components/TechnologyLink.vue'
import ProjectImage from '@/components/ProjectImage.vue'

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
        {
          fetchLinks:
              [
                'client.name',
                'technology.name',
                'technology.link',
                'technology.icon'
              ]
        }
    ).then(response => {
      this.projects = response.results.sort((a, b) => a.first_publication_date < b.first_publication_date ? 1 : -1)
      this.projects.forEach(project => {
        project.data.technologies.sort((a, b) => a.technology.data.name > b.technology.data.name ? 1 : -1)
      })
      setTimeout(() => {
        const title = 'Portfolio | Nick Frost'
        document.title = title
        document.querySelector('meta[property="og:title"]').setAttribute('content', title)
        document.querySelector('meta[property="twitter:title"]').setAttribute('content', title)

        const description = 'Explore the projects of Nick Frost, a Web Developer in Kalamazoo MI.'
        document.querySelector('meta[name="description"]').setAttribute('content', description)
        document.querySelector('meta[property="og:description"]').setAttribute('content', description)
        document.querySelector('meta[property="twitter:description"]').setAttribute('content', description)

        const image = 'https://www.nfrost.dev/nf.png'
        document.querySelector('meta[property="og:image"]').setAttribute('content', image)
        document.querySelector('meta[property="twitter:image"]').setAttribute('content', image)

        const location = 'https://www.nfrost.dev'
        document.querySelector('meta[property="og:url"]').setAttribute('content', location)
        document.querySelector('meta[property="twitter:url"]').setAttribute('content', location)
      }, 0)
    })
  }
}
</script>

<style lang="scss">
.portfolio {
  @apply grid place-items-center gap-12 p-6 text-center max-w-5xl mx-auto w-full;

  &__project {
    @apply flex flex-col justify-center items-center;
    @apply lg:flex-row-reverse lg:justify-start lg:items-start;
  }

  &__container {
    @apply grid text-center mt-3;
    @apply lg:text-right lg:place-items-end lg:mt-6 lg:mr-6 lg:w-96;
  }

  &__link {
    @apply grid place-items-center transition duration-200;
    @apply lg:place-items-end;

    &:hover, &:focus {
      @apply text-nf-blue;
    }

    &__title {
      @apply text-lg font-bold;
      @apply lg:text-3xl lg:pl-2;
    }

    &__client {
      @apply mb-2;
      @apply lg:text-xl;
    }

    &__technologies {
      @apply flex flex-wrap justify-center items-center;
      @apply lg:justify-end;
    }

    &--image {
      @apply filter brightness-95 transition-all duration-300;

      &:hover, &:focus {
        @apply brightness-100;
      }
    }
  }
}
</style>
