<template>
	<div class="section">
		<div class="columns is-centered">
			<h1 class="title is-1">
				LOGIN
			</h1>
		</div>
		<div class="box">
			<form @submit.prevent="login">
				<b-field label="UserID">
					<b-input v-model="username" name="username" icon="account" placeholder="UserID or Email" v-validate="'required'" />
				</b-field>
				
				<b-field label="Password">
					<b-input type="password" v-model="password" name="password" icon="key" placeholder="Password" password-reveal v-validate="'required'" />
				</b-field>
				
				<b-button rounded type="is-info" @click="login">Submit</b-button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	middleware: 'noMoreLogin',
	data() {
		return {
			username: null,
			password: null
		}
	},
	methods: {
		async login() {
			// Not registering the user if form is not valid...
			if (this.username === null || this.password === null) {
				return this.$toast.open({
					message: 'Please provide the credentials!',
					type: 'is-danger'
				});
			}
			try {
				// Loggin in the user with provided data...
				await this.$auth.loginWith('local', { data: { username: this.username, password: this.password } });
				// Getting the route next the user should visit after login...
				const nextRoute = this.$auth.user.permissions.length ? '/dashboard/' : '/';
				// Redirecting to next page after successful login...
				this.$router.push(nextRoute);
			} catch(err) {
				this.$toast.open({
					message: err.response.data,
					type: 'is-danger'
				});
			}
		}
	}
}
</script>