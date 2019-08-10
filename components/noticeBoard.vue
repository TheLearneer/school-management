<template>
	<div class="section">
		<div class="column" v-for="note of notices" :key="note.id">
			<div class="box">
				{{ note.notice }}
			</div>
		</div>
		<div v-if="!notices.length">
			<div class="section">
                <div class="content has-text-grey has-text-centered">
                    <p>
                        <b-icon
                            icon="alert-octagram"
                            size="is-large">
                        </b-icon>
                    </p>
					<p>No notices available!</p>
                </div>
            </div>
		</div>
		<hr>
		<div>
			<button v-if="perms.includes('MANAGE_NOTICE')" class="button is-info" @click="isComponentModalActive = true">
				Add new notice
			</button>
        </div>
		
		<b-modal :active.sync="isComponentModalActive" key="newNoticeModal">
				<div class="modal-card" style="width: auto">
					<header class="modal-card-head">
						<p class="modal-card-title">Add New Notice</p>
					</header>
					<section class="modal-card-body">
						<form @submit.prevent="addNewNotice">
							<b-field label="Notice!"
								:type="{'is-danger': errors.has('notice')}"
								:message="errors.first('notice') ? 'Please enter some notice!' : ''">
								<b-input v-model="newNotice" name="notice" icon="information" placeholder="New notice for the users!" v-validate="'required'" />
							</b-field>
							
							<hr>
							<b-button rounded type="is-info" icon-left="check" @click="addNewNotice">Submit</b-button>
							<b-button rounded class="is-pulled-right" type="is-danger" icon-left="close" @click="closeModal">Close</b-button>
						</form>
					</section>
				</div>
			</b-modal>
	</div>
</template>

<script>
export default {
	props: [ 'perms' ],
	data() {
		return {
			notices: [],
			isComponentModalActive: false,
			newNotice: null
		}
	},
	methods: {
        async loadAsyncData() {
			try {
				// Getting the data from the API...
				const data = await this.$axios.$get('/api/notice', { params: { id: this.$route.query.id } });
				console.log(data);
				// providing the data to the page data...
				this.notices = data.notice;
				this.loading = false;
			} catch(err) {
				this.notices = [];
				// Exiting with error
				return this.$toast.open({
					message: err.response ? err.response.data : err.message,
					type: 'is-danger'
				});
			}
		},
		async addNewNotice() {
			// Running the validator...
			const result = await this.$validator.validateAll();
			// Not registering the user if form is not valid...
			if (!result) return;
			try {
				await this.$axios.post('/api/notice/add', { notice: this.newNotice, instituteId: this.$route.query.id });
				// Reverting stuffs until better fix...
				this.closeModal();
				// Load the user's data again...
				await this.loadAsyncData();
			} catch(err) {
				return this.$toast.open( err.response ? { message: err.response.data, type: 'is-danger' } : { message: err });
			}
		},
		closeModal() {
			this.isComponentModalActive = false;
			this.$nextTick(() => { this.newNotice = null; })
		}
	},
	async mounted() {
		await this.loadAsyncData()
	}
}
</script>