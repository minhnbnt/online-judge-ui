<script>
	import ProblemList from '$lib/components/problemList.svelte';

	export let data;
</script>

<svelte:head>
	<title>Online Judge</title>
</svelte:head>

<ProblemList problems={data.problems} />
