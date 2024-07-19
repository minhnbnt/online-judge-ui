<script lang="ts">
	import { languages, type Language } from '$lib/utils/languages';
	import { fly } from 'svelte/transition';

	export let show: boolean;
	export let targetLanguage: Language | undefined;
</script>

{#if show}
	<div
		transition:fly={{ duration: 200, y: 20 }}
		class="absolute top-14 flex w-[160px] flex-col rounded-lg bg-white p-2 shadow"
	>
		{#each languages as entry}
			<button
				class="m-[1px] rounded text-start hover:bg-gray-100"
				on:click={() => {
					show = false;
					targetLanguage = entry;
				}}
			>
				<p class="ms-1">{entry.name}</p>
			</button>
		{/each}
	</div>
{/if}
