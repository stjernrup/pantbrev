<script lang="ts">
	let { text, value }: { text: string; value: number } = $props();
</script>

<div>
	<h2>{text}</h2>
	<p class="font-bold">
		{Math.round(value).toLocaleString('sv')} kr
	</p>
</div>
