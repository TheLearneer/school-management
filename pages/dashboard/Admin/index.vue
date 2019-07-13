<template>
	<div class="section">
		<b-table
			:data="data"
			:paginated=true
			:per-page=5>
			
			<template slot-scope="props">
                <b-table-column field="name" label="NAME" sortable>
                    {{ props.row.name }}
                </b-table-column>
				
				<b-table-column field="faculty" label="FACULTY" sortable>
                    {{ props.row.faculty }}
                </b-table-column>
				
				<b-table-column label="Gender">
                    <b-icon :icon="props.row.male === true ? 'gender-male' : 'gender-female'" />
                    {{ props.row.male === true ? 'Male' : 'Female' }}
                </b-table-column>
			</template>
        </b-table>
	</div>
</template>

<script>
export default {
	middleware: 'authInstituteAdmin',
	data() {
		return {
			data: [
				{ name: 'Ram', faculty: 'Computer', male: true },
				{ name: 'Shyam', faculty: 'Electronics', male: true },
				{ name: 'Hari', faculty: 'Science', male: true },
				{ name: 'Sita', faculty: 'Mathematics', male: false },
				{ name: 'Gita', faculty: 'Computer', male: false },
				{ name: 'Haree', faculty: 'Biology', male: true },
				{ name: 'Bishnu', faculty: 'Chemisty', male: true },
				{ name: 'Krishna', faculty: 'Physics', male: true },
				{ name: 'Shiva', faculty: 'Electronics', male: true },
				{ name: 'Sagar', faculty: 'Management', male: true },
				{ name: 'Roshan', faculty: 'Science', male: true },
				{ name: 'Prateek', faculty: 'Computer', male: true },
				{ name: 'Manohar', faculty: 'Civil', male: true },
				{ name: 'Laxmi prasad', faculty: 'Mathematics', male: true },
				
			]
		}
	}
}
</script>
