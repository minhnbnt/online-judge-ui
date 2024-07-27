<script lang="ts">
	import { type Submission } from '$lib/types/submissions';
	import { languages } from '$lib/utils/languages';

	export let submissions: Submission[];

	const languagesMap = new Map<string, string>();
	languages.forEach(({ name, compiler }) => languagesMap.set(compiler, name));

	function getResultColorClass(judgeResult: string) {
		if (judgeResult === 'AC') {
			return 'text-green-600';
		}

		if (judgeResult === 'CE') {
			return 'text-gray-600';
		}

		return 'text-red-600';
	}
</script>

<table class="w-full table-fixed px-10">
	<thead class="bg-gray-50 font-bold">
		<tr>
			<th class="w-[50px]">ID</th>
			<th class="w-[150px]">Submittor</th>
			<th class="text-left">Problem</th>
			<th class="w-[100px]">Language</th>
			<th class="w-[80px]">Result</th>
		</tr>
	</thead>

	<tbody>
		{#each submissions as { id, owner, problem, language, judgeResult }}
			<tr class="select-none border-t text-center odd:bg-white even:bg-gray-50 hover:bg-blue-50">
				<td>{id}</td>
				<td>{owner}</td>
				<td class="text-left">{problem.id} - {problem.title}</td>
				<td>{languagesMap.get(language)}</td>
				<td class={getResultColorClass(judgeResult)}>{judgeResult}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	th {
		@apply p-2 px-4;
	}
	td {
		@apply p-2 px-4;
	}
</style>
