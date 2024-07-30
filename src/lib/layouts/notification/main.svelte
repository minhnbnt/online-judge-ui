<script>
	import Notifications from 'svelte-notifications';

	import Element from './element.svelte';
	import Wrapper from './wrapper.svelte';
</script>

<Notifications item={Element} zIndex={2000}>
	<Wrapper>
		<slot />
	</Wrapper>
</Notifications>
