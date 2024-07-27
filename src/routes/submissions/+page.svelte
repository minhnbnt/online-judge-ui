<script lang="ts">
	import { fade } from 'svelte/transition';

	import Loading from '$lib/assets/loading.svelte';
	import SubmissionList from '$lib/components/submissionsList.svelte';
	import fetchSubmissions from './fetchSubmissions';

	export let page = 1;

	$: promise = fetchSubmissions(page);
</script>

{#await promise}
	<div class="m-10 flex grow justify-center">
		<Loading />
	</div>
{:then submissions}
	<div
		class="m-10 max-w-full overflow-hidden rounded-lg border bg-white shadow"
		transition:fade={{ duration: 200 }}
	>
		<SubmissionList {submissions} />
	</div>
{/await}
