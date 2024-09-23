<script lang="ts">
	import Logo from '$lib/assets/logo.svelte';
	import handleSubmit from './handleRegister';

	function onSubmit(event: SubmitEvent) {
		handleSubmit(event);
	}
</script>

<main class="flex h-screen max-h-screen items-center justify-center bg-gray-50">
	<div class="m-10 flex rounded-xl border bg-white p-8 shadow">
		<div class="mr-8 space-y-2 border-r pr-8">
			<div class="flex h-16 items-center space-x-4">
				<Logo />
			</div>
			<h1 class="text-2xl font-bold">Login</h1>
			<p>Register your account</p>
		</div>

		<form class="my-3 flex flex-col space-y-4" on:submit|preventDefault={onSubmit}>
			<input type="text" class="input" placeholder="Username" name="username" />
			<input type="password" class="input" placeholder="Password" name="password" />

			<div class="ml-auto">
				<button type="submit">Register</button>
			</div>
		</form>
	</div>
</main>

<style>
	.input {
		@apply rounded border bg-gray-50 p-2 px-3;
	}

	button[type='submit'] {
		@apply rounded-full bg-red-600 p-2 px-5 pb-[0.44rem] text-white hover:bg-red-500;
	}
</style>
