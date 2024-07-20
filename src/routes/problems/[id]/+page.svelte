<script lang="ts">
	import { Markdown } from 'carta-md';
	import carta from '$lib/utils/markdown/config.js';
	import Submit from '$lib/components/submit/main.svelte';

	interface Problem {
		id: string;
		title: string;
		description: string;
		level: number;
	}

	export let data: Problem;
</script>

<header class="sticky top-0 z-50 flex justify-end p-10 pb-0">
	<Submit problem={data.id} />
</header>

<svelte:head>
	<title>{`${data.id} - ${data.title}`}</title>
</svelte:head>

<article class="prose m-10 max-w-full rounded-lg border bg-white px-[1.25rem] text-justify shadow">
	<Markdown {carta} value={data.description} />
</article>
