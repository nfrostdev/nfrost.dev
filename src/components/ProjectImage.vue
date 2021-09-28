<template>
  <img :src="image.url.replace('?auto=compress,format&rect=0,0,3200,2000&w=768&h=480', '')"
       :alt="title + ' Screenshot'"
       loading="lazy"
       :srcset="
              image.Small.url + '&q=100 ' +image.Small.dimensions.width + 'w, ' +
              image.Medium.url + '&q=100 ' +image.Medium.dimensions.width + 'w,' +
              image.url + '&q=100 ' + image.dimensions.width + 'w,' +
              image.url.replace('w=768&h=480', 'w=960&h=600') + '&q=100 ' + (image.dimensions.width + 192) + 'w'
             "
       :sizes="
              '(min-width: ' + image.Small.dimensions.width + 'px) ' + image.Small.dimensions.width + 'w,' +
              '(min-width: ' + image.Medium.dimensions.width + 'px) ' + image.Medium.dimensions.width + 'w,' +
              '(min-width: ' + image.dimensions.width + 'px) ' + image.dimensions.width + 'w,' +
              '(min-width: ' + (image.dimensions.width + 192) + 'px) ' + (image.dimensions.width + 192) + 'w'
             "
       :width="image.dimensions.width"
       :height="image.dimensions.height"/>
</template>

<script>
export default {
  props: {
    image: Object,
    title: String
  }
}
</script>
