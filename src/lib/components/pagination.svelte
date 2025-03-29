<script lang="ts">
	import { ChevronLeft, ChevronRight, Icon } from 'svelte-hero-icons';
	import { twMerge } from 'tailwind-merge';

	let { currentPage = $bindable(), numberOfPages, class: className = '' } = $props();

	if (!currentPage) {
		currentPage = 1;
	}

	function getPagesNumber(numberOfPages: number) {
		const result = [];
		for (let i = 1; i <= numberOfPages; i++) {
			result.push(i);
		}

		return result;
	}

	function onClick(pageNumber: number) {
		if (pageNumber <= 0 || pageNumber > numberOfPages) {
			return;
		}

		if (currentPage != pageNumber) {
			currentPage = pageNumber;
		}
	}

	const buttonsClass = twMerge(
		'flex size-8 items-center justify-center border-r',
		'enabled:hover:bg-blue-50 disabled:text-black/40'
	);
</script>

<nav>
	<ul class={twMerge('inline-flex items-center rounded border bg-white', className)}>
		<li>
			<button
				class={buttonsClass}
				disabled={currentPage == 1}
				onclick={() => onClick(currentPage - 1)}
			>
				<Icon src={ChevronLeft} class="size-4" />
			</button>
		</li>
		{#each getPagesNumber(numberOfPages) as pageNumber}
			<li>
				<button
					aria-label={`page-${pageNumber}`}
					onclick={() => onClick(pageNumber)}
					class={buttonsClass}
				>
					{pageNumber}
				</button>
			</li>
		{/each}
		<li>
			<button
				class={twMerge(buttonsClass, 'rounded-e-md border-none')}
				disabled={currentPage == numberOfPages}
				onclick={() => onClick(currentPage + 1)}
			>
				<Icon src={ChevronRight} class="size-4" />
			</button>
		</li>
	</ul>
</nav>
