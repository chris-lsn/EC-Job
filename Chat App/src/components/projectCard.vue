<template>
	<li class="card">
      <div class="card-header">{{ job.title }}</div>
      <div class="card-content">
        <div class="card-content-inner">{{ description }} </div>
      </div>
      <div class="card-footer">
      	<span v-if="fullName"><i class="fa fa-gg fa-fw"></i> {{fullName}}
      	<span v-if="tab === 'bidding'">(Your Bid: ${{this.project.bidPrice}})</span>
      	</span>

      	<div class="popover" :class="[jobClass]" v-if="tab === 'open'">
      		<div class="popover-angle"></div>
      		<div class="popover-inner">
      			<div class="list-block">
	      			<ul>
		      			<li v-for="bid in job.bids">
		      				<a href="#" @click="contact(bid.bidder)" class="list-button item-link close-popover" :data-popover="classID">{{bid.bidder.firstName + " " + bid.bidder.lastName}} ({{bid.bidder.username}}) - ${{bid.bidPrice}}</a>
		      			</li>
		      		</ul>
	      		</div>
      		</div>
      	</div>
   
      	
      	<f7-button class="btn-contact open-popover" :data-popover="classID" v-if="tab === 'open'">Contact Bidder</f7-button>
      	<f7-button class="btn-contact" @click="contact(contactUser)" v-else>Contact</f7-button>
      </div>
    </li>
</template>

<script>
export default {
	props: ['project', 'tab'],
	data(){
		return {
			job: {}
		}
	},
	created() {
		if (this.tab === "bidding"){
			this.job = this.project.bidProject;
		} else {
			this.job = this.project;
		}
	},
	computed: {
		jobClass(){
			return 'job' + this.job._id;
		},
		classID(){
			return '.job' + this.job._id;
		},
		currentUser(){
			return this.$store.state.user.currentUser;
		},
		description(){
			return this.job.description.substring(0, 250) + '...';
		},
		contactUser() {
			if (this.currentUser.type === 'freelancer'){
				return this.job.employer;
			}
			return this.job.winBid.bidder;
		},
		fullName() {
			if (this.tab === 'open'){
				return '';
			}else if (this.currentUser.type === 'freelancer'){
				return this.job.employer.firstName + ' ' + this.job.employer.lastName;
			} else if (this.currentUser.type === 'employer'){
				return this.job.winBid.bidder.firstName + ' ' + this.job.winBid.bidder.lastName;
			}
		}
	},
	methods: {
		contact(user){
			this.$router.load({url: '/conversation/' + user._id + '?target=' + JSON.stringify(user)});
		}
	}
}
</script>

<style scoped>
i{
	font-weight: bold;
}
.card-footer{
	text-align: right;
}

.btn-contact{
	position: absolute;
    right: 10px;
}
</style>