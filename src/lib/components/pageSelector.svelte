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
	}

	button {
		@apply p-3 py-1 text-lg transition-colors duration-200 hover:bg-blue-50;
	}

	.active {
		@apply bg-gray-50;
	}
</style>
