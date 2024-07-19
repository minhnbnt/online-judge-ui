<script lang="ts">
	import { type Language } from '$lib/utils/languages';
	import { ChevronUp, Icon } from 'svelte-hero-icons';

	export let showDropDown: boolean;
	export let targetLanguage: Language | undefined;
</script>

<button
	class="flex w-full items-center justify-between rounded border bg-gray-50 hover:bg-gray-100"
	on:click={() => (showDropDown = !showDropDown)}
>
	<p class="ps-2">
		{#if targetLanguage === undefined}
			Choose a language.
		{:else}
			{targetLanguage.name}
		{/if}
	</p>
	<div class="mr-1 size-5 duration-200" class:rotate-180={showDropDown}>
		<Icon src={ChevronUp} />
	</div>
</button>
