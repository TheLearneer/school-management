<template>
	<div class="section">
		<b-tabs type="is-boxed">
            <b-tab-item  v-if="permissions.includes('MANAGE_INSTITUTE_USERS')" label="Users" icon="account">				
				<userTable />
			</b-tab-item>
            <b-tab-item label="Notices" icon="library-music">
				{{ getDescription(permissions) }}
			</b-tab-item>
			<b-tab-item v-if="!permissions.length || permissions.includes('MANAGE_ASSIGNMENTS')" label="Assignments" icons="notebook">
				This is assignment tab
			</b-tab-item>
        </b-tabs>
	</div>
</template>

<script>
import perms from '~/utility/permissionHandler';
import userTable from '~/components/UserTable';

export default {
	middleware: 'authentication',
	components: { userTable },
	watchQuery: true,
	computed: {
		permissions() {
			return perms.available(this.$auth.user.permissions.find(perms => perms.instituteId === this.$route.query.id).permissions);
		}
	},
	data() {
        return {
			isComponentModalActive: false,
			formProps: {
                email: 'evan@you.com',
                password: 'testing'
            }
        }
    },
	methods: {
		getDescription(permissions) {
			return perms.getDescription(permissions);
		}
	}
}
</script> 