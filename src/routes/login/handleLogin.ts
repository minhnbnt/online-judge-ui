import { goto } from '$app/navigation';
import { get } from 'svelte/store';

import { AxiosError, type AxiosResponse } from 'axios';

import { instance } from '$lib/services/api';
import { handleLoggedin } from '$lib/services/auth';
import { notifyContextStore } from '$lib/stores/notification';

let newError: (message: string) => void;

function prepareNotifier() {
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

export default async function handleSubmit(event: SubmitEvent, nextUrl: string) {
	const formData = new FormData(event.target! as HTMLFormElement);

	let response;

	try {
		response = await instance.postForm('/token/', formData);
	} catch (err) {
		if (!(err instanceof AxiosError)) {
			throw err;
		}

		if (err.response === undefined) {
			throw err;
		}

		onError(err.response);
		return;
	}

	const remember = formData.get('remember') || false;

	handleLoggedin(response.data, remember as boolean);
	await goto(nextUrl);
}

function onError({ status, data }: AxiosResponse) {
	prepareNotifier();

	if (status === 401) {
		newError("Error: Username or password doesn't match.");
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
