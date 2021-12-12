/// vue files
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

/// scss
import './assets/styles/main.scss';

/// library's
import locale from 'element-ui/lib/locale/lang/en';
import ElementUI from 'element-ui';
import * as VueGoogleMaps from 'vue2-google-maps';
import vClickOutside from 'v-click-outside';

///font awesome
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faJs, faVuejs, fab, far } from '@fortawesome/free-brands-svg-icons';
// ES6 Modules or TypeScript
// import Swal from 'sweetalert2'

// CommonJS
// const Swal = require('sweetalert2')
// Vue.use(VueSweetalert2);
import swal from 'sweetalert2';
window.Swal = swal;
// import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss';

// library.add(fas, faJs, faVuejs, fab, far);

// Vue.component('font-awesome-icon', FontAwesomeIcon);
/////
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fab, fas, far);

Vue.component('font-awesome-icon', FontAwesomeIcon);

///
Vue.config.productionTip = false;
Vue.use(vClickOutside);
Vue.use(ElementUI, { locale });
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAiwks8bz483lqJ9B_71_Q0LqoN6LKT5LE',
    libraries: 'places',
    load: {
      region: 'IL',
      language: 'En',
    },
  },
}),
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');

document.addEventListener('DOMContentLoaded', function () {
  const selector = '.nav_user';
  const elems = Array.from(document.querySelectorAll(selector));
  console.log('elems', elems);
  const navigation = document.querySelector('nav');
  console.log('navigation', navigation);

  function makeActive(evt) {
    const target = evt.target;

    if (!target || !target.matches(selector)) {
      return;
    }

    elems.forEach((elem) => elem.classList.remove('active'));

    evt.target.classList.add('active');
  }

  navigation.addEventListener('mousedown', makeActive);
});
