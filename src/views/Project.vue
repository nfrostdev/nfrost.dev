<template>
  <div class="project">
    <h1>This is a Project page.</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
          'technology.name'
        ]
      }).then(response => {
      console.log(response.data)
      this.project = response.data
    })
  }
}
</script>
