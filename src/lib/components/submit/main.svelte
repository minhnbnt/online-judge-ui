<script lang="ts">
	import { fly } from 'svelte/transition';

	import { type Language } from '$lib/utils/languages';
	import CodeEditor from '../codeEditor/main.svelte';

	import Button from './button.svelte';
	import handleSubmit from './submitHandler';
	import LanguageSelector from './languages.svelte';

	export let problem: string;

	let className: string;
	export { className as class };

	let showDropDown = false;
	let sauce: string;

	let targetCompiler: Language | undefined;
	$: compilerName = targetCompiler?.compiler;

	/* eslint-disable @typescript-eslint/no-explicit-any */
	async function readFile(e: any) {
		const target = e.target.files.item(0);
		sauce = await target.text();

		showDropDown = false;
	}
</script>

<div class={`${className} relative`}>
	<div class="content flex grow space-x-2">
		<Button bind:showDropDown bind:targetLanguage={targetCompiler} />

		<label class="file-uploader" for="file-uploader"> Choose a file. </label>
		<button
			class="rounded bg-red-500 px-2 text-white hover:bg-red-600"
			on:click={() => handleSubmit(problem, sauce, targetCompiler)}
		>
			Submit
		</button>
	</div>
	<input type="file" on:change={readFile} id="file-uploader" />

	{#if targetCompiler}
		<div
			transition:fly={{ duration: 200, y: -20 }}
			class="absolute top-14 h-[300px] w-full overflow-hidden rounded-lg border bg-white shadow"
		>
			<CodeEditor bind:source={sauce} bind:language={compilerName} />
		</div>
	{/if}

	<LanguageSelector bind:show={showDropDown} bind:targetLanguage={targetCompiler} />
</div>

<style>
	input[type='file'] {
		display: none;
	}

	.file-uploader {
		@apply min-w-fit cursor-pointer rounded border border-red-200 bg-red-100 p-1 px-2 hover:bg-red-200;
	}
</style>
