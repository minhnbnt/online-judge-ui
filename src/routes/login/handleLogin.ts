import { goto } from '$app/navigation';
import { get } from 'svelte/store';

import type { AxiosError, AxiosResponse } from 'axios';

import instance from '$lib/services/api';
import { handleLoggedin } from '$lib/services/auth';
import { notifyContextStore } from '$lib/stores/notification';

let newError: (message: string) => void;

function init() {
	const { addNotification, clearNotifications } = get(notifyContextStore);

	clearNotifications();

	newError = (message: string) => {
		addNotification({
			text: message,
			position: 'bottom-right',
			type: 'error',
			removeAfter: 5000
		});
	};
}

export default async function handleSubmit(formData: HTMLFormElement, nextUrl: string) {
	init();

	let response = undefined;

	try {
		response = await instance.postForm('/token/', formData);
	} catch (err) {
		const errorResponse = (err as AxiosError).response;

		if (errorResponse === undefined) {
			throw err;
		}

		onError(errorResponse);
		return;
	}

	handleLoggedin(response.data);
	await goto(nextUrl);
}

function onError({ status, data }: AxiosResponse) {
	if (status === 401) {
		newError('Error: Username or\npassword does not match.');
		return;
	}

	const { username, password } = data as BadRequestResponse;

	if (password) {
		newError('Password error: ' + password.join('\n'));
	}

	if (username) {
		newError('Username error: ' + username.join('\n'));
	}
}

interface BadRequestResponse {
	username?: Array<string>;
	password?: Array<string>;
}
