<script lang="ts">
	import handleSubmit from './handleLogin';
	import Logo from '$lib/assets/logo.svelte';

	function onSubmit(event: SubmitEvent) {
		handleSubmit(event.target as HTMLFormElement);
	}
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
			<input type="password" placeholder="Password" class="input" name="password" />

			<label>
				<input
					type="checkbox"
					id="default-checkbox"
					class="h-4 w-4 rounded bg-gray-100 text-blue-600"
				/>
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
