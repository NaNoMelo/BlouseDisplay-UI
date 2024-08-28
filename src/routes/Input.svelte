<script lang="ts">
	let x = 0;
	let y = 0;

	let cols = 32;
	let rows = 16;

	export { x as selectedX, y as selectedY };
	export { cols, rows };

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

<div class="container">
	<button class="button up" on:click={handleUp}>UP</button>
	<button class="button left" on:click={handleLeft}>LEFT</button>
	<button class="button right" on:click={handleRight}>RIGHT</button>
	<button class="button down" on:click={handleDown}>DOWN</button>

	<div class="input-container x">
		<label for="x">x:</label>
		<input type="number" id="x" bind:value={x} min="0" max={cols} step="1" />
	</div>

	<div class="input-container y">
		<label for="y">y:</label>
		<input type="number" id="y" bind:value={y} min="0" max={rows} step="1" />
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-areas:
			'up left right'
			'down x y';
		gap: 10px;
		justify-content: center;
		align-items: center;
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
</style>
