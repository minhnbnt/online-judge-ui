<script>
	import Notifications from 'svelte-notifications';

	import Wrapper from './wrapper.svelte';
</script>

<Notifications>
	<Wrapper>
		<slot />
	</Wrapper>
</Notifications>
