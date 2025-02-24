<script lang="ts">
	import { Icon, Clipboard } from 'svelte-hero-icons';
	import { fade } from 'svelte/transition';

	import { addNotification } from '$lib/stores/notification';

	const { handleClick } = $props();

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

	let hover = $state(false);
	let copied = $state(false);
</script>

<div class="relative flex flex-col items-center" transition:fade={fadeConfig}>
	<button
		onclick={onClick}
		class="m-0 w-fit rounded p-[2px] dark:bg-white/5"
		onmouseenter={() => (hover = true)}
		onmouseleave={() => (hover = false)}
	>
		<Icon src={Clipboard} class="h-5 w-5 text-white" />
	</button>

	{#if hover}
		<div transition:fade={fadeConfig} class="absolute top-8 rounded bg-black/75 px-1 font-sans">
			{copied ? 'Copied' : 'Copy to clipboard'}
		</div>
	{/if}
</div>
