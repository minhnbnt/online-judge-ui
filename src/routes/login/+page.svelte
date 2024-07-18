<script lang="ts">
	import handleSubmit from './handleLogin';

	import { PUBLIC_LOGO_SRC } from '$env/static/public';

	interface BadRequestResponse {
		username?: Array<string>;
		password?: Array<string>;
	}

	let showNotMatch = false;

	let usernameError: string | undefined;
	let passwordError: string | undefined;

	function errorFormat(messages: Array<string>) {
		return messages.map((err, i) => `${i + 1}. ${err}`).join('\n');
	}

	async function onSubmit(event: SubmitEvent) {
		const errResponse = await handleSubmit(event.target as HTMLFormElement);
		const { status, data } = errResponse!;

		if (status === 401) {
			showNotMatch = true;
			setTimeout(() => (showNotMatch = false), 3000);
			return;
		}

		const { username, password } = data as BadRequestResponse;
		if (username) {
			usernameError = errorFormat(username);
			setTimeout(() => (usernameError = undefined), 3000);
		}

		if (password) {
			passwordError = errorFormat(password);
			setTimeout(() => (passwordError = undefined), 3000);
		}
	}
</script>

<main class="flex h-screen max-h-screen items-center justify-center bg-gray-50">
	<div class="m-10 flex rounded-xl border bg-white p-8 shadow">
		<div class="mr-8 space-y-2 border-r pr-8">
			<img src={PUBLIC_LOGO_SRC} class="h-20" alt="Svelte" />
			<h1 class="text-2xl font-bold">Login</h1>
			<p>Sign in to your account</p>
		</div>
		<form class="my-3 flex flex-col space-y-4" on:submit|preventDefault={onSubmit}>
			<input type="text" class="input" placeholder="Username" name="username" />

			{#if usernameError !== undefined}
				<p>{usernameError}</p>
			{/if}

			<input type="password" placeholder="Password" class="input" name="password" />

			{#if passwordError !== undefined}
				<p>{passwordError}</p>
			{/if}

			<label>
				<input
					type="checkbox"
					id="default-checkbox"
					class="h-4 w-4 rounded bg-gray-100 text-blue-600"
				/>
				Remember me
			</label>

			<p>{showNotMatch ? 'Username or password does not match' : ''}</p>

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
