<script>
	const LOGO_SRC = 'https://raw.githubusercontent.com/sveltejs/branding/master/svelte-logo.svg';
</script>

<main class="flex h-screen max-h-screen items-center justify-center bg-gray-50">
	<div class="m-10 flex rounded-xl border bg-white p-8 shadow">
		<div class="mr-10 space-y-2 border-r pr-10">
			<img src={LOGO_SRC} class="h-20" alt="Svelte" />
			<h1 class="text-2xl font-bold">Login</h1>
			<p>Sign in to your account</p>
		</div>
		<form class="my-3 flex flex-col space-y-4">
			<input type="text" name="username" placeholder="Username" class="input" />
			<input type="password" name="password" placeholder="Password" class="input" />
			<label>
				<input
					id="default-checkbox"
					type="checkbox"
					class="h-4 w-4 rounded bg-gray-100 text-blue-600"
				/>
				Remember me
			</label>
			<div class="justify-end">
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
		@apply rounded-full bg-blue-700 p-2 px-5 text-white;
	}
</style>
