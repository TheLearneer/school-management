<template>
  <div>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
			<!--
			<img src="~assets/buefy.png" alt="Santosh Bhandari" />
			-->
			Home
        </nuxt-link>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
		  <span aria-hidden="true"></span>
		  <span aria-hidden="true"></span>
		  <span aria-hidden="true"></span>
		</a>
      </div>
	
		<div id="navMenu" class="navbar-menu">
			<!--
			<div class="navbar-start">
				<nuxt-link class="navbar-item" to="/">Home</nuxt-link>
			</div>
			-->
			
			<div v-if="!$auth.loggedIn" class="navbar-end">
				<nuxt-link class="navbar-item" to="/login">Login</nuxt-link>
				<nuxt-link class="navbar-item" to="/register">Sign Up</nuxt-link>
			</div>

			<div v-else class="navbar-end">
				<b-dropdown	class="navbar-item" hoverable aria-role="list">
                    <div slot="trigger">
						<span>{{ $auth.user.name }}</span>
                        <b-icon icon="menu-down" />
                    </div>
					<b-dropdown-item has-link aria-role="menuitem">
                        <nuxt-link to="/dashboard/me">
                            <b-icon icon="account" />
                            Profile
                        </nuxt-link>
                    </b-dropdown-item>
                    <b-dropdown-item v-if="$auth.loggedIn && $auth.user.permissions.length" has-link aria-role="menuitem">
                        <nuxt-link to="/dashboard">
                            <b-icon icon="settings" />
                            Dashboard
                        </nuxt-link>
                    </b-dropdown-item>
                    <hr class="dropdown-divider" aria-role="menuitem">
                    <b-dropdown-item value="logout" aria-role="menuitem" @click="$auth.logout()">
                        <b-icon icon="logout" />
                        Logout
                    </b-dropdown-item>
                </b-dropdown>
			</div>
		</div>
	</nav>
  </div>
</template>

<script>
export default {
	name: 'AppNavbar'
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
