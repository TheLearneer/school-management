<template>
    <div class="section">
		<p class="title is-5">Filter Users:</p>
		<div class="block">
			<b-radio v-model="userListing" native-value="all" type="is-success">
				Everyone
			</b-radio>
			<b-radio v-model="userListing" native-value="admin" type="is-danger">
				Admin
			</b-radio>
			<b-radio v-model="userListing" native-value="teacher" type="is-warning">
				Teacher
			</b-radio>
			<b-radio v-model="userListing" native-value="student" type="is-info">
				Student
			</b-radio>
		</div>

        <b-table
            :data="tableUsers"
            :loading="loading"
            paginated
			hoverable
            per-page=10
			show-detail-icon
			default-sort="name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <template slot-scope="props">

                <b-table-column field="name" label="Name" icon="human-male" sortable>
					<template slot="header" slot-scope="{ column }">
						<b-icon icon="account" size="is-small" /> {{ column.label }}
					</template>
					<b-tooltip :label="getUserType(props.row.permissions)" position="is-bottom" type="is-dark">
						<b-icon :icon="props.row.gender === 'M' ? 'human-male' : 'human-female'" :class="[
									{'has-text-danger': getUserType(props.row.permissions) === 'admin' },
									{'has-text-warning': getUserType(props.row.permissions) === 'teacher' },
									{'has-text-info': getUserType(props.row.permissions) === 'student'}
								]" />
					</b-tooltip>
					{{ props.row.name }}
                </b-table-column>

				<b-table-column label="Contact Number" centered>
					<template slot="header" slot-scope="{ column }">
						<b-icon icon="phone" size="is-small" /> {{ column.label }}
					</template>
					{{ props.row.phone }}
				</b-table-column>

				<b-table-column label="Email" centered>
					<template slot="header" slot-scope="{ column }">
						<b-icon icon="email" size="is-small" /> {{ column.label }}
					</template>
					<a :href="`mailto:${props.row.email}`" target="_blank">{{ props.row.email }}</a>
				</b-table-column>

				<b-table-column label="Address" centered>
					<template slot="header" slot-scope="{ column }">
						<b-icon icon="map" size="is-small" /> {{ column.label }}
					</template>
					{{ props.row.address }}
				</b-table-column>

				<b-table-column label="DOB" centered>
					<template slot="header" slot-scope="{ column }">
						<b-icon icon="calendar-text" size="is-small" />
						<b-tooltip label="Date of birth">
							{{ column.label }}
						</b-tooltip>
					</template>
					<span class="tag is-success">
                        {{ new Date(props.row.dob).toLocaleDateString() }}
                    </span>
				</b-table-column>

				<b-table-column label="Actions" centered>
					<template slot="header" slot-scope="{ column }">
						<b-icon icon="account-edit" size="is-small" /> {{ column.label }}
					</template>
					<a @click="removeUser(props.row.id, props.row.name)" v-if="checkUserDeletable(props.row.id)">
						<b-tooltip label="Remove User!" type="is-danger">
							<b-icon type="is-danger" icon="delete-forever" />
						</b-tooltip>
					</a>
				</b-table-column>

            </template>
			
			<template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
			
			<template slot="footer">
                <div>
					<button class="button is-info" @click="isComponentModalActive = true">
						Add new user
					</button>
                </div>
            </template>		
        </b-table>

		<b-modal :active.sync="isComponentModalActive" full-screen :can-cancel="false" key="newUserModal">
				<div class="modal-card" style="width: auto">
					<header class="modal-card-head">
						<p class="modal-card-title">Add New User Associated to the Institute</p>
					</header>
					<section class="modal-card-body">
						<form @submit.prevent="addInstituteUser">
							<b-field label="UserID"
								:type="{'is-danger': errors.has('username')}"
								:message="errors.first('username') ? 'Please enter the userID or email!' : ''">
								<b-input v-model="user.username" name="username" icon="account" placeholder="UserID or Email" v-validate="'required'" />
							</b-field>
							<br>

							<h1 class="title is-3">Permissions</h1>
							<div class="block">
								<b-radio v-model="userSelection" native-value="admin" type="is-danger" :disabled="customPermissions">
									Admin
								</b-radio>
								<b-radio v-model="userSelection" native-value="teacher" type="is-warning" :disabled="customPermissions">
									Teacher
								</b-radio>
								<b-radio v-model="userSelection" native-value="student" type="is-success" :disabled="customPermissions">
									Normal User
								</b-radio>
							</div>
							<div class="field">
								<b-checkbox v-model="customPermissions">
									Select Custom Permissions
								</b-checkbox>
							</div>
							<br>

							<div class="box">
								<div class="field">
									<b-checkbox v-model="user.permissions"	native-value="MANAGE_ADMINS" :disabled="userSelection!=='admin' && !customPermissions">
										Add/Remove Admin users for the institute
									</b-checkbox>
								</div>
								<div class="field">
									<b-checkbox v-model="user.permissions"	native-value="MANAGE_INSTITUTE_USERS" :disabled="userSelection!=='admin' && !customPermissions">
										Add/Remove Users associated with the institute
									</b-checkbox>
								</div>
								<div class="field">
									<b-checkbox v-model="user.permissions"	native-value="MANAGE_NOTICE" :disabled="userSelection!=='admin' && !customPermissions">
										Manage Notices of the institute
									</b-checkbox>
								</div>
								<div class="field">
									<b-checkbox v-model="user.permissions" native-value="MANAGE_ASSIGNMENTS" :disabled="userSelection!=='teacher' && !customPermissions">
										Manage Assignments
									</b-checkbox>
								</div>
							</div>
							<hr>
							<b-button rounded type="is-info" icon-left="check" @click="addInstituteUser">Submit</b-button>
							<b-button rounded class="is-pulled-right" type="is-danger" icon-left="close" @click="closeModal">Close</b-button>
						</form>
					</section>
				</div>
			</b-modal>
    </div>
