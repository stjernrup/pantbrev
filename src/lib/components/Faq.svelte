<script lang="ts">
	import Accordion from './Accordion.svelte';
</script>

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
