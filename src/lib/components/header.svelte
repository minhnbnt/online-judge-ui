<script lang="ts">
	import Submit from '$lib/components/submit/main.svelte';

	export let id: string;
	export let title: string;
	export let level: number;
</script>

<head class="sticky top-0 z-50 flex border-b bg-white px-10 py-3 shadow">
	<div class="mt-2 flex grow items-center space-x-6">
		<div class="flex grow justify-between text-lg">
			<p><span class="font-bold">{id}</span> - {title}</p>
			<p>Level: {level}</p>
		</div>

		<Submit problem={id} class="w-[400px]" />
	</div>
</head>
