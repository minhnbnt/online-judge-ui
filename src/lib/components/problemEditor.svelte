<script lang="ts">
	import debounce from 'debounce';
	import { Markdown } from 'carta-md';

	import carta from '$lib/utils/markdown/config.js';
	import CodeEditor from '$lib/components/codeEditor/main.svelte';
	import { type ProblemSubmitPayload as Payload } from '$lib/types/problem';

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
</script>

<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
	<div>
		<label for="id">
			ID: <span class="font-bold text-red-500">*</span>
		</label>
		<input type="text" id="id" placeholder="CHELLO" bind:value={id} />
	</div>
	<div>
		<label for="title">
			Title: <span class="font-bold text-red-500">*</span>
		</label>
		<input type="text" id="title" placeholder="Hello, world!" bind:value={title} />
	</div>
	<div>
		<label for="level" class="grow">
			Level: <span class="font-bold text-red-500">*</span>
		</label>

		<input type="number" id="level" bind:value={level} />
	</div>
</div>

<div>
	Detail: <span class="font-bold text-red-500">*</span>
	<div class="h-[300px] grow overflow-hidden rounded-lg border">
		<CodeEditor lineWrapping bind:source={description} language="markdown" />
	</div>
</div>

<article class="prose dark:prose-invert">
	{#key displayMarkdown}
		<Markdown {carta} value={displayMarkdown} />
	{/key}
</article>

<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
	<div class="flex flex-col space-y-1">
		<label for="stdin"> Stdin: </label>
		<textarea id="stdin" rows="4" bind:value={stdin} />
	</div>

	<div class="flex flex-col space-y-1">
		<label for="stdout"> Stdout: <span class="font-bold text-red-500">*</span></label>
		<textarea id="stdout" rows="4" bind:value={stdout} />
	</div>

	<div class="flex flex-col space-y-1">
		<label for="flags"> Run flags: </label>
		<textarea id="flags" rows="4" bind:value={runFlags} />
	</div>

	<div class="flex flex-col justify-center space-y-1">
		<div>
			<label for="timeLimit">Time limit: <span class="font-bold text-red-500">*</span></label>
			<input type="number" id="timeLimit" bind:value={timeLimit} />
		</div>
		<div>
			<label for="memLimit">Memory limit: <span class="font-bold text-red-500">*</span></label>
			<input type="number" id="memLimit" bind:value={memoryLimit} />
		</div>
	</div>
</div>

<div class="flex justify-end">
	<button on:click={onSubmit} class="rounded bg-red-500 p-1 px-2 text-white"> Submit </button>
</div>

<style>
	* {
		@apply dark:border-gray-500;
	}

	article {
		@apply max-w-full rounded-lg p-3 empty:hidden;
		@apply bg-gray-50 dark:bg-gray-900;
	}

	textarea,
	input {
		@apply rounded border bg-gray-50 p-2;
		@apply dark:bg-gray-900;
	}

	label {
		@apply items-center space-x-1;
	}

	input {
		@apply w-full py-1;
	}
</style>
