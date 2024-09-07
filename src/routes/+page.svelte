<script lang="ts">
	import type { PageData } from './$types';
	import Grid from './Grid.svelte';
	import Input from './Input.svelte';
	export let data: PageData;

	let selectedX = 0;
	let selectedY = 0;
	let rows = 16;
	let cols = 32;
	//$: console.log(data.grid);
</script>

<Grid bind:selectedX bind:selectedY {cols} {rows} bind:grid={data.grid} />
<Input bind:selectedX bind:selectedY {cols} {rows} {data} />
