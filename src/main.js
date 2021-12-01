import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import locale from 'element-ui/lib/locale/lang/en';
import ElementUI from 'element-ui';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'

// library.add(faFontAwesome)


import './assets/styles/main.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
