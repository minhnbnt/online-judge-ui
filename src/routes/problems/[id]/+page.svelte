<script lang="ts">
	import Markdown from '$lib/utils/markdown/main.svelte';

	interface Problem {
		id: string;
		title: string;
		description: string;
		level: number;
	}

	export let data: Problem;
</script>

<svelte:head>
	<title>{`${data.id} - ${data.title}`}</title>
</svelte:head>

<Markdown data={data.description} />
