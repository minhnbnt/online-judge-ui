<script lang="ts">
	import handleSubmit from './handleRegister';
	import Logo from '$lib/assets/logo.svelte';

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		handleSubmit(event);
	}

	const inputClass = 'rounded border bg-gray-50 p-2 px-3';
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

		<form class="my-3 flex flex-col space-y-4" on:submit={onSubmit}>
			<input type="text" class={inputClass} placeholder="Username" name="username" />
			<input type="password" class={inputClass} placeholder="Password" name="password" />

			<div class="ml-auto">
				<button
					class="rounded-full bg-red-600 p-2 px-5 pb-[0.44rem] text-white hover:bg-red-500"
					type="submit"
				>
					Register
				</button>
			</div>
		</form>
	</div>
</main>
