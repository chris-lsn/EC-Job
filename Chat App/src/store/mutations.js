import Vue from 'vue'
import { API_SERVER } from '../api.js'
export default {
	alertIDPlus(state){
		state.alertID += 1;
	}
}