<script lang="ts">
	import { Markdown } from 'carta-md';
	import type { PageData } from './$types';
	import { twMerge } from 'tailwind-merge';

	import addComment from './addComment';
	import fetchPage from '$lib/utils/fetchPage';
	import { type Comment } from '$lib/types/comments';
	import Comments from '$lib/components/comments.svelte';
	import Header from '$lib/components/problemHeader/index.svelte';
	import Pagination from '$lib/components/pagination.svelte';

	const { data }: PageData = $props();
	const { carta, problem } = data;
	const { id, title, description, level } = problem;

	let commentPageNumber = $state(1);
	let commentPromise = $derived.by(() => {
		return fetchPage<Comment>(`/problems/${id}/comments/`, commentPageNumber);
	});

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

{#await commentPromise then { results, nPages }}
	<Comments
		class="mb-5"
		onSubmit={(comment: string) => addComment(id, comment)}
		comments={results}
	/>
	<div class="m-10 mt-0 flex justify-end">
		<Pagination class="shadow" numberOfPages={nPages} bind:currentPage={commentPageNumber} />
	</div>
{/await}
