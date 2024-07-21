<script lang="ts">
	import { Markdown } from 'carta-md';
	import carta from '$lib/utils/markdown/config.js';
	import Header from '$lib/components/header.svelte';

	interface Problem {
		id: string;
		title: string;
		description: string;
		level: number;
	}

	export let data: Problem;
	const { id, title, description, level } = data;
</script>

<svelte:head>
	<title>{`${id} - ${title}`}</title>
</svelte:head>

<Header {id} {title} {level} />
<article class="prose m-10 max-w-full rounded-lg border bg-white px-[1.25rem] text-justify shadow">
	<Markdown {carta} value={description} />
</article>
