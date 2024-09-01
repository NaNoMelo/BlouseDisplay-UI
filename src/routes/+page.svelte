<script>
	import Grid from './Grid.svelte';
	import Input from './Input.svelte';

	let selectedX = 0;
	let selectedY = 0;
	let rows = 16;
	let cols = 32;

	$: console.log(selectedX, selectedY);
</script>

<Grid bind:selectedX bind:selectedY {cols} {rows} />
<Input bind:selectedX bind:selectedY {cols} {rows} />

<style>
</style>
