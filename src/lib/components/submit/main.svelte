<script lang="ts">
	import LanguageSelector from './languages.svelte';

	import { type Language } from '$lib/utils/languages';
	import Button from './button.svelte';

	let showDropDown = false;
	let targetLanguage: Language | undefined;

	/* eslint-disable @typescript-eslint/no-explicit-any */
	async function readFile(e: any) {
		const target = e.target.files.item(0);
		const text = await target.text();

		// TODO: handle incoming input
		console.log(text);
	}
</script>

<div class="relative w-[400px]">
	<LanguageSelector bind:show={showDropDown} bind:targetLanguage />

	<div class="select-none space-y-2 rounded-lg bg-white p-2 shadow">
		<div class="flex space-x-2">
			<Button bind:showDropDown bind:targetLanguage />

			<label class="file-uploader" for="file-uploader"> Choose a file. </label>
			<button class="rounded bg-red-500 px-2 text-white hover:bg-red-600"> Submit </button>
		</div>
		<input type="file" on:change={readFile} id="file-uploader" />
	</div>
</div>

<style>
	input[type='file'] {
		display: none;
	}

	.file-uploader {
		@apply min-w-fit cursor-pointer rounded bg-red-200 p-1 px-2;
	}
</style>
