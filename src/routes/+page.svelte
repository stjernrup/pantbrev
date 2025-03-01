<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import Cost from '$lib/components/Cost.svelte';
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
	let totalMonthlyCost = $derived(repaymentMonthly + interestRateCostMonthly);
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
	<NumberInput name="loan" label="Lånebelopp" bind:value={loan} />
</form>
<div
	class="col-span-8 flex flex-wrap gap-4 rounded-md border-1 border-gray-500 p-1 sm:grid-cols-3 md:col-span-4"
>
	<Cost text="Pris" value={price} />
	<Cost text="Befintligt pantbrev" value={pantbrev} />
	<Cost text="Lånebelopp" value={loan} />
	<Percent text="Belåningsgrad" value={Math.round((loan / price) * 100)} />
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
	<NumberInput name="salary" label="Bruttoinkomst" bind:value={salary} />
	<NumberInput name="monthly-cost" label="Driftskostnad" bind:value={operatingCost} />
</form>

<div
	class="col-span-8 flex flex-wrap gap-4 rounded-md border-1 border-gray-500 p-1 sm:grid-cols-3 md:col-span-4"
>
	<Percent text="Ränta" value={interestRate} />
	<Cost text="Räntekostnad" value={interestRateCostMonthly} />
	<Cost text="Bruttoinkomst" value={salary} />
	<Percent text="Amorteringskrav" value={repaymentNeedPercent} />
	<Cost text="Amortering" value={repaymentMonthly} />
	<Cost text="Driftskostnad" value={operatingCost} />
	<Cost text="Total månadskostnad" value={totalMonthlyCost} />
</div>

<div class="col-span-8 flex flex-col gap-1">
	<h3 class="text-2xl font-bold">Vanliga frågor</h3>
</div>

<div class="col-span-8 flex flex-col gap-2 rounded-md border-1 border-gray-500 p-2">
	<Accordion
		text1="Vad är pantbrev?"
		text2="Pantbrev är en säkerhet för bolånet och registreras på fastigheten. Om det redan finns pantbrev motsvarande ditt lånebelopp behöver du inte ta ut nya."
	></Accordion>
	<hr class="text-gray-300" />
	<Accordion
		text1="Vad kostar pantbrev?"
		text2="2 % av det belopp du vill ta ut i nya pantbrev samt en administrativ avgift till Lantmäteriet på 375 kr."
	></Accordion>
	<hr class="text-gray-300" />
	<Accordion text1="Vad är lagfart" text2="Lagfarten registrerar dig som ägare av fastigheten."
	></Accordion>
	<hr class="text-gray-300" />
	<Accordion
		text1="Vad kostar lagfart?"
		text2="1,5% av köpeskillingen eller taxeringsvärdet (det högsta av dem) samt en administrativ avgift till Lantmäteriet på 825 kr."
	></Accordion>
	<hr class="text-gray-300" />
	<Accordion
		text1="Vad är amorteringskravet?"
		text2={[
			'Om du lånar över 70 % av bostadens värde → Amortering 2 % per år.',
			'Om du lånar mellan 50 - 70 % av bostadens värde → Amortering 1 % per år.',
			'Om du lånar under 50% → Ingen tvingande amortering.',
			'Har du en hög belåningsgrad och dessutom en skuldkvot (lån i förhållande till inkomst) över 4,5 gånger bruttoinkomsten, tillkommer ytterligare 1 % amorteringskrav.'
		]}
	></Accordion>
	<hr class="text-gray-300" />
	<Accordion
		text1="Vilka driftkostnader bör jag räkna med?"
		text2={[
			'El och uppvärmning',
			'Vatten och avlopp',
			'Sophämtning',
			'Fastighetsförsäkring',
			'Väg- och samfällighetsavgifter'
		]}
		listTitle="Driftkostnader varierar, men vanliga utgifter är:"
	></Accordion>
	<hr class="text-gray-300" />
	<Accordion
		text1="Behöver jag betala fastighetsskatt?"
		text2={'Nej, men du betalar en fastighetsavgift som är 0,75% av taxeringsvärdet, med ett takbelopp (2024: max 9 287 kr/år).'}
	></Accordion>
</div>
