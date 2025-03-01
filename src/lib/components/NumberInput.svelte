<script lang="ts">
	let {
		label,
		value = $bindable(),
		name
	}: { label: string; value: number; name: string } = $props();
</script>

<label for={name} class="col-span-2 my-auto">{label}</label>
<input bind:value {name} class="col-span-2 m-0 rounded-md border-2 p-2" type="number" />
