<script lang="ts">
	import { fade } from 'svelte/transition';

	import { type Language } from '$lib/utils/languages';
	import CodeEditor from '../codeEditor/main.svelte';

	import Button from './button.svelte';
	import handleSubmit from './submitHandler';
	import LanguageSelector from './languages.svelte';

	export let problem: string;

	let showDropDown = false;
	let sauce: string;

	let targetLanguage: Language | undefined;
	$: compilerName = targetLanguage?.compiler;

	function onSubmit() {
		// TODO: handle on no input file
		if (targetLanguage === undefined) {
			return;
		}

		handleSubmit(problem, sauce, targetLanguage.compiler);
	}

	/* eslint-disable @typescript-eslint/no-explicit-any */
	async function readFile(e: any) {
		const target = e.target.files.item(0);
		sauce = await target.text();

		showDropDown = false;
	}
</script>

<div class="relative w-full">
	<div class="flex space-x-2">
		<Button bind:showDropDown bind:targetLanguage />

		<label class="file-uploader" for="file-uploader"> Choose a file. </label>
		<button class="rounded bg-red-500 px-2 text-white hover:bg-red-600" on:click={onSubmit}>
			Submit
		</button>
	</div>
	<input type="file" on:change={readFile} id="file-uploader" />

	{#if sauce}
		<div
			class="absolute top-14 h-[300px] w-full overflow-hidden rounded-lg border bg-white shadow"
			transition:fade={{ duration: 200 }}
		>
			<CodeEditor bind:source={sauce} bind:language={compilerName} />
		</div>
	{/if}

	<LanguageSelector bind:show={showDropDown} bind:targetLanguage />
</div>

<style>
	input[type='file'] {
		display: none;
	}

	.file-uploader {
		@apply min-w-fit cursor-pointer rounded bg-red-200 p-1 px-2;
	}
</style>
