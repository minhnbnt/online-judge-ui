<script lang="ts">
	import handleSubmit from './handleLogin';
	import checkIfLoggedin from './checkIfLoggedin';

	import Logo from '$lib/assets/logo.svelte';
	import { onMount } from 'svelte';

	export let data: { nextUrl: string };

	function onSubmit(event: SubmitEvent) {
		handleSubmit(event, data.nextUrl);
	}

	onMount(checkIfLoggedin);
</script>

<main class="flex h-screen max-h-screen items-center justify-center bg-gray-50">
	<div class="m-10 flex rounded-xl border bg-white p-8 shadow">
		<div class="mr-8 space-y-2 border-r pr-8">
			<div class="flex h-16 space-x-4">
				<Logo />
			</div>
			<h1 class="text-2xl font-bold">Login</h1>
			<p>Sign in to your account</p>
		</div>
		<form class="my-3 flex flex-col space-y-4" on:submit|preventDefault={onSubmit}>
			<input type="text" class="input" placeholder="Username" name="username" />
			<input type="password" class="input" placeholder="Password" name="password" />

			<label>
				<input type="checkbox" name="remember" class="h-4 w-4 rounded bg-gray-100 text-blue-600" />
				Remember me
			</label>
			<div class="ml-auto">
				<button type="submit">Login</button>
			</div>
		</form>
	</div>
</main>

<style>
	.input {
		@apply rounded border bg-gray-50 p-2 px-3;
	}
	button {
		@apply rounded-full bg-blue-700 p-2 px-5 text-white hover:bg-blue-600;
	}
</style>
