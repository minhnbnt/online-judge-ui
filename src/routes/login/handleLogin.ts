import { goto } from '$app/navigation';

import { AxiosError, type AxiosResponse } from 'axios';

import { instance } from '$lib/services/api';
import { handleLoggedin } from '$lib/services/auth';
import { addNotification, clearNotifications } from '$lib/stores/notification';

interface BadRequestResponse {
	username?: Array<string>;
	password?: Array<string>;
}

function showError(message: string) {
	clearNotifications();

	addNotification({
		text: message,
		position: 'bottom-right',
		type: 'error',
		removeAfter: 5000
	});
}

export default async function handleSubmit(event: SubmitEvent, nextUrl: string) {
	const formData = new FormData(event.target! as HTMLFormElement);
	const remember = formData.get('remember') || false;

	let response;

	try {
		response = await instance.postForm('/token/', formData);
		handleLoggedin(response.data, remember as boolean);
	} catch (err) {
		if (!(err instanceof AxiosError)) {
			throw err;
		}

		if (err.response === undefined) {
			showError(err.message);
			throw err;
		}

		onError(err.response);
		return;
	}

	await goto(nextUrl);
}

function onError({ status, data }: AxiosResponse) {
	if (status === 401) {
		showError("Error: Username or password doesn't match.");
		return;
	}

	const { username, password } = data as BadRequestResponse;

	if (password) {
		showError('Password error: ' + password.join('\n'));
	}

	if (username) {
		showError('Username error: ' + username.join('\n'));
	}
}
