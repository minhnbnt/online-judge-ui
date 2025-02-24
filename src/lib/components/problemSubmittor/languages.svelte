<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ChevronDown, Icon } from 'svelte-hero-icons';

	import { languages } from '$lib/utils/languages';
	import { type Language } from '$lib/types/languages';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		showDropDown: boolean;
		targetLanguage: Language | undefined;
	}

	let { showDropDown = $bindable(), targetLanguage = $bindable() }: Props = $props();

	function toggleDropDown() {
		showDropDown = !showDropDown;
	}

	function onChooseLanguage(language: Language) {
		showDropDown = false;
		targetLanguage = language;
	}

	const languageSelectorClassName = twMerge(
		'flex w-[190px] items-center justify-between rounded border px-2',
		'transition-colors duration-200',
		'bg-gray-50 hover:bg-gray-100',
		'dark:border-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800'
	);

	const languageDropdownClassName = twMerge(
		'absolute top-14 flex w-full flex-col rounded-lg border bg-white p-2 shadow',
		'dark:border-gray-500 dark:bg-gray-900'
	);

	const languageEntryClassName = twMerge(
		'm-[1px] rounded text-start hover:bg-gray-100',
		'dark:hover:bg-gray-800'
	);
</script>

<div class="relative flex grow">
	<button class={languageSelectorClassName} onclick={toggleDropDown}>
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
		<div class={languageDropdownClassName} transition:fly={{ duration: 200, y: -20 }}>
			{#each languages as entry}
				<button class={languageEntryClassName} onclick={() => onChooseLanguage(entry)}>
					<p class="ms-1">{entry.name}</p>
				</button>
			{/each}
		</div>
	{/if}
</div>
