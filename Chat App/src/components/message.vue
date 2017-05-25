<template>
	<f7-message :name="editedMessage.name" :text="message.message" :type="editedMessage.type" :avatar="editedMessage.avatar" :day="editedMessage.date"></f7-message>
</template>

<script>
export default {
	data(){
		return {
			editedMessage: {}
		}
	},
	props: ['message'],
	computed:{
		currentUser () {
			return this.$store.state.user.currentUser;
		}
	},
	methods: {
		identifyMessage(message){
			if (message.sender._id !== this.currentUser._id){
				message.name = message.sender.firstName + ' ' + message.sender.lastName;
				message.type = 'received';
				message.avatar = this.avatarUrl(message.sender);
			} else {
				message.name = '';
				message.type = 'sent';
			}
			this.editedMessage = message;
		}
	},
	created(){
		this.identifyMessage(this.message);
	}
}
</script>