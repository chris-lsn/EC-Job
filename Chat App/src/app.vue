<template>
    <div id="app">
    <f7-statusbar></f7-statusbar>
    <f7-views>
      <f7-view navbar-fixed main>

      </f7-view>
      <f7-panel left cover v-if="isLogined && $theme.material" style="box-shadow: none;overflow: visible;">
        <div class="list-block">
          <ul>
            <li>
              <a href="#" class="item-content" @click="switchTab('/conversations/')">
                <div class="item-media">
                  <i class="fa fa-comments-o"></i>
                </div>
                <div class="item-inner close-panel">
                  <div class="item-title label">Chats</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="item-content" @click="switchTab('/projects/')">
                <div class="item-media">
                  <i class="fa fa-folder-o"></i>
                </div>
                <div class="item-inner close-panel">
                  <div class="item-title label">My Projects</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="item-content" @click="switchTab('/setting/')">
                <div class="item-media">
                  <i class="fa fa-sliders"></i>
                </div>
                <div class="item-inner close-panel">
                  <div class="item-title label">Setting</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </f7-panel>
    </f7-views>
    </div>
</template>

<script>
import { API_SERVER } from './api.js'
import { bus } from './main'
import toolBar from './components/toolBar.vue'

export default {
    computed: {
      isLogined(){
        return this.$store.getters.isLogined;
      },
      currentUser(){
        return this.$store.state.user.currentUser;
      }
    },
    methods: {
      onF7Init(){
        if (!this.isLogined){
          return this.$f7.mainView.router.load({url: '/login/', animatePages: false});
        }
        this.$f7.mainView.router.load({url: '/conversations/', animatePages: false});
      },
      switchTab(url){
        this.$router.load({url: url, animatePages: false});
      }
    },
    created(){
      bus.$on('unAuthorised', ()=> {
        this.$f7.alert("Access Token Expried, Please login again", "UnAuthorised", ()=>{
          this.$f7.mainView.router.load({url: '/login', animatePages: false, reload: true});
        });
        this.$store.dispatch('logout');
      });

      this.$socket.emit('initialize', this.currentUser._id);

      document.addEventListener('deviceready', () => {
          bus.$on('alertNewMessage', (payload)=> {
            cordova.plugins.notification.local.schedule({
                id: payload.id,
                title: payload.targetFullName,
                text: payload.message
            });
          });

          cordova.plugins.notification.local.schedule({
                id: 10,
                title: "TEST",
                text: "TEST",
                every: "minute"
          });
          
          cordova.plugins.Keyboard.disableScroll(true);   
      }, false);

      document.addEventListener('backbutton', () => {
        this.$f7.mainView.router.back();
      });
    },
    components: {
      toolBar
    }
}
</script>

<style src="font-awesome/css/font-awesome.min.css"></style>
<style scoped>
.label{
  width: 100%;
}
</style>