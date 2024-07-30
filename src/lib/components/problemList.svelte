<script lang="ts">
	import { goto } from '$app/navigation';

	interface Problem {
		id: string;
		title: string;
		level: number;
	}

	export let problems: Array<Problem>;
</script>

<table class="w-full table-fixed px-10">
	<thead class="bg-gray-50 font-bold">
		<tr>
			<th class="w-[50px]">No.</th>
			<th class="w-[120px]">ID</th>
			<th>Title</th>
			<th class="w-[80px]">Level</th>
		</tr>
	</thead>

	<tbody>
		{#each problems as { id, title, level }, index}
			<tr class="table-contents">
				<td class="text-center">{index + 1}</td>
				<td class="text-center">{id}</td>
				<td class="cursor-pointer" on:click={() => goto(`/problems/${id}`)}>
					{title}
				</td>
				<td class="text-center">{level}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.table-contents {
		@apply select-none border-t odd:bg-white even:bg-gray-50 hover:bg-blue-50;
		@apply transition-colors duration-200;
	}
	th {
		@apply p-2 px-4;
	}
	td {
		@apply p-2 px-4;
	}
</style>
