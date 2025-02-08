<script lang="ts">
	import NumberInput from '$lib/components/NumberInput.svelte';
	let price: number = $state(0);
	let loan: number = $state(0);
	let pantbrev: number = $state(0);
	let cost = $derived(Math.abs(loan - pantbrev));
</script>

<div class="grid grid-cols-8 flex-col gap-16">
	<div class="col-span-8">
		<h1>Pantbrev</h1>

		<p>Räkna fram vad ditt hus kommer kosta</p>
	</div>
	<form class="col-span-2 grid grid-cols-2 gap-2">
		<NumberInput name="price" label="Pris" bind:value={price} />
		<NumberInput name="pantbrev" label="Befintligt pantbrev" bind:value={pantbrev} />
		<NumberInput name="loan" label="Lånebelopp" bind:value={loan} />
	</form>
	<div>
		<h2>Pantbrevskostnad</h2>
		<p>{cost} kr</p>
	</div>
</div>
