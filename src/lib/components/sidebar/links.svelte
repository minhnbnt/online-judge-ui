<script>
	import { ChartBar, ClipboardDocumentCheck, DocumentDuplicate, Icon } from 'svelte-hero-icons';

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
		},
		{
			name: 'Ranking',
			href: '/ranking',
			icon: ChartBar
		}
	];
</script>

<div class="mt-3 border-t pt-3">
	{#each LINKS as { icon, href, name }}
		<a {href}>
			<div class="flex items-center p-2 font-medium">
				<Icon src={icon} class="h-7 text-gray-700" solid />
				<p class="ms-3">{name}</p>
			</div>
		</a>
	{/each}
</div>

<style>
	a {
		@apply flex rounded-lg hover:bg-red-100;
	}
</style>
