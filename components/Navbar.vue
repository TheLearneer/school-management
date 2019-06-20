<template>
  <div>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <img src="~assets/buefy.png" alt="Santosh Bhandari" />
        </nuxt-link>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
		  <span aria-hidden="true"></span>
		  <span aria-hidden="true"></span>
		  <span aria-hidden="true"></span>
		</a>
      </div>
	
		<div id="navMenu" class="navbar-menu">
			<div class="navbar-end">
				<nuxt-link class="navbar-item" to="/">Home</nuxt-link>
				<nuxt-link class="navbar-item" to="/about">About</nuxt-link>
				
				<a v-if="!$auth.loggedIn" class="navbar-item" @click="isLoginModalActive=true">Login</a>
				
				<div v-if="$auth.loggedIn" class="navbar-item has-dropdown is-hoverable">
					<nuxt-link to="/" class="navbar-link">{{ $auth.user.name }}</nuxt-link>
					<div class="navbar-dropdown is-right">
						<nuxt-link class="navbar-item" :to=dashboardURL>Dashboard</nuxt-link>
						<hr class="navbar-divider">
						<a class="navbar-item" @click="$auth.logout()">Logout</a>
					</div>
				</div>
				
			</div>
		</div>
	</nav>
	
	<b-modal :active.sync="isLoginModalActive" align="center">
           <div class="modal-card">
			<section class="modal-card-body">
				<h3 class="title has-text-centered has-text-dark">Member Login</h3>
				<div class="box">
					<b-field label="Username">
						<b-input v-model="username" type="text" placeholder="Username">
						</b-input>
					</b-field>
					<b-field label="Password">
						<b-input v-model="password" type="password" placeholder="Password" password-reveal />
					</b-field>
					
					<button class="button is-dark is-large is-fullwidth" @click="login()">
						Login
					</button>
				</div>
				<p v-if="error">
					{{ error }}
				</p>
			</section>
		</div>
    </b-modal>
  </div>
</template>

<script>
export default {
	name: 'AppNavbar',
	data() {
		return {
			isLoginModalActive: false,
			username: null,
			password: '',
			error: ''
		}
	},
	computed: {
		dashboardURL() {
			return this.$auth.user ? `/dashboard/${this.$auth.user.role}` : '/dashboard';
		}
	},
	methods: {
		async login() {
			try {
				const data = await this.$auth.loginWith('local', { data: { username: this.username, password: this.password } });
				console.log(data);
				this.username = '';
				this.password = '';
				this.error = '';
				this.isLoginModalActive = false;
				console.log(this.$auth.loggedIn, this.$auth.user);
			} catch(err) {
				console.log(err);
				this.error = err.response ? err.response.data : 'Some error'; 
			}
		}
	}
};

// Navbar burger for smaller width devices...
if (process.client) {
	document.addEventListener('DOMContentLoaded', () => {
	  // Get all "navbar-burger" elements
	  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
	  // Check if there are any navbar burgers
	  if ($navbarBurgers.length > 0) {
		// Add a click event on each of them
		$navbarBurgers.forEach( el => {
		  el.addEventListener('click', () => {
			// Get the target from the "data-target" attribute
			const target = el.dataset.target;
			const $target = document.getElementById(target);
			// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
			el.classList.toggle('is-active');
			$target.classList.toggle('is-active');
		  });
		});
	  }
	});
}
</script>
