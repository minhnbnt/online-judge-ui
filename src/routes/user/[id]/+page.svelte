<script lang="ts">
	import { fade } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';
	import { fetchPage } from '$lib/utils/fetchPage';
	import Loading from '$lib/assets/loading.svelte';
	import { type Submission } from '$lib/types/submissions';
	import Pagination from '$lib/components/pagination.svelte';
	import gotoUserProfile from '$lib/utils/gotoUserProfile.js';
	import SubmissionList from '$lib/components/submissionsList.svelte';

	const { data } = $props();
	const { id, username } = data.profile;
	const joinedDate = new Date(data.profile.date_joined);

	let pageNumber = $state(data.pageNumber);
	let promise = $derived.by(() =>
		fetchPage<Submission>('/submissions/', pageNumber, { ownerId: id })
	);

	const containerClassName = twMerge(
		'rounded-lg border bg-white shadow',
		'dark:border-gray-500 dark:bg-gray-800 dark:bg-none dark:text-white'
	);

	const tdClassName = 'pb-1 px-3 pt-2 border-r';
</script>

<div class="m-10 space-y-5">
	<div class={twMerge(containerClassName, 'w-fit')}>
		<table class="table-fixed px-10 dark:border-gray-500 dark:bg-gray-900 dark:text-white">
			<tbody class="last:border-none [&>tr]:border-b">
				<tr>
					<td class={tdClassName}>Username</td>
					<td class={twMerge(tdClassName, 'cursor-pointer')} onclick={() => gotoUserProfile(id)}>
						{username}
					</td>
				</tr>

				<tr>
					<td class={tdClassName}>Joined on</td>
					<td class={twMerge(tdClassName, 'border-none')}>
						{joinedDate.toLocaleString()}
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	{#await promise}
		<div class="flex h-screen items-center justify-center dark:border-gray-500">
			<Loading class="size-12" />
		</div>
	{:then { results: submissions, nPages }}
		<div class="flex justify-end">
			<Pagination numberOfPages={nPages} currentPage={pageNumber} class="shadow" />
		</div>

		{#if submissions.length > 0}
			<div
				class="max-w-full overflow-hidden rounded-lg border shadow dark:border-gray-500"
				transition:fade={{ duration: 200 }}
			>
				<SubmissionList {submissions} showOwner={false} />
			</div>
		{/if}
	{/await}
</div>
