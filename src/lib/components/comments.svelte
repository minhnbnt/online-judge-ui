<script lang="ts">
	import { type Comment } from '$lib/types/comments';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		class?: string;
		onSubmit: (comment: string) => void;
		comments?: Comment[];
	}

	let { onSubmit, comments, class: className = '' }: Props = $props();

	className = twMerge('m-10 space-y-3 rounded-lg border bg-white p-3 shadow', className);
	if (comments === undefined) {
		comments = [];
	}

	let comment = $state('');
</script>

<div class={className}>
	<section class="flex items-center rounded bg-gray-100 p-3">
		<textarea class="mr-3 grow rounded-sm border bg-gray-50" bind:value={comment}></textarea>
		<button
			class="ml-0 max-h-[40px] rounded bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
			onclick={() => onSubmit(comment)}
		>
			Submit
		</button>
	</section>

	{#if comments.length > 0}
		<div class="flex flex-col items-center space-y-3 rounded bg-gray-100 p-3">
			{#each comments as { user, comment, commentedOn }}
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
