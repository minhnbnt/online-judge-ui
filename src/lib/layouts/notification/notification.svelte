<script>
	import { Icon, XMark } from 'svelte-hero-icons';
	import { fly } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	let { withoutStyles, notification, onRemove } = $props();
	const { text, type } = notification;

	function getBgColor() {
		if (withoutStyles) {
			return;
		}

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
		if (withoutStyles) {
			return;
		}

		const types = ['error', 'warning', 'success'];
		if (types.some((s) => type === s)) {
			return 'border-white';
		}

		return 'border-black';
	}

	const divClassname = twMerge(
		getBgColor(),
		'm-2 flex min-w-[180px] items-center justify-between rounded-lg p-3 shadow'
	);

	const pClassName = twMerge(getBorderColor(), 'mr-2 min-w-fit grow border-r pr-3');
</script>

<div class={divClassname} transition:fly|global={{ duration: 200, y: '50%' }}>
	<p class={pClassName}>{text}</p>
	<button onclick={onRemove} class={getBorderColor()}>
		<Icon src={XMark} class="size-6" />
	</button>
</div>
