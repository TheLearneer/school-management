<template>
	<div class="section">
		{{ $auth.user }}
	</div>
</template>

<script>
export default {
	middleware: 'authentication'
}
</script>
