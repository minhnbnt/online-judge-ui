<script lang="ts">
	import { Slot } from '@cartamd/plugin-component/svelte';
	import CopyButton from './copyButton.svelte';

	let innerHtml: HTMLElement;

	function copyText() {
		const firstChild = innerHtml.firstElementChild as HTMLElement;
		navigator.clipboard.writeText(firstChild.innerText);
	}

	let hover = false;
</script>

<pre
	bind:this={innerHtml}
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	class="flex justify-between overflow-visible p-3 px-4">
	<Slot />
	{#if hover}
		<CopyButton handleClick={copyText} />
	{/if}
</pre>
