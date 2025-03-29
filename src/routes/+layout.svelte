<script>
	import NotificationContext from '$lib/layouts/notification/index.svelte';
	import { isDarkmodeEnabled } from '$lib/stores/darkmode';

	import '../app.css';

	const { children } = $props();

	function getRootClassName() {
		let className = '';
		if ($isDarkmodeEnabled) {
			className = 'dark';
		}

		return className;
	}
</script>

<div class={getRootClassName()}>
	<NotificationContext>
		{@render children()}
	</NotificationContext>
</div>
