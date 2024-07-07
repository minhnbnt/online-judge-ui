<script lang="ts">
	import { Carta, Markdown } from 'carta-md';
	import { math } from '@cartamd/plugin-math';
	import DOMPurify from 'isomorphic-dompurify';

	import { component } from '@cartamd/plugin-component';
	import { svelte, initializeComponents } from '@cartamd/plugin-component/svelte';
	import Pre from './pre.svelte';

	const mapped = [svelte('pre', Pre)];

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize,
		extensions: [math(), component(mapped, initializeComponents)]
	});

	export let data: string;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css"
		integrity="sha384-3UiQGuEI4TTMaFmGIZumfRPtfKQ3trwQE2JgosJxCnGmQpL/lJdjpcHkaaFwHlcI"
		crossorigin="anonymous"
	/>
</svelte:head>

<article class="prose m-10 max-w-full rounded-lg border bg-white px-[1.25rem] text-justify shadow">
	<Markdown {carta} value={data} />
</article>
