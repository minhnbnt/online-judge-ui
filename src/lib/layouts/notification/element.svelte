<script>
	import { Icon, XMark } from 'svelte-hero-icons';
	import { fly } from 'svelte/transition';

	export let notification;
	export let onRemove;

	const { text, type } = notification;

	function getBgColor() {
		if (type === 'error') {
			return 'bg-red-600 text-white';
		}

		if (type === 'warning') {
			return 'bg-yellow-600 text-white';
		}

		if (type === 'success') {
			return 'bg-green-600 text-white';
		}

		return 'bg-white text-black border';
	}

	function getBorderColor() {
		const types = ['error', 'warning', 'success'];
		if (types.some((s) => type === s)) {
			return 'border-white';
		}

		return 'border-black';
	}
</script>

<div class={getBgColor()} transition:fly|global={{ duration: 200, y: '50%' }}>
	<p class={getBorderColor()}>{text}</p>
	<button on:click={onRemove} class={`${getBorderColor()}`}>
		<Icon src={XMark} class="size-6" />
	</button>
</div>

<style>
	p {
		@apply mr-2 min-w-fit grow border-r pr-3;
	}
	div {
		@apply m-2 flex min-w-[180px] items-center justify-between rounded-lg p-3 shadow;
	}
</style>
