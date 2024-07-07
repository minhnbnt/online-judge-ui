<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	interface Problem {
		id: string;
		title: string;
		level: number;
	}

	export let data: { problems: Array<Problem> };

	console.log(data);

	const headCellClass = 'p-2 px-4';
	const cellClass = 'p-2 px-4';
</script>

<svelte:head>
	<title>Online Judge</title>
</svelte:head>

<div class="m-10 max-w-full overflow-hidden rounded-lg border bg-white shadow">
	<table class="w-full table-fixed px-10">
		<thead class="bg-gray-50 font-bold">
			<tr>
				<th class={twMerge(headCellClass, 'w-[50px]')}>No.</th>
				<th class={twMerge(headCellClass, 'w-[120px]')}>ID</th>
				<th class={headCellClass}>Title</th>
				<th class={twMerge(headCellClass, 'w-[80px]')}>Level</th>
			</tr>
		</thead>

		<tbody>
			{#each data.problems as { id, title, level }, index}
				<tr class="border-t odd:bg-white even:bg-gray-50 hover:bg-blue-50">
					<td class={twMerge(cellClass, 'text-center')}>{index + 1}</td>
					<td class={twMerge(cellClass, 'text-center')}>{id}</td>
					<td class={cellClass}>
						<a href={`/problems/${id}`} class="flex">
							{title}
						</a>
					</td>
					<td class={twMerge(cellClass, 'text-center')}>{level}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
