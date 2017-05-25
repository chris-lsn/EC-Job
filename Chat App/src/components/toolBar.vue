<template>
    <div class="toolbar tabbar tabbar-labels">
	    <div class="toolbar-inner">
	        <a href="#tab1" class="tab-link" :class="{active: path === '/conversations'}" @click="switchTab('/conversations')">
	            <i class="fa fa-comments-o"></i>
	            <span class="tabbar-label">Chats</span>
	        </a>
	        <a href="#tab2" class="tab-link" :class="{active: path === '/projects'}" @click="switchTab('/projects')">
	            <i class="fa fa-folder-o"></i>
	            <span class="tabbar-label">Jobs</span>
	        </a>
	        <a href="#tab3" class="tab-link" :class="{active: path === '/setting'}" @click="switchTab('/setting')">
	            <i class="fa fa-sliders"></i>
	            <span class="tabbar-label">Setting</span>
	        </a>
	    </div>
	</div>

</template>

<script>
export default {
	props: ['path'],
	methods: {
		switchTab(url) {
			this.$router.load({url: url, animatePages: false, reload: true});
		}
	}

}
</script>

<style scoped>
.fa{
  font-size: 1.6em;
}
</style>