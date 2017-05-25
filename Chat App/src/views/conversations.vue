<template>
	<f7-pages>
		<div class="page navbar-fixed">
			<f7-navbar>
				<f7-nav-left>
					<f7-link icon="fa fa-bars" open-panel="left" v-if="$theme.material"></f7-link>
				</f7-nav-left>
				<f7-nav-center>Chats</f7-nav-center>
				<f7-nav-right><a href="#" @click.prevent="scanQRCode" class="qrcode-icon"><i class="fa fa-qrcode" aria-hidden="true"></i></a></f7-nav-right>
			</f7-navbar>
			<tool-bar v-if="$theme.ios" path="/conversations"></tool-bar>
			<div class="page-content">
		   		<div class="list-block media-list">
				  <ul v-if="conversations.length > 0">
				    <li v-for="conversation in conversations" @click="contact(getRecevier(conversation.users),conversation._id)">
				      <a href="#" class="item-link item-content">
				      <div class="item-media"><img :src="avatarUrl(getRecevier(conversation.users))" width="40px" style="border-radius: 100%"></div>
				        <div class="item-inner">
				          <div class="item-title-row">
				            <div class="item-title">{{ getRecevier(conversation.users).firstName }} {{ getRecevier(conversation.users).lastName }}</div>
				            <div class="item-after">{{conversation.updated_at | moment('DD/MM hh:mm A')}}</div>
				          </div>
				          <div class="item-text">{{getLastMessage(conversation)}}</div>
				        </div>
				      </a>
				    </li>
				  </ul>
				</div>
				  <div class="content-block" v-if="conversations.length <= 0 && !isLoading || isLoading">
				  	<p v-if="conversations.length <= 0 && !isLoading">No Conservation Found.</p>
				  	<f7-preloader v-if="isLoading"></f7-preloader>
				  </div>
				
			</div>
		</div>
	</f7-pages>
</template>

<script>
import toolBar from '../components/toolBar.vue'
import { API_SERVER } from '../api.js'
import { bus } from '../main.js'

export default {
	data(){
		return {
			conversations: [],
			isLoading: true
		}
	},
	components: {
		toolBar
	},
	methods: {
		fetchData(){
			this.$http.get(API_SERVER + '/chat').then(response => {
				this.conversations = response.body.conversations;
				this.isLoading = false;
			});
		},
		getRecevier(users){
			users.forEach((user, index)=> {
				if (user._id === this.$store.state.user.currentUser._id){
					users.splice(index, 1);
				}
			});
			return users[0];
		},
		getLastMessage(conversation){
			return conversation.messages[conversation.messages.length - 1].message;
		},
		contact(target, conversation_id){
			this.$f7.mainView.router.load({url: '/conversation/' + conversation_id + '?target=' + JSON.stringify(target)});
		},
		scanQRCode(){
			cordova.plugins.barcodeScanner.scan(
				 (result) => {
					var user = JSON.parse(result.text);
					this.$router.load({url: '/conversation/' + user._id + '?target=' + result.text});
				}
			)
		}
	},
	sockets: {
      reloadChats(){
        console.log("asd");
        this.fetchData();
      }
    },
	created(){
		this.fetchData();
		bus.$on('reloadConversations', ()=>{
			this.fetchData();
		})
	}
}
</script>

<style scoped>
.qrcode-icon{
	font-size: 1.3em;
	margin-right: 5px;
}
.list-block{
	margin: 0!important;
}

.content-block{
	margin-top: 50%;
	text-align: center;
}
</style>