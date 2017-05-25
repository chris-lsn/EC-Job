<template>
	<f7-login-screen id="login-screen" :opened="isOpen">
      <f7-view>
        <f7-pages>
          <f7-page login-screen>
            <f7-login-screen-title>Login</f7-login-screen-title>
            <f7-list form>
              <f7-list-item>
                <f7-label>Username</f7-label>
                <f7-input name="username" placeholder="Username" type="text" v-model="username"></f7-input>
              </f7-list-item>
              <f7-list-item>
                <f7-label>Password</f7-label>
                <f7-input name="password" type="password" placeholder="Password" v-model="password"></f7-input>
              </f7-list-item>
            </f7-list>
            <f7-list>
              <f7-list-button title="Sign In" @click="login"></f7-list-button>
              <f7-list-label>
                <p>Don't Have an Account?</p>
              </f7-list-label>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-login-screen>
</template>

<script>
import { bus } from '../main.js'
export default {
	data(){
		return {
			  username: '',
        password: '',
        isOpen: false
		}
	},
	methods: {
		login(){
	        this.$store.dispatch("login", { ref: this, user: { username: this.username, password: this.password} });
	  }
	},
  created(){
      bus.$on("LoginFailed", () => {
        this.$f7.alert("Invalid Account. Please try again!", "Login failed");
      });
  }
}
</script>