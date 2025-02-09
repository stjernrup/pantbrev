<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="m-8 grid grid-cols-8 flex-col gap-4">
	{@render children()}
</div>
