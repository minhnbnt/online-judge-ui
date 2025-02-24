<script lang="ts">
	import debounce from 'debounce';
	import { Markdown } from 'carta-md';

	import carta from '$lib/components/markdown/config';
	import CodeEditor from '$lib/components/codeEditor/index.svelte';
	import { type ProblemSubmitPayload as Payload } from '$lib/types/problems';
	import { twMerge } from 'tailwind-merge';

	export let initialValue: Payload | undefined = undefined;
	export let handleSubmit: (payload: Payload) => Promise<void>;

	if (initialValue === undefined) {
		initialValue = {};
	}

	let {
		id, //
		title,
		level,
		stdin,
		stdout,
		runFlags,
		timeLimit,
		memoryLimit
	} = initialValue;

	let description = initialValue.description || '';

	let displayMarkdown = '';

	let setDisplay = (detail: string | undefined) => {
		if (!detail?.trim()) {
			detail = 'Preview will be displayed right here.';
		}

		displayMarkdown = detail;
	};

	setDisplay = debounce(setDisplay, 500);

	function onSubmit() {
		handleSubmit({
			id,
			title,
			description,
			level,
			stdin,
			stdout,
			runFlags,
			timeLimit,
			memoryLimit
		});
	}

	$: setDisplay(description);

	const textAreaClassName = 'rounded border bg-gray-50 p-2 dark:bg-gray-900 dark:border-gray-500';
	const inputClassName = twMerge('w-full, py-1', textAreaClassName);

	const articleClassName = 'max-w-full rounded-lg p-3 empty:hidden bg-gray-50 dark:bg-gray-900';
</script>

<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
	<div>
		<label for="id">
			ID: <span class="font-bold text-red-500">*</span>
		</label>
		<input class={inputClassName} type="text" id="id" placeholder="CHELLO" bind:value={id} />
	</div>
	<div>
		<label for="title">
			Title: <span class="font-bold text-red-500">*</span>
		</label>
		<input
			class={inputClassName}
			type="text"
			id="title"
			placeholder="Hello, world!"
			bind:value={title}
		/>
	</div>
	<div>
		<label for="level" class="grow">
			Level: <span class="font-bold text-red-500">*</span>
		</label>

		<input class={inputClassName} type="number" id="level" bind:value={level} />
	</div>
</div>

<div>
	Detail: <span class="font-bold text-red-500">*</span>
	<div class="h-[300px] grow overflow-hidden rounded-lg border">
		<CodeEditor lineWrapping bind:source={description} language="markdown" />
	</div>
</div>

<article class={twMerge(articleClassName, 'prose dark:prose-invert')}>
	{#key displayMarkdown}
		<Markdown {carta} value={displayMarkdown} />
	{/key}
</article>

<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
	<div class="flex flex-col space-y-1">
		<label for="stdin"> Stdin: </label>
		<textarea class={textAreaClassName} id="stdin" rows="4" bind:value={stdin}></textarea>
	</div>

	<div class="flex flex-col space-y-1">
		<label for="stdout"> Stdout: <span class="font-bold text-red-500">*</span></label>
		<textarea class={textAreaClassName} id="stdout" rows="4" bind:value={stdout}></textarea>
	</div>

	<div class="flex flex-col space-y-1">
		<label for="flags"> Run flags: </label>
		<textarea class={textAreaClassName} id="flags" rows="4" bind:value={runFlags}></textarea>
	</div>

	<div class="flex flex-col justify-center space-y-1">
		<div>
			<label for="timeLimit">Time limit: <span class="font-bold text-red-500">*</span></label>
			<input class={inputClassName} type="number" id="timeLimit" bind:value={timeLimit} />
		</div>
		<div>
			<label for="memLimit">Memory limit: <span class="font-bold text-red-500">*</span></label>
			<input class={inputClassName} type="number" id="memLimit" bind:value={memoryLimit} />
		</div>
	</div>
</div>

<div class="flex justify-end">
	<button on:click={onSubmit} class="rounded bg-red-500 p-1 px-2 text-white"> Submit </button>
</div>
