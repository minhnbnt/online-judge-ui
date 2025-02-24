<script lang="ts">
	import { Markdown } from 'carta-md';
	import type { PageData } from './$types';
	import { twMerge } from 'tailwind-merge';

	import carta from '$lib/components/markdown/config.js';
	import Header from '$lib/components/problemHeader/index.svelte';

	let { data }: PageData = $props();
	const { id, title, description, level } = data;

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
