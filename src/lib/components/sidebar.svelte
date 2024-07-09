<script>
	import { ChartBar, ClipboardDocumentCheck, DocumentDuplicate, Icon } from 'svelte-hero-icons';
	import { userInfo } from '$lib/stores/userInfo';

	import { PUBLIC_LOGO_SRC } from '$env/static/public';

	const HOME_PAGE = 'https://svelte.dev/';

	const avatar =
		'https://cdn-icpc.ptit.edu.vn/ptitcode/profile/um4ZEmt54c1gAfO0m1wwQ7YxGbNZPOseEKs7Cvn8.png';

	$: username = $userInfo?.username;

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

<aside class="sticky top-0 z-50 col-span-1 h-screen min-w-64 bg-red-50 p-3 shadow">
	<div class="relative h-full">
		<a href={HOME_PAGE} class="sidebar-link">
			<div class="flex items-center p-2">
				<img src={PUBLIC_LOGO_SRC} alt="Svelte" class="h-9" />
				<p class="ms-3 text-xl font-semibold">Online Judge</p>
			</div>
		</a>

		<div class="mt-3 border-t pt-3">
			{#each LINKS as { icon, href, name }}
				<a class="sidebar-link" {href}>
					<div class="flex items-center p-2 font-medium">
						<Icon src={icon} class="h-7 text-gray-700" solid />
						<p class="ms-3">{name}</p>
					</div>
				</a>
			{/each}
		</div>

		<div class="absolute bottom-0 mt-3 w-full border-t pt-3">
			<div class="sidebar-link w-full max-w-full select-none items-center p-2 text-lg">
				{#if username !== undefined}
					<img src={avatar} alt={username} class="h-11 rounded-full" />
					<p class="ms-3 truncate">{username}</p>
				{/if}
			</div>
		</div>
	</div>
</aside>

<style>
	.sidebar-link {
		@apply flex rounded-lg hover:bg-red-100;
	}
</style>
