<template>
	<footer class="footer footer-black has-text-centered">
	  <div>
		<p>Made with <b-icon icon="heart" style="color:pink;" size="is-small" /> using <b-icon icon="vuejs" style="color:green;" size="is-small" /> and Bulma.io</p>
	  </div>
	  <br>
	  <div class="columns">
		<div class="column is-half">
			<p>Find me on the place you hang around!</p>
			<a href="https://www.github.com/TheLearneer">
				<b-icon icon="github-circle" />
			</a>
			<a href="https://twitter.com/bsantosh909">
				<b-icon icon="twitter-circle" />
			</a>
		</div>
		<div class="column">
			Other stuffs here...
		</div>
	  </div>
	</footer>
</template>

<script>
export default {
	name: 'AppFooter'
};
</script>

<style>
.footer-black {
	background-color: hsl(0, 0%, 14%);
	color: hsl(0, 0%, 86%);
}
</style>