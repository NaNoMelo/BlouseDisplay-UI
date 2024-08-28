<script lang="ts">
	let hex: string = '#000000'; // Default color
	let selected: boolean = false;
	export { hex as color };
	export { selected };
</script>

<div class="pixel" style="background-color: {hex};" class:selected></div>

<style>
	.pixel {
		/*width: 50px;
		height: 50px;*/
		border: 1px solid #000;
		cursor: pointer;
	}

	.pixel.selected {
		border: 3px solid red; /* Change border to indicate selection */
	}
</style>
