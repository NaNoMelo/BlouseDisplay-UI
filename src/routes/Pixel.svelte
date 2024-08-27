<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';

	let hex: string = '#000000'; // Default color
	let showPicker: boolean = false;

	function selectPixel() {
		showPicker = true;
	}

	function closePicker() {
		showPicker = false;
	}

	export { hex as color };
</script>

<button class="pixel" on:click={selectPixel} on:blur={closePicker} style="background-color: {hex};">
	{#if showPicker}
		<div class="picker-container">
			<ColorPicker bind:hex isDialog={false} />
		</div>
	{/if}
</button>

<style>
	.pixel {
		/*width: 50px;
		height: 50px;*/
		border: 1px solid #000;
		cursor: pointer;
	}

	/*.picker-container {
		position: absolute;
		z-index: 1000;
	}*/
</style>
