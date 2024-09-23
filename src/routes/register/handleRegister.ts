import { goto } from '$app/navigation';
import { get } from 'svelte/store';

import { AxiosError, type AxiosResponse } from 'axios';

import { instance } from '$lib/services/api';
import { handleLoggedin } from '$lib/services/auth';
import { notifyContextStore } from '$lib/stores/notification';

let newNotification: (type: 'success' | 'error', message: string) => void;

function prepareNotifier() {
	const { addNotification, clearNotifications } = get(notifyContextStore);

	clearNotifications();

	newNotification = (type, message) => {
		addNotification({
			type: type,
			text: message,
			position: 'bottom-right',
			removeAfter: 5000
		});
	};
}

export default async function handleSubmit(event: SubmitEvent) {
	prepareNotifier();

	try {
		const formData = new FormData(event.target! as HTMLFormElement);
		await instance.postForm('/users/register/', formData);
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

	newNotification('success', 'Registration successful!');

	await goto('/login');
}

function onError({ status, data }: AxiosResponse) {
	if (status === 401) {
		newNotification('error', "Error: Username or password doesn't match.");
		return;
	}

	const { username, password } = data as BadRequestResponse;

	if (password) {
		newNotification('error', 'Password error: ' + password.join('\n'));
	}

	if (username) {
		newNotification('error', 'Username error: ' + username.join('\n'));
	}
}

interface BadRequestResponse {
	username?: Array<string>;
	password?: Array<string>;
}
