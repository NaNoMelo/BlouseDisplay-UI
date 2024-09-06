<script lang="ts">
	import { onDestroy } from 'svelte';
	import ColorPicker from 'svelte-awesome-color-picker';
	import type { PageData } from './$types';
	import CountDown from './CountDown.svelte';

	let x = 0;
	let y = 0;

	let cols = 32;
	let rows = 16;

	let color = '#000000';
	$: color = color.toUpperCase().slice(0, 7);

	export { x as selectedX, y as selectedY };
	export { cols, rows };
	export let data: PageData;

	let isDisabled = false;
	$: isDisabled = data.lastPixel + data.timeout >= Date.now();
	const interval = setInterval(() => {
		isDisabled = data.lastPixel + data.timeout >= Date.now();
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});

	function handleUp() {
		y--;
		if (y < 0) {
			y = rows - 1;
		}
	}

	function handleDown() {
		y++;
		y %= rows;
	}

	function handleLeft() {
		x--;
		if (x < 0) {
			x = cols - 1;
		}
	}

	function handleRight() {
		x++;
		x %= cols;
	}
</script>

<form method="POST" class="container">
	<button type="button" class="button up" on:click={handleUp}>UP</button>
	<button type="button" class="button left" on:click={handleLeft}>LEFT</button>
	<button type="button" class="button right" on:click={handleRight}>RIGHT</button>
	<button type="button" class="button down" on:click={handleDown}>DOWN</button>

	<input type="submit" id="confirm" value="CONFIRM" class="button confirm" disabled={isDisabled} />

	<div class="input-container x">
		<label for="x">x:</label>
		<input type="number" id="x" name="x" bind:value={x} min="0" max={cols} step="1" />
	</div>

	<div class="input-container y">
		<label for="y">y:</label>
		<input type="number" id="y" name="y" bind:value={y} min="0" max={rows} step="1" />
	</div>

	<div class="picker">
		<ColorPicker bind:hex={color} isDialog={false} --picker-height="100px" --picker-width="130px" />
	</div>

	<div class="color" style="--color:{color};">
		<input type="hidden" name="hex" value={color} />
	</div>
	<div class="input-container timeout">
		<CountDown lastPixel={data.lastPixel} timeout={data.timeout} />
	</div>
</form>

<style>
	.container {
		display: grid;
		grid-template-areas:
			'up left right '
			'down x y'
			'picker picker color'
			'picker picker confirm'
			'picker picker timeout';
		gap: 10px;
		width: 300px;
	}

	.button {
		background-color: #0095ff;
		color: white;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-weight: bold;
		font-size: 16px;
		text-align: center;
	}

	.button:active {
		background-color: #007acc;
	}

	.button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}

	.input-container {
		display: flex;
		align-items: center;
		background-color: #777;
		padding: 5px;
		border-radius: 5px;
	}

	.input-container label {
		color: white;
		margin-right: 5px;
		font-size: 16px;
	}

	.input-container input {
		width: 50px;
		padding: 5px;
		border: none;
		border-radius: 5px;
	}

	.up {
		grid-area: up;
	}
	.left {
		grid-area: left;
	}
	.right {
		grid-area: right;
	}
	.down {
		grid-area: down;
	}
	.x {
		grid-area: x;
	}
	.y {
		grid-area: y;
	}

	.picker {
		grid-area: picker;
	}

	.color {
		grid-area: color;
		height: 50px;
		width: 50px;
		border: #404040 2px solid;
		border-radius: 10px;
		background-color: var(--color);
	}

	.confirm {
		grid-area: confirm;
	}
</style>
