import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faCamera, faPencilAlt, faTimes, faSave } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import { store } from './store';

library.add(faUserSecret)
library.add(faCamera)
library.add(faPencilAlt)
library.add(faTimes)
library.add(faSave)

createApp(App)
    .use(store)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
