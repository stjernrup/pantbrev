<script lang="ts">
	import Cost from '$lib/components/Cost.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	let price: number = $state(1000000);

	let loan: number = $state(1000000 * 0.85);
	let pantbrev: number = $state(0);
	let pantbrevsCost = $derived((loan - pantbrev) * 0.02);
	let lagfartsCost = $derived(price * 0.015);
	let toPayCash = $derived(pantbrevsCost + lagfartsCost + price - loan);
</script>

<div class="col-span-8 flex flex-col gap-1">
	<h1 class="text-2xl font-bold">Pantbrev</h1>
	<p>Räkna fram vad ditt hus kommer kosta</p>
</div>

<form
	onsubmit={(e) => {
		e.preventDefault();
	}}
	class="col-span-8 grid grid-cols-2 gap-2 md:col-span-3"
>
	<NumberInput name="price" label="Pris" bind:value={price} />
	<NumberInput name="pantbrev" label="Befintligt pantbrev" bind:value={pantbrev} />
	<NumberInput name="loan" label="Lånebelopp" bind:value={loan} />
</form>
<div class="md:col-span-1"></div>
<div class="col-span-8 flex flex-col gap-2 rounded-md border-1 p-1 md:col-span-4">
	<Cost text="Pantbrevskostnad" value={pantbrevsCost > 0 ? pantbrevsCost : 0} />
	<Cost text="Lagfartsavgift" value={lagfartsCost > 0 ? lagfartsCost : 0} />
	<Cost text="Att betala kontant" value={toPayCash > 0 ? toPayCash : 0} />
</div>
