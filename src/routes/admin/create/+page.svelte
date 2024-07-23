<script lang="ts">
	import debounce from 'debounce';
	import { Markdown } from 'carta-md';

	import handleSubmit from './handleSubmit';
	import carta from '$lib/utils/markdown/config.js';
	import CodeEditor from '$lib/components/codeEditor/main.svelte';

	let id: string;
	let title: string;
	let level = 1;
	let description = 'Read me!';

	let stdin: string;
	let stdout: string;
	let runFlags: string;
	let timeLimit = 1000;
	let memLimit = -1;

	let displayMarkdown = '';

	function setDisplay(detail: string) {
		if (!detail.trim()) {
			detail = 'Preview will be displayed right here.';
		}

		const f = debounce(() => (displayMarkdown = detail), 100);
		f();
	}

	async function onSubmit() {
		await handleSubmit({
			id,
			title,
			description,
			level,
			stdin,
			stdout,
			runFlags,
			timeLimit,
			memoryLimit: memLimit
		});
	}

	$: setDisplay(description);
</script>

<div class="m-10 flex flex-col justify-between space-y-3 rounded-lg border bg-white p-5 shadow">
	<h1>Create Problem</h1>

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
			<CodeEditor bind:source={description} language="markdown" />
		</div>
	</div>

	<div class="prose max-w-full overflow-hidden rounded-lg border bg-gray-50 p-3 empty:hidden">
		{#key displayMarkdown}
			<Markdown {carta} value={displayMarkdown} />
		{/key}
	</div>

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
				<input type="number" id="memLimit" bind:value={memLimit} />
			</div>
		</div>
	</div>

	<div class="flex justify-end">
		<button on:click={onSubmit} class="rounded bg-red-500 p-1 px-2 text-white"> Submit </button>
	</div>
</div>

<style>
	h1 {
		@apply mb-5 text-2xl font-bold;
	}

	textarea {
		@apply rounded border bg-gray-50 p-2;
	}

	label {
		@apply items-center space-x-1;
	}

	input {
		@apply w-full rounded border bg-gray-50 p-2 py-1;
	}
</style>
