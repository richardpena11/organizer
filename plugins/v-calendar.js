import Vue from 'vue'
import Vcalendar from 'v-calendar'

Vue.use(Vcalendar, {
  screens: {
    tablet: '700px',
    laptop: '1000px',
    desktop: '1350px',
  },
})
