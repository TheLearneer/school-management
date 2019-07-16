<template>
	<div class="section">
		<form @submit.prevent="registerUser">
			<div class="columns is-centered">
				<h1 class="title is-1">
					New User Registration
				</h1>
			</div>
			<hr>
			
			<b-field horizontal label="User ID">
				<b-input v-model="email.split('@')[0]" name="username"  disabled />
			</b-field>
			
			<b-field horizontal label="Name"
				:type="{'is-danger': errors.has('name')}"
				:message="errors.first('name')">
				<b-input v-model="name" name="name" icon="account" placeholder="Full Name" v-validate="'required'" />
			</b-field>
			
			<b-field label="Gender" horizontal
                :type="{'is-danger': errors.has('gender')}"
                :message="errors.first('gender')">
                <b-radio v-model="gender" name="gender" native-value="M" v-validate="'required'">
                    Male
                </b-radio>
                <b-radio v-model="gender" name="gender" native-value="F" v-validate="'required'" >
                    Female
                </b-radio>
            </b-field>

			<b-field horizontal label="Email"
				:type="{'is-danger': errors.has('email')}"
				:message="errors.first('email')">
				<b-input type="email" v-model="email" name="email" icon="email" placeholder="Email" v-validate="'required|email'" />
			</b-field>
			
			<b-field horizontal label="Contact Number"
				:type="{'is-danger': errors.has('phone')}"
				:message="[{
					'Contact Number is required!': errors.firstByRule('phone', 'required'),
					'Please enter valid contact number': errors.firstByRule('phone', 'min'),
					'Please enter valid contact number!': errors.firstByRule('phone', 'max')
				}]">
				<b-input v-model="phone" name="phone" icon="phone" placeholder="Contact Number" v-validate="'required|min:10|max:10'" />
			</b-field>
			
			<b-field horizontal label="Address"
				:type="{'is-danger': errors.has('address')}"
				:message="errors.first('address')">
				<b-input v-model="address" name="address" icon="map-marker" placeholder="Address" v-validate="'required'" />
			</b-field>
			
			<b-field horizontal label="Password"
                :type="{'is-danger': errors.has('password')}"
                :message="errors.first('password')">
                <b-input type="password" v-model="password" name="password" placeholder="Password" v-validate="'required|min:8'" />
            </b-field>

            <b-field horizontal label="Confirm password"
                :type="{'is-danger': errors.has('confirm-password')}"
                :message="[{
                    'The password cofirmation field is required' : errors.firstByRule('confirm-password', 'required'),
                    'Password does not match!' : errors.firstByRule('confirm-password', 'is')
                }]">
                <b-input type="password" v-model="confirmPassword" placeholder="Re-enter Password" name="confirm-password"
                    v-validate="{ required: true, is: password }" />
            </b-field>
			
			<b-field horizontal label="Date of Birth"
				:type="{'is-danger': errors.has('dob')}"
				:message="errors.first('dob') ? 'Date of Birth is required!' : ''">
				<b-datepicker v-model="dob"	name="dob" placeholder="Click to select..." icon="calendar-today" v-validate="'required'" />
			</b-field>
			<br>
			
			<b-button rounded type="is-info" @click="registerUser">Submit</b-button>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: null,
			email: '',
			address: null,
			phone: null,
			password: null,
			confirmPassword: null,
			gender: null,
			dob: null
		}
	},
	methods: {
		async registerUser() {
			// Running the validator...
			const result = await this.$validator.validateAll();
			// Not registering the user if form is not valid...
			if (!result) {
				return this.$toast.open({
					message: 'Please fill the registration form properly',
					type: 'is-danger'
				});
			}
			// Registering the user...
			try{
				await this.$axios.post('/api/users/register', {
					name: this.name,
					email: this.email,
					phone: this.phone,
					address: this.address,
					password: this.password,
					gender: this.gender,
					dob: this.dob
				})
			} catch(err) {
				return this.$toast.open({
					message: err.response.data,
					type: 'is-danger'
				});
			}
			this.$router.push('/');
		}
	}
}
</script>