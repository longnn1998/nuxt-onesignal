export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/onesignal'],

  oneSignal: {
    init: {
      appId: '2a2eef8e-f327-418b-baa4-7ed5c41c3cc3',
      allowLocalhostAsSecureOrigin: false,
      welcomeNotification: {
          disable: false
      }
    }
  },

  pwa: {
    meta: {
      title: 'Nuxt Onesignal PWA',
      author: 'LongNN',
    },
    manifest: {
      name: 'Nuxt Onesignal PWA',
      short_name: 'NUXT PWA',
      lang: 'en',
      display: 'standalone',
      icons: [
        {
          src: './static/favicon.ico',
          sizes: '196x196',
          type: 'image/x-icon',
          purpose: 'any maskable',
        },
      ],
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
