<script lang="ts">
	import { onDestroy } from 'svelte';

	export let lastPixel: number;
	export let timeout: number;

	let remainingTime: number;
	$: remainingTime = Math.max(lastPixel + timeout - Date.now(), 0);

	const formatTime = (remainingTime: number) => {
		const seconds = Math.floor(remainingTime / 1000);
		const secs = seconds % 60;
		const minutes = Math.floor(seconds / 60);
		return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

	const interval = setInterval(() => {
		remainingTime = Math.max(lastPixel + timeout - Date.now(), 0);
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div>
	{#if remainingTime > 0}
		{formatTime(remainingTime)}
	{:else}
		Pixel prêt !
	{/if}
</div>
