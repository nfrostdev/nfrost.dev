const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const Prismic = require('@prismicio/client')

const routes = ['/']

function getPrismicProjectPages (page) {
  Prismic.client('https://nfrost.prismic.io/api/v2', {}).getApi().then(api => {
    api.query(
      Prismic.Predicates.at('document.type', 'project'),
      {
        page: page,
        pageSize: 100
      }
    ).then(response => {
      response.results.forEach(page => {
        routes.push('/' + page.uid)
      })
      if (response.next_page) {
        getPrismicProjectPages(page + 1)
      }
    })
  })
}

getPrismicProjectPages(1)

module.exports = {
  pluginOptions: {
    sitemap: {
      urls: routes,
      baseURL: 'https://www.nfrost.dev',
      productionOnly: true,
      trailingSlash: true
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      optimization: {
        minimize: true
      },
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          outputDir: path.join(__dirname, 'dist'),
          indexPath: path.join(__dirname, 'dist', 'index.html'),
          routes: routes,
          postProcess (renderedRoute) {
            // Ignore any redirects.
            renderedRoute.route = renderedRoute.originalRoute
            // Basic whitespace removal. (Don't use this in production.)
            renderedRoute.html = renderedRoute.html.split(/>[\s]+</gmi).join('><')
            // Remove /index.html from the output path if the dir name ends with a .html file extension.
            // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
            if (renderedRoute.route.endsWith('.html')) {
              renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)
            }

            return renderedRoute
          },
          minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true
          },
          renderer: new Renderer({
            renderAfterTime: 2000,
            headless: true
          })
        })
      ]
    }
  }
}
