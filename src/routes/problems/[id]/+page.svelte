<script lang="ts">
	import { Markdown } from 'carta-md';
	import carta from '$lib/utils/markdown/config.js';

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

<article class="prose m-10 max-w-full rounded-lg border bg-white px-[1.25rem] text-justify shadow">
	<Markdown {carta} value={data.description} />
</article>
