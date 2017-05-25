// Import Vue
import Vue from 'vue'
import Vuex from 'vuex'
// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
// import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
// import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
/* OR for Material Theme:*/
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'

import VueResource from 'vue-resource'
// Import App Custom Styles
// import AppStyles from './assets/static/sass/main.scss'

// Import Routes
import Routes from './router/routes.js'

// Import App Component
import App from './app'
import VueSocketio from 'vue-socket.io'

import { store } from './store/index'

import { API_SERVER } from './api.js'
import VueMoment from 'vue-moment'

export const bus = new Vue();

// Init F7 Vue Plugin
Vue.use(Framework7Vue)
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueSocketio, API_SERVER);
Vue.use(VueMoment);

Vue.mixin({
  methods: {
    avatarUrl(user){
      if (typeof user.avatar === undefined){
        return API_SERVER + '/uploads/' + user.username + '/avatar/' + user.avatar.filename; 
      }
      return API_SERVER + '/default_avatar.jpg'
    }
  }
});

Vue.http.interceptors.push(function(request, next) {
    request.headers.set('Authorization', store.state.user.token);
    request.headers.set('Accept', 'application/json');
  
    next((response) => {
      if (response.status === 401){
        bus.$emit('unAuthorised');
      }
    })
})

// Init App
new Vue({
  el: '#app',
  store,
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    material: true,
    routes: Routes,
  },
  // Register App Component
  components: {
    app: App
  }
});
