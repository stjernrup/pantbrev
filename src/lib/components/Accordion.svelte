<script lang="ts">
	let { text1, text2, listTitle }: { text1: string; text2: string | string[]; listTitle?: string } =
		$props();
	let open = $state(false);
</script>

<button class="text-left hover:cursor-pointer" onclick={() => (open = !open)}>
	<div class="flex w-full justify-between font-bold hover:cursor-pointer">
		<span>
			{text1}
		</span>
		<span class="mr-2 text-gray-500">{open ? '–' : '+'}</span>
	</div>
	<div class="{open ? '' : 'hidden'} mt-1 mb-2">
		{#if typeof text2 === 'string'}
			{text2}
		{:else}
			{#if listTitle}
				<p>{listTitle}</p>
			{/if}
			<ul class="list-inside list-disc">
				{#each text2 as text}
					<li>
						{text}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</button>
