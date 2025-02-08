<script lang="ts">
	import NumberInput from '$lib/components/NumberInput.svelte';
	let price: number = $state(0);
	let loan: number = $state(0);
	let pantbrev: number = $state(0);
	let pantbrevsCost = $derived(Math.abs(loan - pantbrev) * 0.02);
	let lagfartsCost = $derived(price * 0.015);
	let toPayCash = $derived(pantbrevsCost + lagfartsCost + price - loan);
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
		<p>{pantbrevsCost.toLocaleString()} kr</p>
	</div>
	<div>
		<h2>Lagfartsavgift</h2>
		<p>{lagfartsCost.toLocaleString()} kr</p>
	</div>
	<div>
		<h2>Att betala kontant</h2>
		<p>{toPayCash.toLocaleString()} kr</p>
	</div>
</div>
