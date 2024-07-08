<script lang="ts">
	interface Problem {
		id: string;
		title: string;
		level: number;
	}

	export let problems: Array<Problem>;
</script>

<div class="m-10 max-w-full overflow-hidden rounded-lg border bg-white shadow">
	<table class="w-full table-fixed px-10">
		<thead class="bg-gray-50 font-bold">
			<tr>
				<th class="head-cell w-[50px]">No.</th>
				<th class="head-cell w-[120px]">ID</th>
				<th class="head-cell">Title</th>
				<th class="head-cell w-[80px]">Level</th>
			</tr>
		</thead>

		<tbody>
			{#each problems as { id, title, level }, index}
				<tr class="border-t odd:bg-white even:bg-gray-50 hover:bg-blue-50 select-none">
					<td class="cell text-center">{index + 1}</td>
					<td class="cell text-center">{id}</td>
					<td class="cell">
						<a href={`/problems/${id}`} class="flex">
							{title}
						</a>
					</td>
					<td class="cell text-center">{level}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.head-cell {
		@apply p-2 px-4;
	}
	.cell {
		@apply p-2 px-4;
	}
</style>
