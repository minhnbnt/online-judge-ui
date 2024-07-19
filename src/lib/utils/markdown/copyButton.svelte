<script lang="ts">
	import { Icon, Clipboard } from 'svelte-hero-icons';
	import { fade } from 'svelte/transition';
	import { get } from 'svelte/store';

	import { notifyContextStore } from '$lib/stores/notification';

	const { addNotification } = get(notifyContextStore);

	export let handleClick: () => void;

	function onClick() {
		handleClick();

		addNotification({
			text: 'Copied',
			type: 'success',
			position: 'bottom-center',
			removeAfter: 4000
		});
	}

	const fadeConfig = {
		duration: 100
	};

	let hover = false;
	let copied = false;
</script>

<div class="relative flex flex-col items-center" transition:fade={fadeConfig}>
	<button
		on:click={onClick}
		class="m-0 w-fit rounded bg-white bg-opacity-0 p-[2px] hover:bg-opacity-5"
		on:mouseenter={() => (hover = true)}
		on:mouseleave={() => (hover = false)}
	>
		<Icon src={Clipboard} class="h-5 w-5 text-white" />
	</button>

	{#if hover}
		<div
			transition:fade={fadeConfig}
			class="absolute top-8 rounded bg-black bg-opacity-75 px-1 font-sans"
		>
			{copied ? 'Copied' : 'Copy to clipboard'}
		</div>
	{/if}
</div>
