<template>
	<div class="section">
		<b-tabs type="is-boxed">
            <b-tab-item  v-if="permissions.includes('MANAGE_INSTITUTE_USERS')" label="Users" icon="account">				
				<userTable :perms="permissions" />
			</b-tab-item>
            <b-tab-item label="Notices" icon="information">
				<noticeBoard :perms="permissions" />
			</b-tab-item>
			<b-tab-item v-if="!permissions.length || permissions.includes('MANAGE_ASSIGNMENTS')" label="Assignments" icon="book-open">
				This is assignment tab
			</b-tab-item>
        </b-tabs>
	</div>
</template>

<script>
import permissionHandler from '~/utility/permissionHandler';
import userTable from '~/components/UserTable';
import noticeBoard from '~/components/noticeBoard';

export default {
	middleware: 'authentication',
	components: { userTable, noticeBoard },
	watchQuery: true,
	computed: {
		permissions() {
			return permissionHandler.available(this.$auth.user.permissions.find(_perms => _perms.instituteId === this.$route.query.id).permissions);
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
			return permissionHandler.getDescription(permissions);
		}
	}
}
</script> 