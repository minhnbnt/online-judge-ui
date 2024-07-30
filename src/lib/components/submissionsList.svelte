<script lang="ts">
	import { goto } from '$app/navigation';

	import { type Submission } from '$lib/types/submissions';
	import { languages } from '$lib/utils/languages';
	import { userInfo } from '$lib/stores/userInfo';
	import { getAccessToken } from '$lib/services/auth';
	import { instance } from '$lib/services/api';

	export let submissions: Submission[];

	const languagesMap = new Map<string, string>();
	languages.forEach(({ name, compiler }) => languagesMap.set(compiler, name));

	async function gotoSubmission(id: number) {
		const accessToken = await getAccessToken();
		if (accessToken === undefined) {
			// TODO: handle on session expired
			return;
		}

		const response = await instance.get(`/submissions/get/${id}`, {
			headers: { Authorization: `Bearer ${accessToken}` }
		});

		await goto(`/submissions/${response.data.viewId}`);
	}

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
			{@const isOwner = $userInfo?.username === owner}
			{@const ableToView = $userInfo?.is_staff || isOwner}

			<tr class="table-row" class:hoverable={ableToView}>
				<td>{id}</td>

				{#if isOwner}
					<td class="font-medium">{owner}</td>
				{:else}
					<td>{owner}</td>
				{/if}

				{#if ableToView}
					<td class="cursor-pointer text-left" on:click={() => gotoSubmission(id)}>
						{problem.id} - {problem.title}
					</td>
				{:else}
					<td class="text-left">{problem.id} - {problem.title}</td>
				{/if}

				<td>{languagesMap.get(language)}</td>
				<td class={getResultColorClass(judgeResult)}>{judgeResult}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.table-row {
		@apply select-none border-t text-center odd:bg-white even:bg-gray-50;
	}
	.hoverable {
		@apply transition-colors duration-200 hover:bg-blue-50;
	}

	th {
		@apply p-2 px-4;
	}
	td {
		@apply p-2 px-4;
	}
</style>
