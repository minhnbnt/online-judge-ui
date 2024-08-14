<script>
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';

	import Notification from '$lib/layouts/notification/main.svelte';
	import { darkModeStore } from '$lib/stores/darkmode';

	import '../globals.scss';
</script>

<svelte:head>
	<!-- Roboto font {regular, medium, bold} -->
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@fontsource/roboto@5.0.13/400.css"
		integrity="sha256-F+GsMfR4UbU6cWw+VUWIb7KqcXDR8VzvrbNntdrb9gk="
		crossorigin="anonymous"
	/>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@fontsource/roboto@5.0.13/500.css"
		integrity="sha256-+JDvxQTOzqrUiORzZ3WfxEKX4r2hoW2OiQGKIUr8dW8="
		crossorigin="anonymous"
	/>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@fontsource/roboto@5.0.13/700.css"
		integrity="sha256-Nfhnm/it+N8N0dligMDpB6noryJzw2nUmbvJveLTJ8o="
		crossorigin="anonymous"
	/>

	<!-- Fira Code font {regular, bold} -->
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@fontsource/fira-code@5.0.18/400.css"
		integrity="sha256-lNcq+GHsaFA36C5XsA0HXKBebmxTD0Ht/+1cFNOVe5o="
		crossorigin="anonymous"
	/>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@fontsource/fira-code@5.0.18/700.css"
		integrity="sha256-S8cCpP8ROBd3ZmGK9Pq2PJd6IC8dOyW2FVnTFnMxhto="
		crossorigin="anonymous"
	/>
</svelte:head>

<ProgressBar class="text-red-500" zIndex={100} />

<div class:dark={$darkModeStore}>
	<Notification>
		<slot />
	</Notification>
</div>
