<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { PageProps } from './$types';

	import handleSubmit from './handleLogin';
	import Logo from '$lib/assets/logo.svelte';
	import redirectIfLoggedIn from './redirectIfLoggedin';

	let { data }: PageProps = $props();
	const { nextUrl } = data;

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		handleSubmit(event, nextUrl);
	}

	redirectIfLoggedIn(nextUrl);

	let isChecked = $state(false);

	function checkboxClassName() {
		let color = 'hover:border-none hover:bg-red-300';
		if (isChecked) {
			color = 'bg-red-600 hover:bg-red-500 border-none';
		}

		return twMerge(
			'absolute left-0 top-[2px] size-5 rounded appearance-none',
			'border border-gray-300 bg-gray-200 transition-color',
			color
		);
	}

	const textInputClassname = 'rounded border bg-gray-50 p-2 px-3';
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

		<form class="my-3 flex flex-col space-y-4" onsubmit={onSubmit}>
			<input type="text" class={textInputClassname} placeholder="Username" name="username" />
			<input type="password" class={textInputClassname} placeholder="Password" name="password" />

			<label class="relative items-center ps-[24px]">
				<input
					type="checkbox"
					name="remember"
					class={checkboxClassName()}
					bind:checked={isChecked}
				/>

				<span
					class={twMerge(
						'absolute top-[4.5px] left-[6.5px] h-[12px] w-[7px] transition-opacity',
						'rotate-45 border-r-[3px] border-b-[3px] border-transparent',
						isChecked && 'border-white'
					)}
				></span>
				Remember me
			</label>
			<div class="flex flex-col space-y-3">
				<p>
					Doesn't have a account?
					<a class="font-bold text-blue-700 hover:text-blue-600" href="/register">Register</a>
				</p>
				<button
					type="submit"
					class="rounded-full bg-red-600 p-2 px-5 pb-[0.44rem] font-bold text-white transition-colors duration-200 hover:bg-red-500"
				>
					Login
				</button>
			</div>
		</form>
	</div>
</main>
