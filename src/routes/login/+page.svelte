<script lang="ts">
	import instance from '$lib/services/api';
	import type { AxiosError } from 'axios';

	import { goto } from '$app/navigation';
	import { handleLoggedin } from '$lib/services/auth';

	const LOGO_SRC = 'https://raw.githubusercontent.com/sveltejs/branding/master/svelte-logo.svg';

	function onErr(err: AxiosError) {
		// TODO: validate and handle login error
	}

	async function handleSubmit(event: SubmitEvent) {
		const formData = new FormData(event.target as HTMLFormElement);

		let response = undefined;

		try {
			response = await instance.postForm('/token/', formData);
		} catch (err) {
			onErr(err as AxiosError);
			return;
		}

		handleLoggedin(response.data);

		goto('/problems');
	}
</script>

<main class="flex h-screen max-h-screen items-center justify-center bg-gray-50">
	<div class="m-10 flex rounded-xl border bg-white p-8 shadow">
		<div class="mr-8 space-y-2 border-r pr-8">
			<img src={LOGO_SRC} class="h-20" alt="Svelte" />
			<h1 class="text-2xl font-bold">Login</h1>
			<p>Sign in to your account</p>
		</div>
		<form class="my-3 flex flex-col space-y-4" on:submit|preventDefault={handleSubmit}>
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
