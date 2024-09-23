<script>
	import { ClipboardDocumentCheck, DocumentDuplicate, Icon } from 'svelte-hero-icons';

	const LINKS = [
		{
			name: 'Problems',
			href: '/problems',
			icon: DocumentDuplicate
		},
		{
			name: 'Submissions',
			href: '/submissions',
			icon: ClipboardDocumentCheck
		}
	];
</script>

<div class="mt-3 border-t pt-3 dark:border-gray-500">
	{#each LINKS as { icon, href, name }}
		<a {href}>
			<div class="flex items-center p-2 font-medium">
				<Icon src={icon} class="h-7 text-gray-700 dark:text-gray-400" solid />
				<p class="ms-3">{name}</p>
			</div>
		</a>
	{/each}
</div>

<style>
	a {
		@apply flex rounded-lg transition-colors duration-200 hover:bg-red-100;
		@apply dark:hover:bg-rose-950;
	}
</style>
