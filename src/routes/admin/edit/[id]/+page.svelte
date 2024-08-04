<script lang="ts">
	import handleSubmit from './handleSubmit';
	import { type ProblemSubmitPayload } from '$lib/types/problem';

	export let data: ProblemSubmitPayload;

	import ProblemEditor from '$lib/components/problemEditor.svelte';
</script>

<ProblemEditor initialValue={data} {handleSubmit} />
