<script lang="ts">
	import { Markdown } from 'carta-md';
	import type { PageData } from './$types';
	import { twMerge } from 'tailwind-merge';

	import Header from '$lib/components/problemHeader/index.svelte';

	let { data }: PageData = $props();
	const { carta, problem } = data;
	const { id, title, description, level } = problem;

	const articleClass = twMerge(
		'm-10 grow rounded-lg border bg-white shadow',
		'dark:border-gray-500 dark:bg-gray-800 dark:shadow-none'
	);
</script>

<svelte:head>
	<title>{`${id} - ${title}`}</title>
</svelte:head>

<Header {id} {title} {level} />

<article class={articleClass}>
	<div class="prose dark:prose-invert m-[1.25rem] max-w-full text-justify">
		<Markdown {carta} value={description} />
	</div>
</article>
