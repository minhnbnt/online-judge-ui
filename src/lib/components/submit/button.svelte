<script lang="ts">
	import { type Language } from '$lib/types/languages';
	import { ChevronDown, Icon } from 'svelte-hero-icons';

	export let showDropDown: boolean;
	export let targetLanguage: Language | undefined;
</script>

<button class="language-selector" on:click={() => (showDropDown = !showDropDown)}>
	{#if targetLanguage === undefined}
		<span class="text-gray-600">Choose a language.</span>
	{:else}
		{targetLanguage.name}
	{/if}
	<div class="size-5 duration-200" class:rotate-180={showDropDown}>
		<Icon src={ChevronDown} />
	</div>
</button>

<style>
	.language-selector {
		@apply flex w-full items-center justify-between rounded border bg-gray-50 px-2 hover:bg-gray-100;
		@apply transition-colors duration-200;
	}
</style>
