<script lang="ts">
	let {
		label,
		value = $bindable(),
		name
	}: { label: string; value: number; name: string } = $props();
</script>

<label for={name} class="col-span-1 my-auto">{label}</label>
<input type="number" bind:value {name} class="col-span-2 rounded-md border-2 p-2" />
