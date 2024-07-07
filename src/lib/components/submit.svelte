<script lang="ts">
	import { ChevronUp, Icon } from 'svelte-hero-icons';
	import { fly } from 'svelte/transition';

	const languageAvailable = ['C', 'C++', 'Java', 'Python 3', 'Go', 'Rust'];

	let showDropDown = false;
	let language: string | undefined;
</script>

<div class="w-80">
	{#if showDropDown}
		<div
			transition:fly={{ duration: 200, y: 20 }}
			class="mb-3 flex min-w-fit flex-col rounded-lg bg-white p-2 shadow"
		>
			{#each languageAvailable as lang}
				<button
					class="m-[1px] rounded text-start hover:bg-gray-100"
					on:click={() => {
						showDropDown = false;
						language = lang;
					}}
				>
					<p class="ms-1">{lang}</p>
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
				{#if language === undefined}
					Choose a language.
				{:else}
					{language}
				{/if}
			</p>
			<div class="m-1 h-5 w-5 duration-200" class:rotate-180={showDropDown}>
				<Icon src={ChevronUp} />
			</div>
		</button>
		<button class="ml-2 rounded bg-red-500 px-2 text-white hover:bg-red-600"> Submit </button>
	</div>
</div>
