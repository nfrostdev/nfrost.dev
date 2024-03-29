import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Prismic from '@prismicio/client'
import PrismicDOM from 'prismic-dom'
import './assets/main.scss'

const app = createApp(App)
  .use(router)
app.config.globalProperties.$prismic = Prismic.client('https://nfrost.prismic.io/api/v2', {})
app.config.globalProperties.$prismicDom = PrismicDOM
app.mount('#app')
