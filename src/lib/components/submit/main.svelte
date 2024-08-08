<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ChevronDown, Icon, XMark } from 'svelte-hero-icons';

	import handleSubmit from './submitHandler';
	import CodeEditor from '../codeEditor/main.svelte';
	import LanguageSelector from './languages.svelte';
	import { type Language } from '$lib/types/languages';

	export let problem: string;

	let className: string;
	export { className as class };

	let showDropDown = false;
	let showEditor = false;

	let sauce: string;
	let fileName: string | undefined;

	let targetCompiler: Language | undefined;
	$: compilerName = targetCompiler?.compiler;
	$: if (showDropDown) showEditor = false;

	function toggleEditor() {
		showEditor = !showEditor;
		showDropDown = false;
	}

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
		<LanguageSelector bind:showDropDown bind:targetLanguage={targetCompiler} />

		<button title="Toggle editor" class="editor-opener" on:click={toggleEditor}>
			<div class="size-5 duration-200" class:rotate-180={showEditor}>
				<Icon src={ChevronDown} />
			</div>
		</button>

		<label class="file-uploader" for="file-uploader"> Choose a file. </label>
		<button type="submit" on:click={() => handleSubmit(problem, sauce, targetCompiler)}>
			Submit
		</button>
	</div>
	<input type="file" on:change={readFile} id="file-uploader" />

	{#if showEditor}
		<div class="editor-wrapper" dir="rtl" transition:fly={{ duration: 200, y: -20 }}>
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
</div>

<style>
	* {
		@apply dark:border-gray-500;
	}

	button,
	.file-uploader {
		@apply select-none transition-colors duration-200;
	}

	button[type='submit'] {
		@apply rounded bg-red-500 px-2 text-white hover:bg-red-600;
		@apply dark:border dark:bg-red-800 dark:hover:bg-red-700;
	}

	.editor-opener {
		@apply justify-center rounded border bg-white px-[0.4rem] hover:bg-gray-50;
		@apply dark:bg-gray-800 dark:hover:bg-gray-700;
	}

	.close-button {
		@apply rounded p-[0.1rem] hover:bg-red-500 hover:text-white;
		@apply dark:hover:bg-red-700;
	}

	.editor-wrapper {
		@apply flex flex-col;
		@apply z-[100] h-[300px] min-h-[100px] w-full min-w-[150px] resize;
		@apply rounded-lg rounded-bl-none;
		@apply absolute right-0 top-14;
		@apply overflow-hidden border bg-white shadow;
		@apply dark:bg-gray-900 dark:text-white;
	}

	input[type='file'] {
		display: none;
	}

	.file-uploader {
		@apply min-w-fit cursor-pointer rounded border p-1 px-2;
		@apply border-red-200 bg-red-100 hover:bg-red-200;
		@apply dark:border-gray-500 dark:bg-red-950 dark:hover:bg-red-900;
	}
</style>
