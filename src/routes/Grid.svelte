<script lang="ts">
	import Pixel from './Pixel.svelte';

	let cols = 32;
	let rows = 16;
	let grid: string[][] = Array(cols).fill(Array(rows).fill('#000000'));
	let selectedX: number = 0;
	let selectedY: number = 0;

	export { cols, rows, grid, selectedX, selectedY };
</script>

<div class="grid-container">
	<div class="grid" style="--rows:{rows};--cols:{cols};">
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each Array.from({ length: rows }) as _, rowIndex}
			<div class="row">
				{#each grid as column, colIndex}
					<Pixel bind:selectedX bind:selectedY color={column[rowIndex]} x={colIndex} y={rowIndex} />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.grid-container {
		padding: 10px;
		background-color: #202020;
		display: inline-block; /* Ensure it wraps tightly around the grid */
		border: 2px solid #ccc; /* Add a border */
		border-radius: 15px; /* Rounded edges */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
	}

	.grid {
		display: grid;
		grid-template-rows: repeat(var(--rows), 30px); /* 16 rows of 30px height */
		grid-template-columns: repeat(var(--cols), 30px); /* 32 columns of 30px width */
		gap: 2px; /* Optional: space between pixels */
		background-color: gray; /* Background color for the grid itself */
		border-radius: 10px; /* Rounded edges for the grid itself */
		/*overflow: hidden;  Ensure the grid content stays within rounded corners */
	}

	.row {
		display: contents; /* Allows the row to be part of the grid layout */
	}
</style>
