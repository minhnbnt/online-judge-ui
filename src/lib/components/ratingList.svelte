<script lang="ts">
	import type { RatingRow } from '$lib/types/ratingRow';
	import gotoUserProfile from '$lib/utils/gotoUserProfile';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		ratings: RatingRow[];
		class?: string;
	}

	const { ratings, class: classname = '' }: Props = $props();

	const borderColor = 'dark:border-gray-500';

	const tdClassname = 'p-2 px-4';
	const trClassname = twMerge(
		borderColor,
		'transition-colors duration-200',
		'even:bg-gray-50 hover:bg-blue-50',
		'select-none border-t cursor-pointer',
		'dark:even:bg-gray-800 dark:hover:bg-blue-950'
	);

	const wrapper = twMerge(
		'm-10 max-w-full overflow-hidden rounded-lg border bg-white shadow',
		borderColor,
		classname
	);
</script>

<div class={wrapper}>
	<table class="w-full table-fixed bg-white px-10 dark:bg-gray-900 dark:text-white">
		<thead class="bg-gray-50 font-bold dark:bg-gray-800">
			<tr>
				<th class={twMerge(tdClassname, 'w-[70px]')}>No.</th>
				<th>Username</th>
				<th class={twMerge(tdClassname, 'w-[140px]')}>Number of AC</th>
			</tr>
		</thead>

		<tbody>
			{#each ratings as { ranking, username, numberOfAC, userId }}
				<tr class={trClassname} onclick={() => gotoUserProfile(userId)}>
					<td class={twMerge(tdClassname, 'text-center')}>{ranking}</td>
					<td class="pl-5">{username}</td>
					<td class={twMerge(tdClassname, 'text-center')}>{numberOfAC}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
