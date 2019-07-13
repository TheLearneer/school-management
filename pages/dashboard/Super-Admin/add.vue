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
			<b-input v-model="institute.phone" name="institute-number" icon="phone-classic" placeholder="Contact Number" required />
		</b-field>
		<b-field horizontal label="Established Date">
			<b-input v-model="institute.established" name="institute-established" placeholder="Established Year" required />
		</b-field>
		<br>
		
		<!-- 
		<h1 class="title is-4">Institute Admin Details</h1>
		<b-field horizontal label="Name">
			<b-input v-model="admin.name" name="institute-admin-name" icon="account" placeholder="Full Name" required />
		</b-field>
		<b-field horizontal label="Email">
			<b-input type="email" v-model="institute.email" name="institute-admin-email" icon="email" placeholder="Email" required />
		</b-field>
		<b-field horizontal label="Contact Number">
			<b-input type="number" v-model="admin.phone" name="institute-admin-number" icon="phone" placeholder="Contact Number" required />
		</b-field>
		<b-field horizontal label="Password">
            <b-input v-model="admin.password" type="password" placeholder="Password" password-reveal required />
        </b-field>
		<br>
		-->
		
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
				phone: '',
				established: ''
			}
			/*
			,
			admin: {
				name: '',
				email: '',
				phone: '',
				password: ''
			}*/
		}
	},
	methods: {
		async addInstitute() {
			await this.$axios.$post('/api/institutes/add', {
				name: this.institute.name,
				address: this.institute.address,
				phone: this.institute.phone,
				established: this.institute.established				
			});
			this.$router.push('/dashboard/super-admin');
		}
	}
}
</script>