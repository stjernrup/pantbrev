<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import Cost from '$lib/components/Cost.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Percent from '$lib/components/Percent.svelte';
	import { calculateRepaymentNeed } from '$lib/loan/calc';
	let price: number = $state(10000000);

	let loan: number = $state(10000000 * 0.85);
	let pantbrev: number = $state(0);
	let pantbrevsCost = $derived((loan - pantbrev) * 0.02 + 375);
	let lagfartsCost = $derived(price * 0.015 + 825);
	let toPayCash = $derived(pantbrevsCost + lagfartsCost + price - loan);

	let interestRate: number = $state(3);
	let salary: number = $state(100000);
	let operatingCost: number = $state(5000);

	let repaymentNeedPercent = $derived(
		calculateRepaymentNeed({
			price,
			loan,
			salary
		})
	);
	let repaymentMonthly = $derived((loan * (repaymentNeedPercent / 100)) / 12);
	let interestRateCostMonthly = $derived((loan * (interestRate / 100)) / 12);
	let totalMonthlyCost = $derived(repaymentMonthly + interestRateCostMonthly + operatingCost);
</script>

<div class="col-span-8 flex flex-col gap-1">
	<h1 class="text-2xl font-bold">Huskostnader</h1>
	<p>Räkna vad ditt hus kommer kosta.</p>
</div>

<form
	onsubmit={(e) => {
		e.preventDefault();
	}}
	class="col-span-8 grid grid-cols-2 gap-2 md:col-span-2"
>
	<NumberInput name="price" label="Pris" bind:value={price} />
	<NumberInput name="pantbrev" label="Befintligt pantbrev" bind:value={pantbrev} />
	<NumberInput name="loan" label="Lånebelopp" bind:value={loan} span={1} />
	<div class="flex">
		<button
			class="rounded-4xl border-2 border-gray-500 p-1 hover:cursor-pointer hover:bg-gray-200"
			onclick={() => {
				loan = price * 0.85;
			}}>85%</button
		>
	</div>
</form>
<div
	class="col-span-8 flex flex-wrap gap-4 rounded-md border-1 border-gray-500 p-1 sm:grid-cols-3 md:col-span-4"
>
	<Cost text="Pris" value={price} />
	<Cost text="Befintligt pantbrev" value={pantbrev} />
	<Cost text="Lånebelopp" value={loan} />
	<Percent text="Belåningsgrad" value={Math.round((loan / price) * 100)} />
	<Percent text="Skuldkvot" value={Math.round((loan / (salary * 12)) * 100)} />
	<Cost text="Pantbrevskostnad" value={pantbrevsCost > 0 ? pantbrevsCost : 0} />
	<Cost text="Lagfartsavgift" value={lagfartsCost > 0 ? lagfartsCost : 0} />
	<Cost text="Att betala kontant" value={toPayCash > 0 ? toPayCash : 0} />
</div>
<div class="m-2"></div>
<div class="col-span-8 flex flex-col gap-1">
	<h2 class="text-2xl font-bold">Månadskostnad</h2>
</div>
<form
	onsubmit={(e) => {
		e.preventDefault();
	}}
	class="col-span-8 grid grid-cols-2 gap-2 md:col-span-2"
>
	<NumberInput name="interest-rate" label="Ränta (%)" bind:value={interestRate} />
	<NumberInput name="salary" label="Månadsinkomst brutto" bind:value={salary} />
	<NumberInput name="monthly-cost" label="Driftskostnad" bind:value={operatingCost} />
</form>

<div
	class="col-span-8 flex flex-wrap gap-4 rounded-md border-1 border-gray-500 p-1 sm:grid-cols-3 md:col-span-4"
>
	<Percent text="Ränta" value={interestRate} />
	<Cost text="Räntekostnad" value={interestRateCostMonthly} />
	<Cost text="Månadsinkomst" value={salary} />
	<Percent text="Amorteringskrav" value={repaymentNeedPercent} />
	<Cost text="Amortering" value={repaymentMonthly} />
	<Cost text="Driftskostnad" value={operatingCost} />
	<Cost text="Total månadskostnad" value={totalMonthlyCost} />
</div>

<div class="col-span-8 flex flex-col gap-1">
	<h3 class="text-2xl font-bold">Vanliga frågor</h3>
</div>
<Faq />
