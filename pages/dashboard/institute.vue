<template>
	<div class="section">
		<b-tabs type="is-boxed">
            <b-tab-item label="Users" icon="account">				
				<userTable />
			</b-tab-item>
            <b-tab-item v-if="permissions.includes('MANAGE_NOTICE')" label="Notices" icon="library-music">
				{{ permissions }}
			</b-tab-item>
        </b-tabs>
		<section>
			<h1 class="title is-2">Students</h1>
			<button class="button is-primary is-medium" @click="isComponentModalActive = true">
				Launch component modal
			</button>
			
			<b-modal :active.sync="isComponentModalActive" full-screen :can-cancel="false">
				<div class="modal-card" style="width: auto">
					<header class="modal-card-head">
						<p class="modal-card-title">Login</p>
					</header>
					<section class="modal-card-body">
						<b-field label="Email">
							<b-input
								type="email"
								:value="formProps.email"
								placeholder="Your email"
								required>
							</b-input>
						</b-field>

						<b-field label="Password">
							<b-input
								type="password"
								:value="formProps.password"
								password-reveal
								placeholder="Your password"
								required>
							</b-input>
						</b-field>

						<b-checkbox>Remember me</b-checkbox>
					</section>
					<footer class="modal-card-foot">
						<button class="button" type="button" @click="isComponentModalActive=false">Close</button>
						<button class="button is-primary">Login</button>
					</footer>
				</div>
			</b-modal>
			<hr>
		</section>
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
			return perms.getPermissions(this.$auth.user.permissions.find(perms => perms.instituteid === this.$route.query.id).permissions);
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
    }
}
</script> 