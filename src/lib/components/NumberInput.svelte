<script lang="ts">
	let {
		label,
		value = $bindable(),
		name,
		span = 2
	}: { label: string; value: number; name: string; span?: number } = $props();
</script>

<label for={name} class="col-span-2 my-auto">{label}</label>
<input
	bind:value
	{name}
	class="col-span-{span} m-0 rounded-md border-1 border-gray-500 p-2"
	type="number"
/>
