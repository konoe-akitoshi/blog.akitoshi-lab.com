import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAward, faTags } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {
  library.add(faAward, faTags, faClock)
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
