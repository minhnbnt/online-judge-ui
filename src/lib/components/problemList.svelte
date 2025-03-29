<script lang="ts">
	import { goto } from '$app/navigation';
	import { twMerge } from 'tailwind-merge';

	import type { ProblemEntry } from '$lib/types/problems';

	const { problems, class: classname = '' }: { problems: ProblemEntry[]; class: string } = $props();

	const borderColor = 'dark:border-gray-500';

	const tdClassname = 'p-2 px-4';
	const trClassname = twMerge(
		borderColor,
		'select-none border-t',
		'transition-colors duration-200',
		'even:bg-gray-50 hover:bg-blue-50',
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
				<th class={twMerge(tdClassname, 'w-[50px]')}>No.</th>
				<th class={twMerge(tdClassname, 'w-[120px]')}>ID</th>
				<th>Title</th>
				<th class={twMerge(tdClassname, 'w-[80px]')}>Level</th>
			</tr>
		</thead>

		<tbody>
			{#each problems as { id, title, level }, index}
				<tr class={trClassname} onclick={() => goto(`/problems/${id}`)}>
					<td class={twMerge(tdClassname, 'text-center')}>{index + 1}</td>
					<td class={twMerge(tdClassname, 'text-center')}>{id}</td>
					<td> {title} </td>
					<td class={twMerge(tdClassname, 'text-center')}>{level}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
