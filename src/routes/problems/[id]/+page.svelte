<script lang="ts">
	import { Markdown } from 'carta-md';
	import carta from '$lib/utils/markdown/config.js';
	import Header from '$lib/components/header/main.svelte';

	interface Problem {
		id: string;
		title: string;
		description: string;
		level: number;
	}

	export let data: Problem;
	const { id, title, description, level } = data;
</script>

<svelte:head>
	<title>{`${id} - ${title}`}</title>
</svelte:head>

<Header {id} {title} {level} />
<article>
	<div class="prose m-[1.25rem] max-w-full text-justify dark:prose-invert">
		<Markdown {carta} value={description} />
	</div>
</article>

<style>
	article {
		@apply m-10 grow rounded-lg border bg-white shadow;
		@apply dark:border-gray-500 dark:bg-gray-800 dark:shadow-none;
	}
</style>
