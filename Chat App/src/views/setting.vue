<template>
	<f7-pages>
		<div class="page navbar-fixed">
			<f7-navbar>
				<f7-nav-left v-if="$theme.material">
					<f7-link icon="fa fa-bars" open-panel="left"></f7-link>
				</f7-nav-left>
				<f7-nav-center>Setting</f7-nav-center>
				<f7-nav-right>
				</f7-nav-right>
			</f7-navbar>
			<tool-bar v-if="$theme.ios" path="/setting"></tool-bar>
			<div class="page-content">
				<div class="content-block-title">Billing</div>
				<div class="list-block">
			      <ul>
			        <li class="item-content">
				        <div class="item-inner">
				          <div class="item-title label">Balance</div>
				          <div class="item-input" v-if="isChanging">
				            <input type="text" placeholder="Your First Name" v-model="user.balance">
				          </div>
				          <div class="item-after" v-else>${{ currentUser.balance }}</div>
				        </div>
				    </li>
			       </ul>
			    </div>
				<div class="content-block-title">Personal Infomation</div>

					<div class="list-block list-block-special">
					  <ul>
					  	<li class="item-content">
					        <div class="item-inner">
					          <div class="item-title label">User Type</div>
					          <div class="item-input" v-if="isChanging">
					            <input type="text" placeholder="Your First Name" v-model="user.type">
					          </div>
					          <div class="item-after" v-else>{{ currentUser.type }}</div>
					        </div>
					    </li>
					    <li class="item-content">
					        <div class="item-inner">
					          <div class="item-title label">First Name</div>
					          <div class="item-input" v-if="isChanging">
					            <input type="text" placeholder="Your First Name" v-model="user.firstName">
					          </div>
					          <div class="item-after" v-else>{{ currentUser.firstName }}</div>
					        </div>
					    </li>
					    <li class="item-content">
					        <div class="item-inner">
					          <div class="item-title label">Last Name</div>
					          <div class="item-input " v-if="isChanging">
					            <input type="text" placeholder="Your First Name" v-model="user.lastName">
					          </div>
					          <div class="item-after" v-else>{{ currentUser.lastName }}</div>
					        </div>
					    </li>
					    <li class="item-content">
					        <div class="item-inner">
					          <div class="item-title label">Email</div>
					          <div class="item-input " v-if="isChanging">
					            <input type="email" placeholder="Your Email Address" v-model="user.email">
					          </div>
					          <div class="item-after" v-else>{{ currentUser.email }}</div>
					        </div>
					    </li>
					  </ul>
					</div>
					<div class="list-block">
				      <ul>
				        <li>
				        	<a href="#" class="item-content" @click="logout">
					          <div class="item-inner">
					            <div class="item-title item-logout">Logout</div>
					          </div>
				          	</a>
				        </li>
				       </ul>
				    </div>
			    </div>
			</div>
		</div>
	</f7-pages>
</template>

<script>
import toolBar from '../components/toolBar.vue'
export default {
	data(){
		return {
			isChanging: false,
			user: {}
		}
	},
	computed: {
		currentUser(){
			this.user = this.$store.state.user.currentUser;
			return this.$store.state.user.currentUser;
		}	
	},
	methods: {
		logout(){
			this.$f7.confirm('Are you sure you want to logout?', 'Confirmation', () => {
		        this.$store.dispatch("logout", this);
		    });
		},
		edit(){
			this.isChanging = !this.isChanging;
			if (!this.isChanging){

			}
		}
	},
	components: {
		toolBar
	}
}
</script>

<style scoped>
.item-logout{
	color: red;
}

.item-input{
	max-height: 28px;
	min-height: 0px !important;
}

input {
	text-align: right;
	height: 26px !important;
}

.fa{
	font-size: 1.2em;
}
</style>