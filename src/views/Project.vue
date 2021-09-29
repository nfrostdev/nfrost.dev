<template>
  <div class="project" v-if="loaded">
    <div class="project__container">
      <div v-html="$prismicDom.RichText.asHtml(project.title)"></div>
    </div>
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
</template>

<script>
import ProjectAttribute from '@/components/ProjectAttribute'

export default {
  components: { ProjectAttribute },
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
}

h1 {
  @apply text-2xl font-bold;
}
</style>
