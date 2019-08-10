<template>
	<div class="section">
		<form @submit.prevent="addInstitute">
			<div class="columns is-centered">
				<h1 class="title is-2">
					Add New Institute
				</h1>
			</div>
			<hr>

			<h1 class="title is-4">Institute Details</h1>

			<b-field horizontal label="Name"
				:type="{'is-danger': errors.has('name')}"
				:message="errors.first('name') ? 'Name of Institute is required!' : ''">
				<b-input v-model="institute.name" name="name" icon="keyboard" placeholder="Name of Institute" v-validate="'required'" />
			</b-field>
			
			<b-field horizontal label="Address"
				:type="{'is-danger': errors.has('address')}"
				:message="errors.first('address')">
				<b-input v-model="institute.address" name="address" icon="map-marker" placeholder="Address of Institute" v-validate="'required'" />
			</b-field>
		
			<b-field horizontal label="Contact Number"
				:type="{'is-danger': errors.has('phone')}"
				:message="errors.first('phone') ? 'Contact number is required!' : ''">
				<b-input v-model="institute.phone" name="phone" icon="phone" placeholder="Contact Number" v-validate="'required'" />
			</b-field>

			<b-field horizontal label="Established Date"
				:type="{'is-danger': errors.has('estd')}"
				:message="errors.first('estd') ? 'Established date of institute is required' : ''">
				<b-input v-model="institute.established" name="estd" icon="calendar-text" placeholder="Established Year" v-validate="'required'" />
			</b-field>

			<h1 class="title is-4">Institute Admin Details</h1>

			<b-field horizontal label="UserID"
				:type="{'is-danger': errors.has('userID')}"
				:message="errors.first('userID')">
				<b-input v-model="admin.id" name="userID" icon="account" placeholder="UserID or Email" v-validate="'required'" />
			</b-field>
			<br>
			
			<b-button rounded type="is-info" @click="addInstitute">Submit</b-button>
			<hr>
		</form>
	</div>
</template>

<script>
export default {
	middleware: 'authentication',
	data() {
		return {
			institute: {
				name: null,
				address: null,
				phone: null,
				established: null
			},
			admin: {
				id: null
			}
		}
	},
	methods: {
		async addInstitute() {
			// Running the validator...
			const result = await this.$validator.validateAll();
			// Not registering the user if form is not valid...
			if (!result) {
				return this.$buefy.toast.open({
					message: 'Please fill the registration form properly',
					type: 'is-danger'
				});
			}
			try{
				await this.$axios.$post('/api/institutes/add', {
					name: this.institute.name,
					address: this.institute.address,
					phone: this.institute.phone,
					established: this.institute.established,
					admin: this.admin.id
				});
			} catch(err) {
				return this.$buefy.toast.open({
					message: err.response.data ? err.response.data : 'There is some error, Please try again later!',
					type: 'is-danger'
				});
			}
			this.$router.push('/dashboard/super-admin');
		}
	}
}
</script>
