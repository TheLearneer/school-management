<template>
	<div>
		<div class="section">
		<hr>
		<nuxt-link to="add" append>
			Add new Institute
		</nuxt-link>
		<hr>
		<h1 class="title is-2">Institutes Listed</h1>
		<div class="box" v-for="ins of institutes" :key="ins.id">
			<div class="columns">
				<!--
				<div class="column is-1">
					<figure class="image is-64x64">
						<img :src="ins.logo" />
					</figure>
				</div>
				<div class="column">
					{{ ins.name }}
				</div>
				-->
				<div class="column">
					{{ ins }}
				</div>
				<div class="column is-1">
					<b-button type="is-danger" icon-left="delete" @click="deleteInstitute(ins.id)">
						Delete
					</b-button>
				</div>
			</div>
		</div>
		
		<!--
		<div class="tile is-ancestor">
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child box">
      <p class="title">First</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
    </div>
    <div class="tile is-child box">
      <p class="title">Two</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
    </div>
  </div>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <p class="title">Three</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
      <p>Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.</p>
      <p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p>
    </div>
  </div>
</div>
-->

</div>
	</div>
</template>

<script>
export default {
	middleware: 'authSiteAdmin',
	async asyncData ({ $axios }) {
		const data = await $axios.$get('/api/institutes');
		return { institutes: data.institutes };
	},
	methods: {
		async deleteInstitute(insId) {
			const data = await this.$axios.$post('/api/institutes/delete', { id: insId });
			this.institutes = this.institutes.filter(ins => ins.id !== data.id);
		}
	}
}
</script>
