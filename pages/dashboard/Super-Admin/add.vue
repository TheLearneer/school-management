<template>
	<div class="section">
		<h1 class="title is-2">Add new Institute</h1>
		<hr>

		<h1 class="title is-4">Institute Details</h1>		
		<b-field horizontal label="Name">
            <b-input v-model="institute.name" name="institute-name" icon="keyboard" placeholder="Name of Institute" required />
        </b-field>		
		<b-field horizontal label="Address">
			<b-input v-model="institute.address" name="institute-address" icon="earth" placeholder="Address" required />
		</b-field>
		<b-field horizontal label="Contact Number">
			<b-input v-model="institute.contact" name="institute-number" icon="phone-classic" placeholder="Contact Number" required />
		</b-field>
		<br>
		
		<h1 class="title is-4">Institute Admin Details</h1>
		<b-field horizontal label="Name">
			<b-input v-model="admin.name" name="institute-admin-name" icon="account" placeholder="Full Name" required />
		</b-field>
		<b-field horizontal label="Email">
			<b-input type="email" v-model="institute.email" name="institute-admin-email" icon="email" placeholder="Email" required />
		</b-field>
		<b-field horizontal label="Contact Number">
			<b-input type="number" v-model="admin.contact" name="institute-admin-number" icon="phone" placeholder="Contact Number" required />
		</b-field>
		<b-field horizontal label="Password">
            <b-input v-model="admin.password" type="password" placeholder="Password" password-reveal required />
        </b-field>
		<br>
		
		<b-button rounded type="is-info" @click="addInstitute">Submit</b-button>
		<hr>
	</div>
</template>

<script>
export default {
	middleware: 'authSiteAdmin',
	data() {
		return {
			institute: {
				name: '',
				address: '',
				contact: null
			},
			admin: {
				name: '',
				email: '',
				contact: null,
				password: ''
			}
		}
	},
	methods: {
		async addInstitute() {
			// to-be-done
		}
	}
}
</script>