<script lang="ts">
	import { Markdown } from 'carta-md';
	import type { PageData } from './$types';
	import { twMerge } from 'tailwind-merge';

	import addComment from './addComment';
	import { fetchPage } from '$lib/utils/fetchPage';
	import { type Comment } from '$lib/types/comments';
	import Comments from '$lib/components/comments.svelte';
	import Header from '$lib/components/problemHeader/index.svelte';
	import Pagination from '$lib/components/pagination.svelte';

	const { data }: PageData = $props();
	const { carta, problem } = data;
	const { id, title, description, level, numberOfAC, numberOfSubmission } = problem;

	let commentPageNumber = $state(1);
	let commentPromise = $derived.by(() =>
		fetchPage<Comment>(`/comments/`, commentPageNumber, { problemId: id })
	);

	const articleClass = twMerge(
		'grow rounded-lg border bg-white shadow',
		'dark:border-gray-500 dark:bg-gray-800 dark:shadow-none'
	);
</script>

<svelte:head>
	<title>{`${id} - ${title}`}</title>
</svelte:head>

<Header {id} {title} {level} {numberOfSubmission} {numberOfAC} />

<div class="m-10 flex flex-col space-y-5">
	<article class={articleClass}>
		<div class="prose dark:prose-invert m-[1.25rem] max-w-full text-justify">
			<Markdown {carta} value={description} />
		</div>
	</article>

	{#await commentPromise then { results, nPages }}
		<Comments
			class="m-0"
			onSubmit={async (comment: string) => await addComment(id, comment)}
			comments={results}
		/>

		{#if nPages > 1}
			<div class="mt-5 flex justify-end">
				<Pagination class="shadow" numberOfPages={nPages} bind:currentPage={commentPageNumber} />
			</div>
		{/if}
	{/await}
</div>
