<script lang="ts">
	import { type Submission } from '$lib/types/submissions';
	import { languages } from '$lib/utils/languages';
	import { userInfo } from '$lib/stores/userInfo';
	import gotoSubmission from '$lib/utils/gotoSumbission';
	import { twMerge } from 'tailwind-merge';

	let { submissions }: { submissions: Submission[] } = $props();

	const languagesMap = new Map<string, string>();
	languages.forEach(({ name, compiler }) => {
		languagesMap.set(compiler, name);
	});

	const paddingClassName = 'p-2 px-4';

	const tableRowClassName = twMerge(
		'dark:border-gray-500',
		'select-none border-t text-center',
		'even:bg-gray-50 dark:even:bg-gray-800'
	);

	const tableRowHoverableClassName = twMerge(
		tableRowClassName,
		'dark:hover:bg-blue-950',
		'transition-colors duration-200 hover:bg-blue-50'
	);

	function getResultColorClass(judgeResult: string) {
		let textColorClassName = 'text-red-600';
		if (judgeResult === 'AC') {
			textColorClassName = 'text-green-600';
		} else if (judgeResult === 'CE') {
			textColorClassName = 'text-gray-600';
		}

		return twMerge(textColorClassName, paddingClassName);
	}
</script>

<table
	class="w-full table-fixed bg-white px-10 dark:border-gray-500 dark:bg-gray-900 dark:text-white"
>
	<thead class="bg-gray-50 font-bold dark:bg-gray-800">
		<tr>
			<th class={twMerge(paddingClassName, 'w-[50px]')}>ID</th>
			<th class={twMerge(paddingClassName, 'w-[150px]')}>Submittor</th>
			<th class={twMerge(paddingClassName, 'text-left')}>Problem</th>
			<th class={twMerge(paddingClassName, 'w-[100px]')}>Language</th>
			<th class={twMerge(paddingClassName, 'w-[80px]')}>Result</th>
		</tr>
	</thead>

	<tbody>
		{#each submissions as { id, owner, problem, language, judgeResult }}
			{@const isOwner = $userInfo?.username === owner}
			{@const ableToView = $userInfo?.is_staff || isOwner}

			<tr class={ableToView ? tableRowHoverableClassName : tableRowClassName}>
				<td>{id}</td>

				{#if isOwner}
					<td class="font-medium">{owner}</td>
				{:else}
					<td>{owner}</td>
				{/if}

				{#if ableToView}
					<td class="cursor-pointer text-left" onclick={() => gotoSubmission(id)}>
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
