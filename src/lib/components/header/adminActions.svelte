<script lang="ts">
	import { goto } from '$app/navigation';
	import { Icon, Pencil, Trash } from 'svelte-hero-icons';

	export let problemId: string;

	async function onUpdate() {
		await goto(`/admin/edit/${problemId}`);
	}

	async function onDelete() {}
</script>

<div class="flex h-full space-x-2">
	<button title="Edit problem" class="edit" on:click={onUpdate}>
		<Icon src={Pencil} class="size-5" />
	</button>
	<button title="Delete Problem" class="delete" on:click={onDelete}>
		<Icon src={Trash} class="size-5" />
	</button>
</div>

<style>
	button {
		@apply flex w-[2.3rem] items-center justify-center rounded;
		@apply transition-colors duration-200;
		@apply dark:border-gray-500;
	}
	.edit {
		@apply border bg-yellow-50 hover:bg-yellow-100;
		@apply dark:bg-yellow-900 dark:hover:bg-yellow-800;
	}

	.delete {
		@apply bg-red-500 text-white hover:bg-red-600;
		@apply dark:border dark:bg-red-800 dark:hover:bg-red-700;
	}
</style>
