<script lang="ts">
	import { type Comment } from '$lib/types/comments';
	import { getUserInfo } from '$lib/stores/userInfo';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		onSubmit: (comment: string) => Promise<void>;
		comments?: Comment[];
		class?: string;
	}

	let { onSubmit, comments = [], class: className = '' }: Props = $props();

	let commentState = $state(comments);
	let comment = $state('');

	className = twMerge(
		'm-10 space-y-3 rounded-lg border bg-white p-3 shadow',
		'dark:bg-gray-800 dark:border-gray-500 dark:text-white',
		className
	);

	async function onClickSubmit(comment: string) {
		const info = await getUserInfo();
		await onSubmit(comment);

		const now = new Date();

		commentState.push({
			commentedOn: now.toString(),
			user: info!.username,
			comment
		});

		comment = '';
	}
</script>

<div class={className}>
	<section class="flex items-center rounded bg-gray-100 p-3 dark:bg-gray-700">
		<textarea
			class="mr-3 grow rounded-sm border bg-gray-50 dark:border-gray-500 dark:bg-gray-900"
			bind:value={comment}
		></textarea>
		<button
			class="ml-0 max-h-[40px] rounded bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
			onclick={() => onClickSubmit(comment)}
		>
			Submit
		</button>
	</section>

	{#if comments.length > 0}
		<div class="flex flex-col items-center space-y-3 rounded bg-gray-100 p-3 dark:bg-gray-700">
			{#each commentState as { user, comment, commentedOn }}
				{@const commentedDate = new Date(commentedOn)}
				<section class="flex w-full flex-col">
					<div class="flex items-center justify-between">
						<p class="font-bold">{user}</p>
						<p>{commentedDate.toLocaleString()}</p>
					</div>
					<p>{comment}</p>
				</section>
			{/each}
		</div>
	{/if}
</div>
