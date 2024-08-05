<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ChevronDown, Icon } from 'svelte-hero-icons';

	import { languages } from '$lib/utils/languages';
	import { type Language } from '$lib/types/languages';

	export let showDropDown: boolean;
	export let targetLanguage: Language | undefined;
</script>

<div class="relative flex grow">
	<button class="language-selector" on:click={() => (showDropDown = !showDropDown)}>
		{#if targetLanguage === undefined}
			<span class="text-gray-600">Choose a language.</span>
		{:else}
			{targetLanguage.name}
		{/if}
		<div class="ml-1 size-5 duration-200" class:rotate-180={showDropDown}>
			<Icon src={ChevronDown} />
		</div>
	</button>

	{#if showDropDown}
		<div class="language-dropdown" transition:fly={{ duration: 200, y: -20 }}>
			{#each languages as entry}
				<button
					class="entry"
					on:click={() => {
						showDropDown = false;
						targetLanguage = entry;
					}}
				>
					<p class="ms-1">{entry.name}</p>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.language-selector {
		@apply flex w-[190px] items-center justify-between rounded border px-2;
		@apply transition-colors duration-200;

		@apply bg-gray-50 hover:bg-gray-100;
		@apply dark:border-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800;
	}

	.language-dropdown {
		@apply absolute top-14 flex w-full flex-col rounded-lg border bg-white p-2 shadow;
		@apply dark:border-gray-500 dark:bg-gray-900;
	}

	.entry {
		@apply m-[1px] rounded text-start hover:bg-gray-100;
		@apply dark:hover:bg-gray-800;
	}
</style>
