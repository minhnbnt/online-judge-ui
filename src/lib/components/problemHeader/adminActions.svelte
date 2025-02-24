<script lang="ts">
	import { goto } from '$app/navigation';
	import { Icon, Pencil, Trash } from 'svelte-hero-icons';
	import { twMerge } from 'tailwind-merge';

	export let problemId: string;

	async function onUpdate() {
		await goto(`/admin/edit/${problemId}`);
	}

	async function onDelete() {}

	const buttonClassName = twMerge(
		'flex w-[2.3rem] items-center justify-center rounded',
		'transition-colors duration-200',
		'dark:border-gray-500'
	);

	const editButtonClassName = twMerge(
		buttonClassName,
		'border bg-yellow-50 hover:bg-yellow-100',
		'dark:bg-yellow-900 dark:hover:bg-yellow-800'
	);

	const deleteButtonClassName = twMerge(
		buttonClassName,
		'bg-red-500 text-white hover:bg-red-600',
		'dark:border dark:bg-red-800 dark:hover:bg-red-700'
	);
</script>

<div class="flex h-full space-x-2">
	<button title="Edit problem" class={editButtonClassName} on:click={onUpdate}>
		<Icon src={Pencil} class="size-5" />
	</button>
	<button title="Delete Problem" class={deleteButtonClassName} on:click={onDelete}>
		<Icon src={Trash} class="size-5" />
	</button>
</div>
