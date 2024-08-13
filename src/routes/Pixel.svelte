<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';

	let hex: string = '#000000'; // Default color
	let showPicker: boolean = false;

	function togglePicker(): void {
		showPicker = !showPicker;
	}

	function handleColorChange(event: CustomEvent<ColorPicker>): void {
		hex = event.detail.hex;
		showPicker = false;
	}
</script>

<button type="button" class="pixel" on:click={togglePicker} bind:value={styles['hex']}></button>

{#if showPicker}
	<div class="picker-container">
		<ColorPicker bind:hex isDialog={false} />
	</div>
{/if}

<style>
	.pixel {
		width: 50px;
		height: 50px;
		background-color: var(--hex, red);
		border: 1px solid #000;
		cursor: pointer;
	}

	.picker-container {
		position: absolute;
		z-index: 1000;
	}
</style>
