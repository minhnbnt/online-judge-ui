<script>
	import CodeEditor from '$lib/components/codeEditor/main.svelte';

	export let data;
	console.log(data);

	let { source, owner, judgeResult } = data;

	function getResultColorClass() {
		if (judgeResult === 'AC') {
			return 'text-green-600';
		}

		if (judgeResult === 'CE') {
			return 'text-gray-600';
		}

		return 'text-red-600';
	}
</script>

<div class="m-10 space-y-5">
	<div class="container justify-between p-2 px-3">
		<p>Submittor: {owner}</p>

		<p>Result: <span class={getResultColorClass()}>{judgeResult}</span></p>
	</div>

	<div class="container h-[500px] overflow-hidden">
		<CodeEditor bind:source />
	</div>
</div>

<style>
	.container {
		@apply flex rounded-lg border bg-white shadow;
	}
</style>
