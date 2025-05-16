<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { ChevronDown, Icon, XMark } from 'svelte-hero-icons';

	import handleSubmit from '$lib/utils/handleSubmit';
	import LanguageSelector from './languages.svelte';
	import { type Language } from '$lib/types/languages';
	import Loading from '$lib/assets/loading.svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		problem: string;
		class: string;
	}

	const { problem, class: className }: Props = $props();

	let showDropDown = $state(false);
	let showEditor = $state(false);

	let sauce = $state<string>('');
	let fileName = $state<string | undefined>();

	let targetCompiler = $state<Language | undefined>();

	const compilerName = $derived(targetCompiler?.compiler);
	$effect(() => {
		if (showDropDown) {
			showEditor = false;
		}
	});

	function toggleEditor() {
		showEditor = !showEditor;
		showDropDown = false;
	}

	async function onSubmit() {
		handleSubmit(problem, sauce, targetCompiler);
	}

	async function readFile(e: any) {
		const target = e.target.files.item(0);

		sauce = await target.text();
		fileName = target.name;

		showDropDown = false;
		showEditor = true;
	}

	const buttonClassName = 'select-none transition-colors duration-200 dark:border-gray-500';
	const submitButtonClassName = twMerge(
		buttonClassName,
		'rounded bg-red-500 px-2 text-white hover:bg-red-600',
		'dark:border dark:bg-red-800 dark:hover:bg-red-700'
	);

	const operEdittonButtonClassName = twMerge(
		buttonClassName,
		'justify-center rounded border bg-white px-[0.4rem] hover:bg-gray-50',
		'dark:bg-gray-800 dark:hover:bg-gray-700'
	);

	const closeButtonClassName = twMerge(
		buttonClassName,
		'rounded p-[0.1rem] hover:bg-red-500 hover:text-white',
		'dark:hover:bg-red-700'
	);

	const editorWrapperClassName = twMerge(
		'flex flex-col',
		'z-[100] h-[300px] min-h-[100px] w-full min-w-[150px] resize',
		'rounded-lg rounded-bl-none',
		'absolute right-0 top-14',
		'overflow-hidden border bg-white shadow',
		'dark:bg-gray-900 dark:text-white dark:border-gray-500'
	);

	const fileUploaderButtonClassName = twMerge(
		'min-w-fit cursor-pointer rounded border p-1 px-2',
		'border-red-200 bg-red-100 hover:bg-red-200',
		'dark:border-gray-500 dark:bg-red-950 dark:hover:bg-red-900'
	);
</script>

<div class={twMerge(className, 'relative')}>
	<div class="content flex grow space-x-2">
		<LanguageSelector bind:showDropDown bind:targetLanguage={targetCompiler} />

		<button title="Toggle editor" class={operEdittonButtonClassName} onclick={toggleEditor}>
			<div class="size-5 duration-200" class:rotate-180={showEditor}>
				<Icon src={ChevronDown} />
			</div>
		</button>

		<label class={fileUploaderButtonClassName} for="file-uploader"> Choose a file. </label>
		<button class={submitButtonClassName} type="submit" onclick={onSubmit}> Submit </button>
	</div>
	<input class="hidden" type="file" onchange={readFile} id="file-uploader" />

	{#if showEditor}
		<div class={editorWrapperClassName} dir="rtl" transition:fly={{ duration: 200, y: -20 }}>
			<div class="m-1 flex items-center justify-between" dir="ltr">
				<p class="ml-2 truncate">File name: {fileName || '[unknown]'}</p>
				<button class={closeButtonClassName} onclick={() => (showEditor = false)}>
					<Icon src={XMark} class="size-6" />
				</button>
			</div>

			<div
				dir="ltr"
				transition:fade={{ duration: 200 }}
				class="h-full w-full overflow-hidden border-t border-inherit"
			>
				<!-- text editor is really large, so we will lazy loading it -->
				{#await import('../codeEditor/index.svelte')}
					<div class="flex h-full w-full items-center justify-center">
						<Loading class="size-10" />
					</div>
				{:then { default: CodeEditor }}
					<div class="h-full w-full" transition:fade={{ duration: 200 }}>
						<CodeEditor bind:source={sauce} language={compilerName} />
					</div>
				{/await}
			</div>
		</div>
	{/if}
</div>
