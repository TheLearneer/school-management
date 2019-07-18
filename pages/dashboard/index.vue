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
		<div class="box columns" v-for="perm in $auth.user.permissions">
			<div class="column is-1">
				<img src="https://via.placeholder.com/64.png" />
			</div>
			<div class="column">
				<n-link :to="generateDashboardURL(perm.permissions, perm.instituteid)">
					Institute {{ perm.instituteid }}
				</n-link>
			</div>
			<div class="column">
				Role :- {{ getRole(perm.permissions) }}
			</div>
			<div class="column is-1">
				{{ perm.permissions }}
			</div>
		</div>
	</div>
</template>

<script>
import perms from '~/utility/permissionHandler';

export default {
	middleware: 'authentication',
	methods: {
		generateDashboardURL(permissions, id) { 
			const role = this.getRole(permissions);
			const extended = role === 'super-admin' ? '' : `?id=${id}`
			return { path: `/dashboard/${role}`, query: { id } };
		},
		getRole(permissions) {
			return perms.getRole(parseInt(permissions));
		}
	}
}
</script>
