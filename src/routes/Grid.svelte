<script lang="ts">
	import Pixel from './Pixel.svelte';

	const rows = 16;
	const cols = 32;
	let grid = Array(rows).fill(Array(cols).fill('#000000')); // Initialize with white color
</script>

<div class="grid" style="--rows:{rows};--cols:{cols};">
	{#each grid as row, rowIndex}
		<div class="row">
			{#each row as color, colIndex}
				<Pixel {color} />
			{/each}
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-rows: repeat(var(--rows), 20px); /* 16 rows of 20px height */
		grid-template-columns: repeat(var(--cols), 20px); /* 32 columns of 20px width */
		gap: 1px; /* Optional: space between pixels */
	}
	.row {
		display: contents; /* Allows the row to be part of the grid layout */
	}
</style>
