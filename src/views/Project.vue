<template>
  <div class="project" v-if="loaded">
    <div class="project__info">
      <project-image :image="project.image"/>
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
import ProjectAttribute from '@/components/ProjectAttribute'
import ProjectImage from '@/components/ProjectImage'
import ProjectBodyColumn from '@/components/ProjectBodyColumn'

export default {
  components: {
    ProjectBodyColumn,
    ProjectImage,
    ProjectAttribute
  },
  data () {
    return {
      loaded: false,
      project: null
    }
  },
  mounted () {
    this.$prismic.getByUID('project', this.$route.params.uid.toString(),
      {
        fetchLinks: [
          'client.name',
          'contributor.name',
          'contributor.link',
          'language.name',
          'technology.name',
          'technology.link'
        ]
      }).then(response => {
      console.log(response.data)
      this.project = response.data
      this.loaded = true
    })
  }
}
</script>

<style lang="scss">
.project {
  @apply p-6 max-w-5xl mx-auto;

  h1 {
    @apply text-xl font-bold mt-4;
    @apply lg:text-3xl;
  }

  &__info {
    @apply flex flex-col;
  }
}
</style>
