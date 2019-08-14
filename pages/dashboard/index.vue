<template>
	<div class="section">
		<!--
		<b-notification auto-close type="is-warning" has-icon aria-close-label="Close notification" role="alert" :duration=5000>
            The Dashboard page is extremely under construciton! It might not work as inteded as of now!
        </b-notification>
		-->

		<p>
			Select the Institute you want to continue into!
		</p>
		<br>
		<div class="box" v-for="perm in $auth.user.permissions">
			<div class="columns">
				<div class="column is-1">
					<img src="https://via.placeholder.com/64.png" />
				</div>
				<div class="column">
					<n-link :to="getDashURL(perm.instituteId)">
						{{ perm.instituteId ? `Institute ${perm.instituteId}` : 'Site Admin Page' }}
					</n-link>
				</div>
				<div class="column is-2">
					Role: {{ getUserType(perm.permissions).toUpperCase() }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import permissionHandler from '~/utility/permissionHandler';

export default {
	middleware: 'authentication',
	methods: {
		getDashURL(id) {
			return id ? { path: '/dashboard/institute', query: { id } } : { path: '/dashboard/super-admin' }
		},
		getUserType(permissions) {
			const adminPerms = ['ADMINISTRATOR', 'MANAGE_ADMINS', 'MANAGE_INSTITUTE_USERS', 'MANAGE_NOTICE'];
			const teacherPerms = ['MANAGE_ASSIGNMENTS'];

			const userPerms = permissionHandler.available(permissions);

			return adminPerms.some(ap => userPerms.includes(ap)) ? 'admin' : teacherPerms.some(tp => userPerms.includes(tp)) ? 'teacher' : 'student';
		}
	}
}
</script>
