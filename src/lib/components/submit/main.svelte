<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */

	import { fly } from 'svelte/transition';

	import { type Language } from '$lib/types/languages';
	import CodeEditor from '../codeEditor/main.svelte';

	import Button from './button.svelte';
	import handleSubmit from './submitHandler';

	import LanguageSelector from './languages.svelte';
	import { ChevronDown, Icon, XMark } from 'svelte-hero-icons';

	export let problem: string;

	let className: string;
	export { className as class };

	let showDropDown = false;
	let showEditor = false;

	let sauce: string;
	let fileName: string | undefined;

	let targetCompiler: Language | undefined;
	$: compilerName = targetCompiler?.compiler;

	async function readFile(e: any) {
		const target = e.target.files.item(0);

		sauce = await target.text();
		fileName = target.name;

		showDropDown = false;
		showEditor = true;
	}
</script>

<div class={`${className} relative`}>
	<div class="content flex grow space-x-2">
		<Button bind:showDropDown bind:targetLanguage={targetCompiler} />

		<button title="Toggle editor" class="editor-opener" on:click={() => (showEditor = !showEditor)}>
			<div class="size-5 duration-200" class:rotate-180={showEditor}>
				<Icon src={ChevronDown} />
			</div>
		</button>

		<label class="file-uploader" for="file-uploader"> Choose a file. </label>
		<button
			class="rounded bg-red-500 px-2 text-white hover:bg-red-600"
			on:click={() => handleSubmit(problem, sauce, targetCompiler)}
		>
			Submit
		</button>
	</div>
	<input type="file" on:change={readFile} id="file-uploader" />

	{#if showEditor}
		<div class="editor-wrapper" transition:fly={{ duration: 200, y: -20 }}>
			<div class="m-1 flex items-center justify-between" dir="ltr">
				<p class="ml-2 truncate">File name: {fileName || '[unknown]'}</p>
				<button class="close-button" on:click={() => (showEditor = false)}>
					<Icon src={XMark} class="size-6" />
				</button>
			</div>

			<div class="h-full w-full overflow-hidden border-t" dir="ltr">
				<CodeEditor bind:source={sauce} bind:language={compilerName} />
			</div>
		</div>
	{/if}

	<LanguageSelector bind:show={showDropDown} bind:targetLanguage={targetCompiler} />
</div>

<style>
	button,
	.file-uploader {
		@apply select-none transition-colors duration-200;
	}

	.editor-opener {
		@apply justify-center rounded border bg-white px-[0.4rem] hover:bg-gray-50;
	}

	.close-button {
		@apply rounded p-[0.1rem] hover:bg-red-500 hover:text-white;
	}

	.editor-wrapper {
		@apply overflow-hidden border bg-white shadow;
		@apply h-[300px] min-h-[100px] w-full min-w-[150px] resize;
		@apply rounded-lg rounded-bl-none;
		@apply absolute right-0 top-14;
		direction: rtl;
	}

	input[type='file'] {
		display: none;
	}

	.file-uploader {
		@apply min-w-fit cursor-pointer rounded border border-red-200 bg-red-100 p-1 px-2 hover:bg-red-200;
	}
</style>
