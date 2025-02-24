<script>
	import NotificationContext from '$lib/layouts/notification/index.svelte';
	import { isDarkmodeEnabled } from '$lib/stores/darkmode';
	import { twMerge } from 'tailwind-merge';

	import '../app.css';

	const { children } = $props();

	function getRootClassName() {
		let className = '';
		if ($isDarkmodeEnabled) {
			className = twMerge('dark', className);
		}

		return className;
	}
</script>

<div class={getRootClassName()}>
	<NotificationContext>
		{@render children()}
	</NotificationContext>
</div>
