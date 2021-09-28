<template>
  <div class="portfolio">
    <div v-for="project in projects"
         :key="project.id">
      <router-link
        :to="{ name: 'Project', params: {uid: project.uid } }"
        class="portfolio__link">
        <img :src="project.data.image.url.replace('?auto=compress,format&rect=0,0,3200,2000&w=768&h=480', '')"
             :alt="project.data.title[0].text + ' Screenshot Preview'"
             loading="lazy"
             :srcset="
              project.data.image.Small.url + '&q=100 ' +project.data.image.Small.dimensions.width + 'w, ' +
              project.data.image.Medium.url + '&q=100 ' +project.data.image.Medium.dimensions.width + 'w,' +
              project.data.image.url + '&q=100 ' + project.data.image.dimensions.width + 'w,' +
              project.data.image.url.replace('w=768&h=480', 'w=960&h=600') + '&q=100 ' + (project.data.image.dimensions.width + 192) + 'w'
             "
             :sizes="
              '(min-width: ' + project.data.image.Small.dimensions.width + 'px) ' + project.data.image.Small.dimensions.width + 'w,' +
              '(min-width: ' + project.data.image.Medium.dimensions.width + 'px) ' + project.data.image.Medium.dimensions.width + 'w,' +
              '(min-width: ' + project.data.image.dimensions.width + 'px) ' + project.data.image.dimensions.width + 'w,' +
              '(min-width: ' + (project.data.image.dimensions.width + 192) + 'px) ' + (project.data.image.dimensions.width + 192) + 'w'
             "
             :width="project.data.image.dimensions.width"
             :height="project.data.image.dimensions.height"/>
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
