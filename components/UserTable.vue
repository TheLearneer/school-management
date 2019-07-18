<template>
    <div class="section" v-if="visible()">
		<h1 class="title is-2">
			Users Affiliated
		</h1>
        <b-table
            :data="data"
            :loading="loading"
            paginated
			hoverable
            per-page=10
			show-detail-icon
			detailed
			detail-key="id"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <template slot-scope="props">
                <b-table-column field="Name" label="Name" icon="human-male">
					 <b-icon :icon="props.row.gender === 'M' ? 'human-male' : 'human-female'" />
                    {{ props.row.name }}
                </b-table-column>
								
				<b-table-column label="Contact Number" centered>
					{{ props.row.phone }}
				</b-table-column>
				
				<b-table-column label="Contact Email" centered>
					<a :href="`mailto:${props.row.email}`" target="_blank">{{ props.row.email }}</a>
				</b-table-column>
				
				<b-table-column label="Address" centered>
					{{ props.row.address }}
				</b-table-column>
				
				<b-table-column label="DOB" centered>
					<span class="tag is-success">
                        {{ new Date(props.row.dob).toLocaleDateString() }}
                    </span>
				</b-table-column>
				
				<b-table-column label="Actions" centered>
					<a @click="removeUser(props.row.id, props.row.name)">
						<b-tooltip label="Remove User from institute!" type="is-danger">
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
			
			<template slot="detail" slot-scope="props">
				<span><u>Permissions of user:</u></span>
				<br>
				<br>
				<b-taglist class="tags">
					<b-tag rounded type="is-info" v-for="tag of getPermDescription(props.row.permissions)" :key="tag.split(' ').join('_')">
						{{ tag }}
					</b-tag>
				</b-taglist>
            </template>

        </b-table>
    </div>
</template>

<script>
import perms from '~/utility/permissionHandler';

export default {
    data() {
        return {
            data: [],
            loading: false
        }
    },
    methods: {
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
		getPermDescription(permissions) {
			return perms.getDescriptions(permissions);
		},
		removeUser(id, name) {
			this.$dialog.confirm({
				title: 'Removing user',
				message: `Are you sure you want to <i>remove</i> <b>${name}</b> from the institute? This action cannot be undone.`,
				type: 'is-danger',
				hasIcon: true,
				onConfirm: async () => {
					try {
						await this.$axios.post('/api/institutes/users/delete', { id, instituteId: this.$route.query.id });
						this.data = this.data.filter(_user => _user.id !== id);
						// Confirmation toast...
						return this.$toast.open({ message: `Successfully removed ${name} from the institute.`, type: 'is-success' });
					} catch(err) {
						return this.$toast.open({ message: err.response.data, type: 'is-danger' });
					}
				}
			});
		},
		visible() {
			const permissions = this.$auth.user.permissions.find(perm => perm.instituteid === this.$route.query.id)
			// TODO:: Fix the permission system and use the 'MANAGE_INSTITUTE_USERS' key here
			return perms.hasPermission(permissions.permissions, 'EDIT_INSTITUTE');
		}
    },
    async mounted() {
        await this.loadAsyncData()
    }
}
</script>