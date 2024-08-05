<script lang="ts">
	export let activePage = 1;
	export let numberOfPages: number;
</script>

<ul>
	{#each Array.from({ length: numberOfPages }, (_, i) => i + 1) as pageIndex}
		{@const isActivePage = activePage === pageIndex}

		{#if isActivePage}
			<li>
				<button class="active">{pageIndex}</button>
			</li>
		{:else}
			<li>
				<button on:click={() => (activePage = pageIndex)}>
					{pageIndex}
				</button>
			</li>
		{/if}
	{/each}
</ul>

<style>
	ul {
		@apply flex divide-x overflow-hidden rounded-lg border bg-white;
		@apply dark:divide-gray-500 dark:border-gray-500 dark:bg-gray-900;
		@apply dark:text-white;
	}

	button {
		@apply p-3 py-1 text-lg transition-colors duration-200;
		@apply hover:bg-blue-50 dark:hover:bg-blue-950;
	}

	.active {
		@apply bg-gray-50 dark:bg-gray-800;
	}
</style>
