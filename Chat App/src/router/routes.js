export default [
	{ 
		path: '/conversations/', 
		component: require("../views/conversations.vue") 
	},
	{ 
		path: '/login/', 
		component: require("../views/login.vue") 
	},
	{ 
		path: '/projects/', 
		component: require("../views/projects.vue") 
	},
	{ 
		path: '/setting/', 
		component: require("../views/setting.vue")
	},
	{ 
		path: '/conversation/:recevierID/', 
		component: require("../views/conversation.vue") 
	}
]