</template>

<script>
import permissionHandler from '~/utility/permissionHandler';

export default {
	props: [ 'perms' ],
    data() {
        return {
            data: [],
            loading: false,
			isComponentModalActive: false,
			userListing: 'all',
			userSelection: 'student',
			customPermissions: false,
			user: {
				username: null,
				permissions: []
			}
        }
    },
	computed: {
		tableUsers() {
			return this.data.filter(user => {
				if (this.userListing === 'all') return true;
				
				const userType = this.getUserType(user.permissions);
				if (this.userListing === 'admin' && userType !== 'admin') return false;
				if (this.userListing === 'teacher' && userType !== 'teacher') return false;
				if (this.userListing === 'student' && userType !== 'student') return false;
				return true;
			})
		}
	},
    methods: {
		getUserType(permissions) {
			const adminPerms = ['ADMINISTRATOR', 'MANAGE_ADMINS', 'MANAGE_INSTITUTE_USERS', 'MANAGE_NOTICE'];
			const teacherPerms = ['MANAGE_ASSIGNMENTS'];

			const userPerms = permissionHandler.available(permissions);

			return adminPerms.some(ap => userPerms.includes(ap)) ? 'admin' : teacherPerms.some(tp => userPerms.includes(tp)) ? 'teacher' : 'student';
		},
        async loadAsyncData() {
            this.loading = true
			try {
				// Getting the data from the API...
				const data = await this.$axios.$get('/api/institutes/users', { params: { id: this.$route.query.id } });
				// providing the data to the page data...
				this.data = data.users;
				this.loading = false;
			} catch(err) {
				console.log(err, 'Error from here');
				this.data = [];
				this.loading = false;
				// Exiting with error
				return this.$toast.open({
					message: err.response.data,
					type: 'is-danger'
				});
			}
        },
		checkUserDeletable(id) {
			if (this.$auth.user.id === id) return false;
			const user = this.data.find(_usr => _usr.id === id);
			if (permissionHandler.hasPermission(user.permissions, 'ADMINISTRATOR') && !this.perms.includes('MANAGE_ADMINS')) return false;
			return true;
		},
		removeUser(id, name) {
			this.$dialog.confirm({
				title: 'Remove user ??',
				message: `Are you sure you want to <i>remove</i> <b>${name}</b> from the institute? This action cannot be undone.`,
				type: 'is-danger',
				hasIcon: true,
				onConfirm: async () => {
					try {
						await this.$axios.post('/api/institutes/users/delete', { id, instituteId: this.$route.query.id });
						this.data = this.data.filter(_user => _user.id !== id);
						return this.$toast.open({ message: `Successfully removed ${name} from the institute.`, type: 'is-success' });
					} catch(err) {
						return this.$toast.open({ message: err.response.data, type: 'is-danger' });
					}
				}
			});
		},
		async addInstituteUser() {
			const result = await this.$validator.validateAll();
			if (!result) {
				return this.$toast.open({
					message: 'Please fill the registration form properly!',
					type: 'is-danger'
				});
			}
			if (this.userSelection === 'admin' && !this.user.permissions.includes('ADMINISTRATOR')) this.user.permissions.push('ADMINISTRATOR');
			try {
				const permissions = permissionHandler.resolve(this.user.permissions);
				await this.$axios.post('/api/institutes/users/add', { id: this.user.username, instituteId: this.$route.query.id, permissions });
				this.closeModal();
				await this.loadAsyncData();
			} catch(err) {
				if (err.response) return this.$toast.open({ message: err.response.data, type: 'is-danger' });
				this.$toast.open({message: err})
			}
		},
		closeModal() {
			this.isComponentModalActive = false;
			this.$nextTick(() => {				
				this.user.username = null;
				this.user.permissions = [];
			})
		}
    },
    async mounted() {
        await this.loadAsyncData()
    }
}
</script>