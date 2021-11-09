import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - organizer3',
    title: 'organizer3',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/v-calendar.js', ssr: false },
    { src: '~plugins/draggable.js', ssr: false },
    { src: '~/plugins/vue-resource.js', ssr: true },
    { src: '~/plugins/vuelidate.js', ssr: true },
    { src: '~/plugins/vue-picture-input.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://firebase.nuxtjs.org/guide/getting-started
    '@nuxtjs/firebase',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/login',
      home: '/dashboard',
    },
    strategies: {
      auth0: {
        domain: 'schimed.us.auth0.com',
        clientId: '6x8QEFtoDmpFSEJ0FNiYh51v5wlnlp46',
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyBYS7uWhmm1oDZowwZv0Ftu_cASKmxO-m4',
      authDomain: 'organizer-87011.firebaseapp.com',
      projectId: 'organizer-87011',
      storageBucket: 'organizer-87011.appspot.com',
      messagingSenderId: '720468172308',
      appId: '1:720468172308:web:494001d2747627546ed101',
      measurementId: 'G-6M759SD2XD',
    },
    services: {
      auth: true,
      storage: true,
      firestore: true,
    },
  },

  // auth: {
  //   persistence: 'local', // default
  //   initialize: {
  //     onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
  //     onAuthStateChangedAction: 'onAuthStateChangedAction',
  //     subscribeManually: false,
  //   },
  //   ssr: false, // default
  //   emulatorPort: 3000,
  //   emulatorHost: 'http://localhost',
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }
    },
  },
}
