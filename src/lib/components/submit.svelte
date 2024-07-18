<script lang="ts">
	import { ChevronUp, Icon } from 'svelte-hero-icons';
	import { fly } from 'svelte/transition';

	import { languages, type Language } from '$lib/utils/languages';

	let showDropDown = false;
	let targetLanguage: Language | undefined;
</script>

<div class="w-80">
	{#if showDropDown}
		<div
			transition:fly={{ duration: 200, y: 20 }}
			class="mb-3 flex min-w-fit flex-col rounded-lg bg-white p-2 shadow"
		>
			{#each languages as entry}
				<button
					class="m-[1px] rounded text-start hover:bg-gray-100"
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

	<div class="flex select-none rounded-lg bg-white p-2 shadow">
		<button
			class="flex w-full items-center justify-between rounded bg-gray-50 hover:bg-gray-100"
			on:click={() => (showDropDown = !showDropDown)}
		>
			<p class="ps-2">
				{#if targetLanguage === undefined}
					Choose a language.
				{:else}
					{targetLanguage.name}
				{/if}
			</p>
			<div class="m-1 h-5 w-5 duration-200" class:rotate-180={showDropDown}>
				<Icon src={ChevronUp} />
			</div>
		</button>
		<button class="ml-2 rounded bg-red-500 px-2 text-white hover:bg-red-600"> Submit </button>
	</div>
</div>
