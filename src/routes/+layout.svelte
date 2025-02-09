<script lang="ts">
	import '../app.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectAnalytics();
	injectSpeedInsights();

	let { children } = $props();
</script>

<div class="m-8 grid grid-cols-8 flex-col gap-4">
	{@render children()}
</div>
