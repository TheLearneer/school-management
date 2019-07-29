<template>
	<div class="section">
		<!--
		<b-notification auto-close type="is-warning" has-icon aria-close-label="Close notification" role="alert" :duration=5000>
            The Dashboard page is extremely under construciton! It might not work as inteded as of now!
        </b-notification>
		-->

		<p>
			Select the dashboard page you want to continue into!
		</p>
		<br>
		<div class="box" v-for="perm in $auth.user.permissions">
			<div class="columns">
				<div class="column is-1">
					<img src="https://via.placeholder.com/64.png" />
				</div>
				<div class="column">
					<n-link :to="getDashURL(perm.instituteId)">
						Institute {{ perm.instituteId }}
					</n-link>
				</div>
				<div class="column">
					Role :- No idea :P
				</div>
				<div class="column is-1">
					{{ perm.permissions }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	middleware: 'authentication',
	methods: {
		getDashURL(id) {
			return id ? { path: '/dashboard/institute', query: { id } } : { path: '/dashboard/super-admin' }
		}
	}
}
</script>
