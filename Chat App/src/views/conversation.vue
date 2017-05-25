<template>
	<f7-pages>
		<div class="page navbar-fixed" :style="{height: 'calc(100% - ' + pageHeightOffset + 'px)'}">
			<f7-navbar>
				<f7-nav-left back-link="Back" sliding></f7-nav-left>
				<f7-nav-center>{{targetFullName}}</f7-nav-center>
				<f7-nav-right></f7-nav-right>
			</f7-navbar>
			<div class="page-content messages-content">
				<f7-messages>
					<message v-for="(message,index) in messages" :message="message"></message>
				</f7-messages>
			</div>
			<f7-messagebar placeholder="Message" @submit="onSubmit" @input="message = $event">
				<span slot="send-link" :class="{disabled: message === ''}">Send</span>
			</f7-messagebar>
		</div>
	</f7-pages>
</template>

<script>
import { API_SERVER } from '../api.js'
import { bus } from '../main.js'
import message from '../components/message.vue'

export default {
	data(){
		return {
			target: {},
			messages: [],
			message: '',
			pageHeightOffset: 0,
			transitionTime: 0
		}
	},
	computed: {
		targetFullName () {
			return this.target.firstName + ' ' + this.target.lastName;
		},
		currentUser () {
			return this.$store.state.user.currentUser;
		}
	},
	methods: {
		getConversation(){
			this.$http.get(API_SERVER + '/chat/conversation/messages?sender_id=' + this.currentUser._id + '&recevier_id=' + this.target._id).then(response => {
				this.messages = response.body.messages.messages;
			});
		},
		onSubmit(){
			if (this.message){
				this.$http.post(API_SERVER + '/chat/' , {recevier: this.target, message: this.message}).then(response=> {
					this.$$('.messagebar')[0].f7Messagebar.clear();
					this.message = '';
				});
			}
		}
	},
	sockets: {
		addMessage(message){
			this.messages.push(message);	
			bus.$emit('alertNewMessage', {id: this.$store.state.alertID, message: message.message, targetFullName: this.targetFullName});
			this.$store.commit('alertIDPlus');
		}
	},
	created() {
		window.addEventListener('native.keyboardshow', (e) =>{
			if (this.$theme.ios){
				this.pageHeightOffset = e.keyboardHeight;
			}else {
				this.pageHeightOffset = 0.1;
			}
		});
		window.addEventListener('native.keyboardhide', (e) =>{
			this.pageHeightOffset = 0;
		});
		this.target = JSON.parse(this.$route.query.target);
		this.getConversation();
		this.$socket.emit('initialize', this.currentUser._id);
	},
	components: {
		message
	}
}
</script>

<style scoped>
.disabled{
	color: #848484;
}
.navbar-fixed .page-content{
	padding-bottom: 50px;
}
</style>