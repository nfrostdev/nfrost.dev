<template>
  <div v-if="project" class="project">
    <div class="project__info">
      <div class="project__info__container">
        <project-image :image="project.image"/>
      </div>
      <div class="project__container">
        <div v-html="$prismicDom.RichText.asHtml(project.title)"></div>
        <project-attribute type="location"
                           title="Location"
                           :attributes="project.location"/>
        <project-attribute type="client"
                           title="Client"
                           plural="Clients"
                           :attributes="project.clients"/>
        <project-attribute type="contributor"
                           title="Contributor"
                           plural="Contributors"
                           :attributes="project.contributors"/>
        <project-attribute type="language"
                           title="Language"
                           plural="Languages"
                           :attributes="project.languages"/>
        <project-attribute type="technology"
                           title="Technology"
                           plural="Technologies"
                           :attributes="project.technologies"/>
      </div>
    </div>
    <div class="project__body">
      <project-body-column title="Details" :content="project.details"/>
      <project-body-column title="Contributions" :content="project.contributions"/>
      <project-body-column title="Obstacles" :content="project.obstacles"/>
    </div>
  </div>
</template>

<script>
import ProjectAttribute from '@/components/ProjectAttribute.vue'
import ProjectImage from '@/components/ProjectImage.vue'
import ProjectBodyColumn from '@/components/ProjectBodyColumn.vue'

export default {
  components: {
    ProjectBodyColumn,
    ProjectImage,
    ProjectAttribute
  },
  data() {
    return {
      project: null
    }
  },
  mounted() {
    this.$prismic.getByUID('project', this.$route.params.uid.toString(),
        {
          fetchLinks: [
            'client.name',
            'contributor.name',
            'contributor.link',
            'language.name',
            'technology.name',
            'technology.link',
            'technology.icon'
          ]
        }).then(response => {
      this.project = response.data
      this.project.technologies.sort((a, b) => a.technology.data.name > b.technology.data.name ? 1 : -1)
      this.project.languages.sort((a, b) => a.language.data.name > b.language.data.name ? 1 : -1)

      const title = this.$prismicDom.RichText.asText(this.project.title) + ' | Nick Frost'
      document.title = title
      document.querySelector('meta[property="og:title"]').setAttribute('content', title)
      document.querySelector('meta[property="twitter:title"]').setAttribute('content', title)

      const description = this.$prismicDom.RichText.asText(this.project.details)
      document.querySelector('meta[name="description"]').setAttribute('content', description)
      document.querySelector('meta[property="og:description"]').setAttribute('content', description)
      document.querySelector('meta[property="twitter:description"]').setAttribute('content', description)

      const image = this.project.image.url.replace('?auto=compress,format&rect=0,0,3200,2000&w=768&h=480', '')
      document.querySelector('meta[property="og:image"]').setAttribute('content', image)
      document.querySelector('meta[property="twitter:image"]').setAttribute('content', image)

      const location = 'https://www.nfrost.dev' + this.$route.fullPath
      document.querySelector('meta[property="og:url"]').setAttribute('content', location)
      document.querySelector('meta[property="twitter:url"]').setAttribute('content', location)
    })
  }
}
</script>

<style lang="scss">
.project {
  @apply p-6 max-w-6xl mx-auto;

  h1 {
    @apply text-xl font-bold mt-4;
    @apply lg:text-3xl;
  }

  &__info {
    @apply flex flex-col mb-4;
    @apply lg:flex-row-reverse lg:justify-between;
  }

  &__container {
    @apply lg:w-80 lg:mr-6;
  }

  &__body {
    @apply lg:grid lg:grid-cols-3 lg:gap-6;
  }
}
</style>
