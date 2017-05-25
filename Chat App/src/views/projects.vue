<template>
	<f7-pages>
		<div class="page navbar-fixed toolbar-fixed with-subnavbar">
			<f7-navbar>
				<f7-nav-left>
					<f7-link icon="fa fa-bars" open-panel="left" v-if="$theme.material"></f7-link>
				</f7-nav-left>
				<f7-nav-center>Jobs</f7-nav-center>
				<f7-nav-right></f7-nav-right>
				<f7-subnavbar v-if="$theme.ios">
				  <f7-buttons v-if="currentUser.type === 'freelancer'">
				    <f7-button tab-link="#tab1" :class="{active: tabSelected === 'bidding'}" @click="switchTab('bidding')">Bidding</f7-button>
				    <f7-button tab-link="#tab2" :class="{active: tabSelected === 'working'}" @click="switchTab('working')">Working</f7-button>
				    <f7-button tab-link="#tab3" :class="{active: tabSelected === 'finished'}" @click="switchTab('finished')">Finished</f7-button>
				  </f7-buttons>
				  <f7-buttons v-if="currentUser.type === 'employer'">
				    <f7-button tab-link="#tab1" :class="{active: tabSelected === 'open'}" @click="switchTab('open')">Open</f7-button>
				    <f7-button tab-link="#tab2" :class="{active: tabSelected === 'pending'}" @click="switchTab('pending')">Pending</f7-button>
				    <f7-button tab-link="#tab2" :class="{active: tabSelected === 'working'}" @click="switchTab('working')">Working</f7-button>
				    <f7-button tab-link="#tab3" :class="{active: tabSelected === 'finished'}" @click="switchTab('finished')">Finished</f7-button>
				  </f7-buttons>
				</f7-subnavbar>
			</f7-navbar>
			<tool-bar v-if="$theme.ios" path="/projects"></tool-bar>
			<div class="toolbar tabbar" v-if="$theme.material">
				<div class="toolbar-inner" v-if="currentUser.type === 'freelancer'">
					<a href="#" class="tab-link" :class="{active: tabSelected === 'bidding'}" @click="switchTab('bidding')">Bidding</a>
					<a href="#" class="tab-link" :class="{active: tabSelected === 'working'}" @click="switchTab('working')">Working</a>
					<a href="#" class="tab-link" :class="{active: tabSelected === 'finished'}" @click="switchTab('finished')">Finished</a>
					<span class="tab-link-highlight" style="width: 33%" :style="{transform: 'translate3d(' + width + '%, 0px, 0px)'}"></span>
				</div>
				<div class="toolbar-inner" v-if="currentUser.type === 'employer'">
					<a href="#" class="tab-link" :class="{active: tabSelected === 'open'}" @click="switchTab('open')">Open</a>
					<a href="#" class="tab-link" :class="{active: tabSelected === 'pending'}" @click="switchTab('pending')">Pending</a>
					<a href="#" class="tab-link" :class="{active: tabSelected === 'working'}" @click="switchTab('working')">Working</a>
					<a href="#" class="tab-link" :class="{active: tabSelected === 'finished'}" @click="switchTab('finished')">Finished</a>
					<span class="tab-link-highlight"></span>
				</div>
			</div>
			<div class="page-content pull-to-refresh-content" @ptr:refresh="fetchData">
				<div class="pull-to-refresh-layer">
				    <div class="preloader"></div>
				    <div class="pull-to-refresh-arrow"></div>
				  </div>	
				<div class="list-block cards-list list-block-special">
				   <ul>
				    <project-card v-for="project in projects.open" :project="project" :tab="tabSelected" v-if="tabSelected === 'open'" @click="switchTab('open')"></project-card>
				    <project-card v-for="project in projects.pending" :project="project" :tab="tabSelected" v-if="tabSelected === 'pending'" @click="switchTab('pending')"></project-card>
				    <project-card v-for="project in projects.bidding" :project="project" :tab="tabSelected" v-if="tabSelected === 'bidding'" @click="switchTab('bidding')"></project-card>
				    <project-card v-for="project in projects.working" :project="project" :tab="tabSelected" v-if="tabSelected === 'working'" @click="switchTab('working')"></project-card>
				    <project-card v-for="project in projects.finished" :project="project" :tab="tabSelected" v-if="tabSelected === 'finished'" @click="switchTab('finished')"></project-card>
				  </ul>
				  <div class="content-block" v-if="projects[tabSelected].length <= 0 && !isLoading || isLoading">
				  	<p v-if="projects[tabSelected].length <= 0 && !isLoading">No Result Found.</p>
				  	<f7-preloader v-if="isLoading"></f7-preloader>
				  </div>
				</div>
			</div>
			<div class="page-content">
				
			</div>
		</div>
	</f7-pages>	
</template>

<script>
import { API_SERVER } from '../api.js'
import toolBar from '../components/toolBar.vue'
import projectCard from '../components/projectCard.vue'

export default {
	data(){
		return {
			tabSelected: 'open',
			projects: {
				bidding: [],
				working: [],
				finished: [],
				open: [],
				pending: []
			},
			isLoading: true,
			width: 0
		}
	},
	computed: {
		currentUser(){
			return this.$store.state.user.currentUser;
		}
	},
	methods: {
		fetchData(){
			var projectStatus = []
			if (this.currentUser.type === 'employer'){
				projectStatus = ['open', 'working', 'pending', 'finished'];
			}else {
				projectStatus = ['bidding', 'working', 'finished'];
			}
			var f1 = new Promise((resolve, reject) => {
				projectStatus.forEach((status, index)=> {
					this.$http.get(API_SERVER + '/dashboard/project',
						{
							params: {
								status: status,
								pageNumber: 1,
								rowNumber: 99999,
								keyword: ''
							}
						}).then(response => {
							if (status === 'bidding'){
								this.projects[status] = response.body.bids;
							}else {
								this.projects[status] = response.body.projects;
							}
							
							if ((index + 1) === projectStatus.length){
								resolve();
							}
						});
				});
			});

			f1.then(()=> {
				this.isLoading = false;
				this.$f7.pullToRefreshDone();
			});
		},
		switchTab(tabName){
			this.tabSelected = tabName;
			
		}
	},
	created(){
		if (this.currentUser.type === 'freelancer'){
			this.tabSelected = 'bidding';
		}else {
			this.tabSelected = 'open';
		}
		var firstTimeFetchData = new Promise((resolve, reject) => {
			this.fetchData();
			resolve();
		});
		firstTimeFetchData.then(()=> {
			this.isInit = false;
		});
	},
	components: {
		toolBar,
		projectCard
	}
}
</script>

<style scoped>
.content-block{
	margin-top: 50%;
	text-align: center;
}
</style>

