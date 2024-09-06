<script lang="ts">
	let hex: string = '#000000'; // Default color
	export { hex as color };
	export let selectedX: number;
	export let selectedY: number;
	export let x: number;
	export let y: number;
</script>

<button
	class="pixel {selectedX === x && selectedY === y ? 'selected' : ''}"
	style="background-color: {hex};"
	on:click={() => {
		selectedX = x;
		selectedY = y;
		//console.log(`Selected pixel: (${selectedX}, ${selectedY}) with color ${hex}`);
	}}
></button>

<style>
	.pixel {
		/*width: 50px;
		height: 50px;*/
		border: 1px solid #000;
		cursor: pointer;
	}

	.pixel.selected {
		border: 3px solid red;
	}
</style>
