<script lang="ts">
	import { onMount } from 'svelte';

	import Logo from '$lib/assets/logo.svelte';
	import handleSubmit from './handleLogin';
	import checkIfLoggedin from './checkIfLoggedin';

	export let data: { nextUrl: string };

	const { nextUrl } = data;

	function onSubmit(event: SubmitEvent) {
		handleSubmit(event, nextUrl);
	}

	onMount(async () => await checkIfLoggedin(nextUrl));
</script>

<main class="flex h-screen max-h-screen items-center justify-center bg-gray-50">
	<div class="m-10 flex rounded-xl border bg-white p-8 shadow">
		<div class="mr-8 space-y-2 border-r pr-8">
			<div class="flex h-16 items-center space-x-4">
				<Logo />
			</div>
			<h1 class="text-2xl font-bold">Login</h1>
			<p>Sign in to your account</p>
		</div>

		<form class="my-3 flex flex-col space-y-4" on:submit|preventDefault={onSubmit}>
			<input type="text" class="input" placeholder="Username" name="username" />
			<input type="password" class="input" placeholder="Password" name="password" />

			<label class="relative items-center ps-[24px]">
				<input type="checkbox" name="remember" />
				<span class="checkmark"></span>
				Remember me
			</label>
			<div class="flex flex-col space-y-3">
				<p>Doesn't have a account? <a href="/register">Register</a></p>
				<button type="submit">Login</button>
			</div>
		</form>
	</div>
</main>

<style lang="scss">
	* {
		@apply transition-colors duration-200;
	}

	a {
		@apply font-bold text-blue-700 hover:text-blue-600;
	}

	.input {
		@apply rounded border bg-gray-50 p-2 px-3;
	}

	.checkmark:after {
		content: '';
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
		@apply absolute left-[7px] top-[2px];
	}

	.checkmark,
	input[type='checkbox'] {
		@apply absolute left-0 top-0 size-5 rounded;
	}

	input:checked ~ .checkmark:after {
		border-width: 0px 3px 3px 0px;
		@apply h-[14px] w-[7px] border-white;
	}

	input:checked ~ .checkmark {
		@apply bg-red-600 hover:bg-red-500; // checked
		@apply transition-all;
	}

	input[type='checkbox'] {
		appearance: none;
		-webkit-appearance: none;
		@apply border border-gray-300 bg-gray-200; // unchecked color

		&:hover {
			@apply border-none bg-red-300;
		}
	}

	button[type='submit'] {
		@apply rounded-full bg-red-600 p-2 px-5 pb-[0.44rem] text-white hover:bg-red-500;
	}
</style>
